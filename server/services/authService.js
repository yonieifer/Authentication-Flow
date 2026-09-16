import { getByEmail, create } from "../dal/userRepo.js";
import { httpError } from "../utils.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (username, email, password) => {
    const user = await getByEmail(email)

    if (user) throw httpError(400, `User with email ${email} already exists`)

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { username, email, password: hashedPassword }
    const newId = await create(newUser)
    return newId
}

export const login = async (email, password) => {
    const user = await getByEmail(email)
    if (!user) throw httpError(400, `email ${email} is not registered, please sign-up to login`)

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) throw httpError(400, `Password is incorrect`)

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1m" })
    return token
}