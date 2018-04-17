const controller = require('../controller/Interaction')

function route(router) {
    router
        .get('/interactions', controller.getMany)
        .post('/interactions', controller.createOne)
        .get('/interactions/:id', controller.getOne)
        .delete('/interactions/:id', controller.deleteOne)

    return router
}

module.exports = route
