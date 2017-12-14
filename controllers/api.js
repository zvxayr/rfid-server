const fs     = require('fs-extra')
const models = require('../models')

const Types = models.mongoose.Types
const ObjectId = Types.ObjectId

let prefix = '/api'

let { Human, History, Location, Rfid } = models

function route(router) {
    router // Humans
        .get('/humans', async (ctx) => {
            let { skip, limit, ...query } = ctx.query
            let fields = ctx.request.body

            let records = await Human.find(query, fields, { skip: +skip, limit: +limit })

            if (records.length == 0)
                ctx.throw(404) // Not Found

            ctx.body = records
        })
        .post('/humans', async (ctx) => {
            // validate and normalize request body
            try {
                let record = await new Human(ctx.request.body).save()

                ctx.status = 201 // Created
                ctx.set('location', `api/humans/${record._id}`)
            } catch(e) {
                ctx.throw(409) // Conflict
            }
        })
        .get('/humans/:id', async (ctx) => {
            let record = await Human.findById(ObjectId(ctx.params.id))

            ctx.body = record
        })
        .delete('/humans/:id', async (ctx) => {
            await Human.findByIdAndRemove(ObjectId(ctx.params.id))

            ctx.status = 204 // No-content
        })

    router // History
        .get('/history', async (ctx) => {
            let { skip, limit, ...query } = ctx.query
            let fields = ctx.request.body

            let records = await History.find(query, fields, { skip: +skip, limit: +limit })

            if (records.length == 0)
                ctx.throw(404) // Not Found

            ctx.body = records
        })
        .post('/history', async (ctx) => {
            // validate and normalize request body
            let record = new History(ctx.request.body).save()

            ctx.status = 201 // Created
            ctx.set('location', `api/history/${record._id}`)
        })
        .get('/history/:id', async (ctx) => {
            let record = await History.findById(ObjectId(ctx.params.id))

            ctx.body = record
        })
            .delete('/history/:id', async (ctx) => {
            await History.findByIdAndRemove(ObjectId(ctx.params.id))

            ctx.status = 204 // No-content
        })

    router // Location
        .get('/location', async (ctx) => {
            let { skip, limit, ...query } = ctx.query
            let fields = ctx.request.body

            let records = await Location.find(query, fields, { skip: +skip, limit: +limit })

            if (records.length == 0)
                ctx.throw(404) // Not Found

            ctx.body = records
        })
        .post('/location', async (ctx) => {
            // validate and normalize request body
            try {
                let record = await new Location(ctx.request.body).save()

                ctx.status = 201 // Created
                ctx.set('location', `api/location/${record._id}`)
            } catch(e) {
                ctx.throw(409) // Conflict
            }
        })
        .get('/location/:id', async (ctx) => {
            let record = await Location.findById(ObjectId(ctx.params.id))

            ctx.body = record
        })
        .delete('/location/:id', async (ctx) => {
            await Location.findByIdAndRemove(ObjectId(ctx.params.id))

            ctx.status = 204 // No-content
        })

    router // Rfid
        .get('/rfid', async (ctx) => {
            let { skip, limit, ...query } = ctx.query
            let fields = ctx.request.body

            let records = await Rfid.find(query, fields, { skip: +skip, limit: +limit })

            if (records.length == 0)
                ctx.throw(404) // Not Found

            ctx.body = records
        })
        .post('/rfid', async (ctx) => {
            // validate and normalize request body
            try {
                let record = await new Location(ctx.request.body).save()

                ctx.status = 201 // Created
                ctx.set('location', `api/location/${record._id}`)
            } catch(e) {
                ctx.throw(409) // Conflict
            }
        })
        .get('/rfid/:id', async (ctx) => {
            let record = await Rfid.findById(ObjectId(ctx.params.id))

            ctx.body = record
        })
        .delete('/rfid/:id', async (ctx) => {
            await Rfid.findByIdAndRemove(ObjectId(ctx.params.id))

            ctx.status = 204 // No-content
        })

    return router
}

module.exports = {
    prefix, route
}