const express = require('express');
const router = express.Router();
const User = require('../controllers/User')

router.get('/hello',User.Test);

module.exports = router;