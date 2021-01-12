var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');
const Chat = require('../../models/Chat');

const createGroupMiddleware = (req, res, next) => {
    console.log(req);
    /*
    req: {
        userId: " ",
        time: " ",
        startPoint: {
            formatAddress:
            type:
            lat:
            lon:
        }
        startPoint_lat: " ",
        startPoint_lon: " "
        endPoint_lat: " ",
        endPoint_lon
    }
    */
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let today = new Date();
    const groupid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(40);
    const time = new Date(req.body.time);

    const startpoint = {
        type: "Point",
        formatAddress: req.body.startPoint.formatAddress,
        coordinates: [Number.parseFloat(req.body.startPoint.lon), Number.parseFloat(req.body.startPoint.lat)]
    }
    const endpoint = {
        type: "Point",
        formatAddress: req.body.endPoint.formatAddress,
        coordinates: [Number.parseFloat(req.body.endPoint.lon), Number.parseFloat(req.body.endPoint.lat)]
    }
    const member = [req.body.userId];
    const creator = req.body.userId;

    const group = new Group({
        groupId: groupid,
        startPoint: startpoint,
        endPoint: endpoint,
        time: new Date(time),
        members: member,
        member_num: 1,
        creator: creator
    })

    const chat = new Chat({
        roomId: groupid,
        content: [],
        members: member
    })

    group.save()
        .then(() => {
            chat.save()
                .then(() => {
                    res.send({ msg: "Creating Group success!!" });
                })
        })
        .catch((err) => {
            throw err;
        })

}

module.exports = createGroupMiddleware;