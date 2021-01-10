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
    console.log("morning is " + morning);


    const midnight = new Date(request.matchdate);
    midnight.setSeconds(59);
    midnight.setHours(23);
    midnight.setMinutes(59);
    const endpointAddr = req.body.endpointaddress;
    console.log("endpoint addr is " + endpointAddr);

    axios.post('http://localhost:8080/geo/search', {
            address: endpointAddr
        })
        .then((response) => {
            console.log("get response from geo search");
            if (response.status === "OK") {
                const endpoint = response.location;

                Group.find({
                    date: { $gt: morning, $lt: midnight },
                    endPoint: {
                        $near: {
                            $maxDistance: 500,
                            $geometry: endpoint
                        }
                    },
                    members: {
                        $size: {
                            $lt: 4
                        }
                    }


                }, (err, data) => {
                    console.log(data);
                    if (err) throw err;
                    else {
                        res.json(data);
                    }
                })

            } else {
                res.status(201).json({});
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })



}

module.exports = searchGroupMiddleware;