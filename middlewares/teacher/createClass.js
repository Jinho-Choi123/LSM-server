var express = require('express');
var router = express.Router();
const Class = require('../../models/class');


const createClassMiddleware = (req, res, next) => {

    /*
    req: {
        userId: " ", // teacher's userId
        isTeacher: " "// is teacher?


    }
    */
    if (!req.body.isTeacher) {
        res.send({ msg: "you are not a Teacher" });
    } else {
        let today = new Date();

        const makeid = (length) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        //generate classid
        const classid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(40);
        const teacherid = req.body.userId;
        const class_ = new Class({
            classId: classid,
            teacherId: teacherid
        })
        class_.save();
        res.send({ msg: "Creating class success!" });
    }
}

module.exports = createClassMiddleware