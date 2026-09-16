import db from "../config/db";

const users = db.collection("users")

export const create = async (user) => {
    const {insertedId} = await users.insertOne(user)
    return insertedId.toString()
}

export const getByEmail = async (email) => {
    const user = await users.findOne({email})
    return user
}

