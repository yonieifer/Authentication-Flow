import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI)
await client.connect()
const db = client.db("authentication-flow")
export default db

