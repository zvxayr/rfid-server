const schedule = require('node-schedule');
const Types    = require('mongoose').Types
const ObjectId = Types.ObjectId

const {User, Interaction, Meal} = require('../models');
const dArray = function getDateArray(date) {
  return String([date.getFullYear(), date.getMonth(), date.getDate()]);
}

module.exports = function createIO(server) {
  const io = require('socket.io')(server);

  const next = async function resetAllUserStateAndEmit() {
    const users = await User.find({ state: false });

    await Promise.all(users.map((user) => user.set({ state: true }).save()));

    io.emit('reset');
  }

  const bfast = schedule.scheduleJob({hour: 05, minute: 00}, next);
  const lunch = schedule.scheduleJob({hour: 10, minute: 00}, next);
  const dinnr = schedule.scheduleJob({hour: 16, minute: 30}, next);

  io.on('connection', async (socket) => {
    socket.on('card read', async (userID, fn) => {
      const user = await User.findById(ObjectId(userID));
      if (!user.state) return;

      user.set({ state: false }).save();
      const meal = await Meal.find({date: dArray(new Date())});

      await new Interaction({
        userID: user.id,
        mealID: meal.id,
        timestamp: new Date()
      }).save();
    });
  });

  return io;
}
