import { Collection, Document, MongoClient, ServerApiVersion } from "mongodb";

import AdminSchema from "./src/models/admin.ts";
import ArticleSchema from "./src/models/article.ts";
import CommentSchema from "./src/models/comment.ts";

import { hashPassword } from "./src//utils/password.ts";

import type { Account } from "./src/types/model.type.ts";

const DATABASE_URL = `${process.env.DATABASE_PREFIX}${process.env.DATABASE_ACCOUNT}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SUFFIX}/${process.env.DATABASE_OPTIONS}`;

const client = new MongoClient(DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

const database = client.db("blog");

const collections = [
  {
    name: "admin",
    schema: AdminSchema,
  },
  {
    name: "article",
    schema: ArticleSchema,
  },
  {
    name: "comment",
    schema: CommentSchema,
  },
];

const getCollection = (name: string) => database.collection(name);

const createCollection = async (name: string, schema: Document) =>
  await database.createCollection(name, {
    validator: {
      $jsonSchema: schema,
    },
  });

const initializeCollection = async (name: string, schema: Document) => {
  const dbcollections = await database.collections();
  if (!dbcollections.some((document) => document.collectionName === name))
    await createCollection(name, schema);
};

const initializeAdminAccount = async (
  account: Account,
  adminCollection: Collection
) => {
  const { id, password } = account;

  const adminAccount = await adminCollection.findOne({ id });

  if (!adminAccount) {
    const hashedPassword = hashPassword(password);
    await adminCollection.insertOne({
      id,
      password: hashedPassword,
    });
  }
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

    const adminId = process.env.ADMIN_ID;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminId && adminPassword) {
      const adminCollection = getCollection("admin");
      await initializeAdminAccount(
        {
          id: adminId,
          password: adminPassword,
        },
        adminCollection
      );
    }

    console.log("Initialization is completed!");
  } catch (err: any) {
    await client.close();
    console.error(err);
  }
};

export { client, initializeDatabase, getCollection };
