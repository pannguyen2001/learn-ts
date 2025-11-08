// utils/mongodbHelpers.ts
import { client } from "./connectMongodb";
import { Document, Filter, UpdateFilter } from "mongodb";

/**
 * Update multiple documents in a collection with support for operators like $set, $inc, $push, etc.
 * @param collectionName Name of the collection
 * @param filter Query filter to match documents
 * @param updateFields MongoDB update object (e.g., { $set: { age: 30 } })
 * @param upsert Whether to insert a document if none match. Default: false
 */
export async function updateManyData(
    dbName: string,
  collectionName: string,
  filter: Filter<Document>,
  updateFields: UpdateFilter<Document>,
  upsert: boolean = false
) {
  try {
    const db = client.db(dbName); // Replace with your DB name
    const collection = db.collection(collectionName);

    const result = await collection.updateMany(filter, { $set: updateFields }, { upsert });

    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId ?? null,
    };
  } catch (error) {
    console.error("❌ updateManyData error:", error);
    throw error;
  }
}
