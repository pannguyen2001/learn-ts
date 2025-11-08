
// utils/mongodbHelpers.ts
import logger from "../logging/tslog";
import { client } from "./connectMongodb";
import { Document } from "mongodb";

/**
 * Inserts one or more documents into a MongoDB collection.
 * @param collectionName Name of the MongoDB collection.
 * @param data A single document or an array of documents to insert.
 * @returns Insert result object.
 */
export async function insertData(dbName: string = "", collectionName: string = "", data: Document | Document[] = {}): Promise<any> {
  try {
    const db = client.db(dbName); // 🔁 Replace with your DB name
    const collection = db.collection(collectionName);

    if (Array.isArray(data)) {
      if (data.length === 0) throw new Error("Data array is empty.");
      const result = await collection.insertMany(data, {
        
      });
      logger.info("✅ insertData success:", result);
      return {
        insertedCount: result.insertedCount,
        insertedIds: result.insertedIds,
      };
    } else {
      const result = await collection.insertOne(data);
      logger.info("✅ insertData success:", result);
      return {
        insertedId: result.insertedId,
      };
    }
  } catch (error) {
    logger.error("❌ insertData error:", error);
    throw error;
  }
}
