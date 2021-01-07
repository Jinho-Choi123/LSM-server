const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

// const assignmentSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     content: {type: String, required: true}, 
//     Duedate: {type: Date, required: true}, 
//     handinPath: {type: String, required: true}, 
//     handin: {type: Array}
// })

const lectureSchema = new mongoose.Schema({
    lectureVideo: { type: Array },
    lectureNote: { type: Array },
})


const classSchema = new mongoose.Schema({
    classId: { type: String, required: true },
    teacherId: { type: Array, required: true },
    studentId: { type: Array, required: true },
    lectureId: [lectureSchema],
    noticeId: [noticeSchema]
})

module.exports = mongoose.model('Class', classSchema);