const controller = require('../controller/Unit')

function route(router) {
	router
		.get('/units', controller.getMany)
		.post('/units', controller.createOne)
		.get('/units/:id', controller.getOne)
		.delete('/units/:id', controller.deleteOne)

    return router
}

module.exports = route