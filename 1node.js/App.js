const fs = require("node:fs")
const express = require("express")
const {validateInput} = require("./Middleware")
const PORT = 3001
const app = express()
app.use(express.json())

app.get("/messages", (req, res) => {
    const data = fs.readFileSync("Messages.json", {encoding:"utf-8"})
    const messages = JSON.parse(data)
    res.status(200).json(messages)
})

app.post("/messages", validateInput, (req, res) => {
    const message = req.message
    if(!message){
        return res.status(500).json({message: "internal server error"})
    }
    const data = fs.readFileSync("Messages.json", {encoding: "utf-8"})
    const messages = JSON.parse(data)
    messages.push(message)
    fs.writeFileSync("Messages.json", JSON.stringify(messages, null, 2))
    res.status(201).json({message: "Message created successfully"})
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})