import express from "express"
import { httpError } from "./utils"

const app = express()

app.use(express.json())

app.post("/auth/register", (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        throw httpError("body is missing fields", 400)
    }
    
})


app.listen(process.env.PORT, () => console.log("server is up and listening"))