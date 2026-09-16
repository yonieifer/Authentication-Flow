import express from "express"
import { register } from "./services/authService.js"

const app = express()

app.use(express.json())

app.post("/auth/register", async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400).json({ message: "body is missing fields" })
    }
    await register(username, email, password)
    res.status(201).json({ message: "User registered successfully" }
    )
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})


app.listen(process.env.PORT, () => console.log("server is up and listening"))