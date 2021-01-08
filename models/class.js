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
    lectureId: { type: String, unique: true }
})

const classSchema = new mongoose.Schema({
    classId: { type: String, required: true, unique: true },
    teacherId: { type: Array, required: true },
    studentId: { type: Array },
    lecture: [lectureSchema],
    notice: [noticeSchema]
})

classSchema.method({
    addlecture: () => {
        this.lecture
    }
})

module.exports = mongoose.model('Class', classSchema);