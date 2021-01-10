const express = require('express');
const router = express.Router();
const registerMiddleware = require('../middlewares/auth/register');
const loginMiddleware = require('../middlewares/auth/login');
const authcheckMiddleware = require('../middlewares/auth/authCheck');

router.post('/register', registerMiddleware);
router.post('/login', loginMiddleware);

router.get('/authcheck', authcheckMiddleware);

module.exports = router;