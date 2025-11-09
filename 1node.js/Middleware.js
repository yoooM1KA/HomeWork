const fs = require("node:fs")
const validateInput = (req, res, next) => {
    const {text} = req.body
    if(!text){
        return res.status(400).json({message: "Message text required"})
    }
    const newMessage = {
        id: Date.now(),
        text
    }
    req.message = newMessage
    next()
}

module.exports = {
    validateInput
}