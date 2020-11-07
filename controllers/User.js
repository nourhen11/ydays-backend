const User = require('../models/User')

const Test = (req,res,next) => {
    res.send("hello")
}

module.exports = {
    Test
}