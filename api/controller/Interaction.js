const Types    = require('mongoose').Types
const ObjectId = Types.ObjectId

let { Interaction } = require('../../models')

exports.getMany = async ctx => {
    let { skip, limit, ...query } = ctx.query
    let fields = ctx.request.body

    let records = await Interaction.find(query, fields, { skip: +skip, limit: +limit })
    
    if (records.length == 0)
        ctx.throw(404) // Not Found

    ctx.body = records
}

exports.createOne = async ctx => {
    // validate and normalize request body
    try {
        let record = await new Interaction(ctx.request.body).save()

        io.emit('new entry', record)

        ctx.status = 201 // Created
        ctx.set('location', `api/interactions/${record._id}`)
    } catch(e) {
        ctx.throw(409) // Conflict
    }
}

exports.getOne = async ctx => {
    let record = await Interaction.findById(ObjectId(ctx.params.id))

    ctx.body = record
}

exports.deleteOne = async ctx => {
    await Interaction.findByIdAndRemove(ObjectId(ctx.params.id))

    ctx.status = 204 // No-content
}