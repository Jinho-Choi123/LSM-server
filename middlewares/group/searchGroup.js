var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');
const axios = require('axios');

const searchGroupMiddleware = (req, res, next) => {
    /*
    req: {
        endpointaddress: " ",
        matchdate: " ",
    }
    */
    const request = req.body;
    console.log(request);
    const morning = new Date(request.matchdate);
    morning.setSeconds(1);
    morning.setHours(0);
    morning.setMinutes(0);
    console.log("morning is " + morning);


    const midnight = new Date(request.matchdate);
    midnight.setSeconds(59);
    midnight.setHours(23);
    midnight.setMinutes(59);
    console.log("midnight is " + midnight);

    const endpointAddr = req.body.endpointaddress;
    console.log("endpoint addr is " + endpointAddr);

    axios.post('http://localhost:8080/geo/search', {
            address: endpointAddr
        })
        .then((response) => {
            if (response.data.status) {
                const endpoint = response.data.location;
                console.log(endpoint);

                Group.find({
                    time: { $gte: morning, $lt: midnight },
                    endPoint: {
                        $near: {
                            $maxDistance: 500,
                            //$geometry: endpoint
                            $geometry: {
                                type: 'Point',
                                coordinates: [127.36039, 36.3721427]
                            }
                        }
                    },
                    member_num: {
                        $lt: 4
                    }
                }, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(data);
                        res.json({ data: data });
                        //res.json({ "data": [{ "_id": { "$oid": "5ffb611d5603ee51e4f4d309" }, "members": ["a"], "groupId": "202101610309917401Ca8y1AvmZrtobOsqFm76CpkK8O1EjfEphfQKs9cb", "startPoint": { "coordinates": [127.36039, 36.3721427], "_id": { "$oid": "5ffb611d5603ee51e4f4d30a" }, "formatAddress": "대한민국 대전광역시 유성구 어은동 대학로 291", "type": "Point" }, "endPoint": { "coordinates": [127.36039, 36.3721427], "_id": { "$oid": "5ffb611d5603ee51e4f4d30b" }, "formatAddress": "대한민국 대전광역시 유성구 어은동 대학로 291", "type": "Point" }, "time": { "$date": "2021-01-30T15:30:00.000Z" }, "member_num": 1, "creator": "a", "__v": 0 }] })
                    }
                })

            } else {
                res.status(201).json({});
            }
        })
        .catch((err) => {
            console.log(err);
            console.log("error occur!!!");
            throw err;
        })



}

module.exports = searchGroupMiddleware;