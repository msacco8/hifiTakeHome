import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function mongoConnection() {
  // Reuse connection if cached
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to database
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = new URL(uri).pathname.substring(1);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default mongoConnection;
