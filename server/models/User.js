const { Schema, model } = require('mongoose')

const schema = new Schema({
    // name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    // image: String,
    savedLocations: {type: Schema.Types.ObjectId, ref: 'SavedLocations'},
}, {
    timestamps: true
})

module.exports = model('User', schema)