import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI } from "../../utils/config";
import logger from "../logging/tslog";
import { connect } from "http2";

/**
 * connect to mongodb
 */

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri: string = MONGODB_URI||"";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
type ConnectResult = {
  success: boolean;
  message: string;
}
async function connectMongoDb() {
  let connectResult: ConnectResult = {
    success: true,
    message: ""
  }

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    logger.info("Pinged your deployment. You successfully connected to MongoDB!");
    connectResult.message = "Connected to MongoDB";
  } catch (error){
    logger.error(`Error in connect db: ${error}`)
    connectResult.success = false;
    connectResult.message = `Error in connect db: ${error}`;
  } finally{
    return connectResult;
  }
}
 export default  connectMongoDb;


/**
 * Close db
 */

export const shutdown = async () => {
  logger.info("\n👋 Gracefully shutting down...");
  try {
    await client.close();
    logger.info("✅ MongoDB connection closed.");
  } catch (err) {
    logger.error("❌ Error closing MongoDB connection:", err);
  } finally {
    process.exit(0); // ensures the app stops cleanly.
  }
};

process.on("SIGINT", shutdown); // SIGINT is triggered on Ctrl+C => close if press ctrl+c
process.on("SIGTERM", shutdown); // SIGTERM is sent by systems like Docker or PM2 on shutdown.


