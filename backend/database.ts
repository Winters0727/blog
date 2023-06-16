import { Document, MongoClient, ServerApiVersion } from "mongodb";
import ArticleSchema from "./src/models/article.ts";
import CommentSchema from "./src/models/comment.ts";

const DATABASE_URL = `${process.env.DATABASE_PREFIX}${process.env.DATABASE_ACCOUNT}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SUFFIX}`;

const client = new MongoClient(DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const blogDatabase = client.db("blog");

const collections = [
  {
    name: "article",
    schema: ArticleSchema,
  },
  {
    name: "comment",
    schema: CommentSchema,
  },
];

const getCollection = (name: string) => blogDatabase.collection(name);

const createCollection = async (name: string, schema: Document) =>
  await blogDatabase.createCollection(name, {
    validator: {
      $jsonSchema: schema,
    },
  });

const initializeCollection = async (name: string, schema: Document) => {
  const dbcollections = await blogDatabase.collections();
  if (!dbcollections.some((document) => document.collectionName === name))
    await createCollection(name, schema);
};

const initializeDatabase = async () => {
  try {
    console.log("Attempt to connect database...");

    await client.connect();

    console.log("Database connection is accomplished!");

    console.log("Initializing collections...!");

    for (const { name, schema } of collections) {
      await initializeCollection(name, schema);
    }

    console.log("Initialization is completed!");
  } catch (err: any) {
    await client.close();
    console.error(err);
  }
};

export { client, initializeDatabase, getCollection };
