const { Schema, model } = require('mongoose')

const schema = new Schema({
    lat: Number,
    lon: Number,
    city: String,
    timezone: String,
    country: String,
}, {
    timestamps: true
})

module.exports = model('SavedLocations', schema)