import { getCollection } from "../../../database.ts";

import CharacterData from "./character.json" assert { type: "json" };
import CardData from "./card.json" assert { type: "json" };
import FaqData from "./faq.json" assert { type: "json" };
import KeywordData from "./keyword.json" assert { type: "json" };

interface Migration {
  migrationData?: { data: any };
  dbName: string;
  collectionName: string;
}

const MIGRATION_DATA: Migration[] = [
  {
    dbName: "furuyoni",
    collectionName: "index",
  },
  {
    migrationData: CharacterData,
    dbName: "furuyoni",
    collectionName: "character",
  },
  {
    migrationData: CardData,
    dbName: "furuyoni",
    collectionName: "card",
  },
  {
    migrationData: FaqData,
    dbName: "furuyoni",
    collectionName: "faq",
  },
  {
    migrationData: KeywordData,
    dbName: "furuyoni",
    collectionName: "keyword",
  },
];

const migrateData = async (args: Migration) => {
  const { migrationData, dbName, collectionName } = args;

  const collection = getCollection(dbName, collectionName);

  const testData = await collection.findOne();

  if (!testData && migrationData) {
    console.log(`${collectionName} data is empty.`);
    console.log("Migrating data...");

    const { data } = migrationData;

    const currentTime = new Date();

    try {
      await collection.insertMany(
        data.map((datum: Object) => ({
          ...datum,
          createdAt: currentTime,
          updatedAt: currentTime,
        }))
      );
    } catch (err: any) {
      console.log(err);
      const myError = err.writeErrors[0].err;
      console.log(myError.errInfo.details.schemaRulesNotSatisfied);
    }

    console.log("Data migration is complete.");
  }
};

const initializeMigration = async () =>
  await Promise.all(MIGRATION_DATA.map((migration) => migrateData(migration)));

export { initializeMigration };
