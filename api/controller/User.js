const Types    = require('mongoose').Types
const ObjectId = Types.ObjectId

let {User} = require('../../models')

exports.getMany = async (ctx) => {
  let { skip, limit, ...query } = ctx.query
  let fields = ctx.request.body

  let records = await User.find(query, {...fields}, { skip: +skip, limit: +limit })

  if (records.length == 0)
    ctx.throw(404) // Not Found

  ctx.body = records
}

exports.createOne = async (ctx) => {
  // validate and normalize request body
  try {
    let record = await new User(ctx.request.body).save()

    ctx.status = 201 // Created
    ctx.set('location', `api/users/${record._id}`)
  } catch(e) {
    ctx.throw(409) // Conflict
  }
}

exports.getOne = async (ctx) => {
  let record = await User.findById(ObjectId(ctx.params.id))

  ctx.body = record
}

exports.deleteOne = async (ctx) => {
  await User.findByIdAndRemove(ObjectId(ctx.params.id))

  ctx.status = 204 // No-content
}
