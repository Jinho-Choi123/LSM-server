const express = require('express');
const router = express.Router();
const geocodMiddleware = require('../middlewares/geo/geoCoder');


router.post('/search', geocodMiddleware);

module.exports = router;