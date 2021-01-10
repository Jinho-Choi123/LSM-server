const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    formatAddress: { type: String, required: true },
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})


const groupSchema = new mongoose.Schema({
    groupId: { type: String, required: true, unique: true },
    startPoint: { type: pointSchema, required: true, index: "2dsphere" },
    endPoint: { type: pointSchema, required: true, index: "2dsphere" },
    time: { type: Date, required: true },
    members: [String], // array of userId
    member_num: { type: Number },
    creator: { type: String, required: true }
})

module.exports = mongoose.model('Group', groupSchema);