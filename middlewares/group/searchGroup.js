var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');
const axios = require('axios');

const searchGroupMiddleware = (req, res, next) => {
    /*
    req: {
        endpointaddress: " ",
        matchdate: " ",
        endpoint_lat: " ",
        endpoint_lon: " "
    }
    */
    const request = req.body;
    const morning = new Date(request.matchdate);
    morning.setSeconds(1);
    morning.setHours(0);
    morning.setMinutes(0);

    const midnight = new Date(request.matchdate);
    midnight.setSeconds(59);
    midnight.setHours(23);
    midnight.setMinutes(59);

    const endpointAddr = req.body.endpointaddress;

    const lattitude = Number.parseFloat(req.body.endpoint_lat);
    const longitude = Number.parseFloat(req.body.endpoint_lon);

    Group.find({
        time: { $gte: morning, $lt: midnight },
        endPoint: {
            $near: {
                $maxDistance: 500,
                //$geometry: endpoint
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, lattitude]
                }
            }
        },
        member_num: {
            $lt: 4,
            $gte: 1
        }
    }, (err, data) => {
        console.log(data);
        if (err) {
            console.log("hello world");
            throw err;
        } else {
            res.json({ data: data });
        }
    })




}

module.exports = searchGroupMiddleware;