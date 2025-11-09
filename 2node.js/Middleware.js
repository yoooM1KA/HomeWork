const fs = require("node:fs")
const validateInput = (req, res, next) => {
    const {name, email} = req.body
    if(!name || !email){
        return res.status(400).json({message: "All fields required"})
    }
    if(!email.includes("@")){
        return res.status(400).json({message: "Invalid email"})
    }
    const newUser = {
        id: Date.now(),
        name,
        email
    }
    req.user = newUser
    next()
}

module.exports = {
    validateInput
}