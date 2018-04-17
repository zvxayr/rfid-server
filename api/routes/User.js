const controller = require('../controller/User')

function route(router) {
    router
        .get('/users', controller.getMany)
        .post('/users', controller.createOne)
        .get('/users/:id', controller.getOne)
        .delete('/users/:id', controller.deleteOne)

    return router
}

module.exports = route
