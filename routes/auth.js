const express = require('express');
const router = express.Router();
const registerMiddleware = require('../middlewares/auth/register');
const loginMiddleware = require('../middlewares/auth/login');
const authcheckMiddleware = require('../middlewares/auth/authCheck');

router.post('/register', registerMiddleware);
router.post('/login', loginMiddleware);

router.use('/authcheck', authcheckMiddleware);
router.get('/authcheck', (req, res) => {
    res.json({
        success: true,
        token: req.decoded
    })
})

module.exports = router;