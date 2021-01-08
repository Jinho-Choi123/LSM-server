var express = require('express');
var router = express.Router();
const Class = require('../../models/class');

const deleteClassMiddleware = (req, res, next) => {
    /*
    req: {
        classId: " ", 
        userId: " "
    }
    */

    const classid = req.body.classId;
    const teacherid = req.body.userId;

    Class.findOne({ classId: classid, teacherId: { $in: [teacherid] } }, async(err, data) => {
        if (err) throw err;
        else {
            if (data == null) return res.status(400).json({ msg: "You cannot delete. Class doesnt exists or you don't have permission to delete." })
            else {
                await Class.deleteOne(data)
                return res.json({ msg: "Delete success!" })
            }
        }
    })
}

module.exports = deleteClassMiddleware;