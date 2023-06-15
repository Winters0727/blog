import { MongoClient, ServerApiVersion } from "mongodb";

const DATABASE_URL = `${process.env.DATABASE_PREFIX}${process.env.DATABASE_ACCOUNT}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SUFFIX}`;

const client = new MongoClient(DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const blogDatabase = client.db("blog");

const initializeDatabase = async () => {
  try {
    console.log("Attempt to connect database...");

    await client.connect();

    console.log("Database connection is accomplished!");
  } catch (err: any) {
    await client.close();
    console.error(err);
  }
};

const getCollection = (collection: string) =>
  blogDatabase.collection(collection);

export { client, initializeDatabase, getCollection };
