var express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const geocodMiddleware = (req, res, next) => {
    const address = encodeURI(req.body.address);
    console.log("geo coder gets address " + address);
    const geoApiUrl = (process.env.GeoCodUrl).concat(`&address=${address}`);
    axios.get(geoApiUrl)
        .then((response) => {
            console.log("status from geocode api = " + response.data.status);

            /*
            response form: {
                results: {
                    address_components
                }
            }
            */
            if (response.data.status === "OK") {
                //if response has some results
                const formatAddr = response.data.results[0].formatted_address;
                const lattitude = response.data.results[0].geometry.location.lat;
                const longitude = response.data.results[0].geometry.location.lng;
                console.log("formatted address is " + formatAddr);
                console.log(`lattitude is ${lattitude} and longitude is ${longitude}`);
                res.json({
                    status: true,
                    location: {
                        type: "Point",
                        coordinates: [longitude, lattitude]
                    }
                })

            } else {
                res.status(201).json({
                    status: false
                })
            }
            //parse data from geocode api

        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAIL",
                results: {}
            })
        })
}

module.exports = geocodMiddleware;