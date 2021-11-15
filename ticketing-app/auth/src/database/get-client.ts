import mongoose from "mongoose";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { getLogger } from "../logger/create-client";
const logger = getLogger();

export async function getMongoClient() {
  try {
    await mongoose.connect(process.env.DB_HOST || "");
    logger.info('successfully connected to the database');
    return mongoose;
  } catch (err) {
    console.error(err);
    logger.error(new DatabaseConnectionError());
    process.exit();
  }
}


