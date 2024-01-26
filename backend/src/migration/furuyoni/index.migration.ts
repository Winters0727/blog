import { getCollection } from "../../../database.ts";

import CharacterData from "./character.json" assert { type: "json" };
import KeywordData from "./keyword.json" assert { type: "json" };

interface Migration {
  migrationData: { data: any };
  dbName: string;
  collectionName: string;
}

const MIGRATION_DATA: Migration[] = [
  {
    migrationData: CharacterData,
    dbName: "furuyoni",
    collectionName: "character",
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

  if (!testData) {
    console.log(`${collectionName} data is empty.`);
    console.log("Migrating data...");

    const { data } = migrationData;

    await collection.insertMany(data);

    console.log("Data migration is complete.");
  }
};

const initializeMigration = async () =>
  await Promise.all(MIGRATION_DATA.map((migration) => migrateData(migration)));

export { initializeMigration };
