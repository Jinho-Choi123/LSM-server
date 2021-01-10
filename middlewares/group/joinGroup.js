var express = require('express');
var router = express.Router();

const Group = require('../../models/Group');

const joinGroupMiddleware = (req, res, next) => {
    /**
    req: {
        groupId: " ",
        userId: " "
    }
     */
    console.log(req);
    const groupid = req.body.groupId;
    const userid = req.body.userId;
    console.log(`user id is ${userid}`);

    Group.findOne({ groupId: groupid }, (err, data) => {
        if (err) throw err;
        const origin_mem_num = data.member_num.length
        if (data.member_num.length >= 4) return res.json({ msg: "Group is filled." })
        else if (data.members.includes(userid)) return res.json({ msg: "Already joined" })
        else {
            Group.updateOne({ groupId: groupid }, { $push: { members: userid }, $inc: { member_num: 1 } }, (err, data) => {
                if (err) throw err;
                else res.json({ msg: "Joined Group!" });
            })
        }
    })
}

module.exports = joinGroupMiddleware;