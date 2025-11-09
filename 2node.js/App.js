const fs = require("node:fs")
const express = require("express")
const {validateInput} = require("./Middleware")
const PORT = 3001
const app = express()
app.use(express.json())

app.get("/users", (req, res) => {
    const data = fs.readFileSync("users.json", {encoding:"utf-8"})
    const users = JSON.parse(data)
    res.status(200).json(users)
})

app.post("/users", validateInput, (req, res) => {
    const user = req.user
    if(!user){
        return res.status(500).json({message: "internal server error"})
    }
    const data = fs.readFileSync("users.json", {encoding: "utf-8"})
    const users = JSON.parse(data)
    users.push(user)
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2))
    res.status(201).json({message: "User created successfully"})
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})