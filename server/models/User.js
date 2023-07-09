const { Schema, model } = require('mongoose')

const schema = new Schema({
    // name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    // image: String,
    savedLocations: [{
        lat: Number,
        lon: Number,
        city: String,
        timezone: String,
        country: String,
    }]//[{type: Schema.Types.ObjectId, ref: 'SavedLocations'}],
}, {
    timestamps: true
})

module.exports = model('User', schema)

//     [{
//     "lat": "123",
//     "lon": "123",
//     "city": "Nov",
//     "timezone": "3600",
//     "country": "Russia"
// }]