const express = require('express');
const router = express.Router();
const createClassMiddleware = require('../middlewares/teacher/createClass');
const deleteClassMiddleware = require('../middlewares/teacher/deleteClass')
const noticeCreateMiddleware = require('../middlewares/teacher/noticeCreateMiddleware');

router.post('/create', createClassMiddleware);
router.post('/delete', deleteClassMiddleware);
router.post('/notice/create', noticeCreateMiddleware);

module.exports = router;