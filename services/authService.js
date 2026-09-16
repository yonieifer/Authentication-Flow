import { getByEmail, create } from "../dal/userRepo.js";
import { httpError } from "../utils.js";
import bcrypt from "bcryptjs"

export const register = async (username, email, password) => {
    const isEmailExists = await getByEmail(email)
    if (isEmailExists) throw httpError(`email ${email} already exists`)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { username, email, password: hashedPassword }
    const newId = await create(user)
    return newId
}