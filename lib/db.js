import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://vasantmestry11:vasantmestry11@cluster0.fmz53zz.mongodb.net/auth-demo')
  return client
}