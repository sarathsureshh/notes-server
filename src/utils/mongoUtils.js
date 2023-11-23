import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let notes_db;

export async function initiateDb(callback) {
  const mongoUri = process.env.MONGO_URI;
  const notesDBName = process.env.NOTES_DB;

  const notesClient = new MongoClient(mongoUri);

  try {
    await notesClient.connect();

    notes_db = notesClient.db(notesDBName);
    callback();
  } catch (e) {
    console.error(e);
    callback(e);
  }
}
export function getNotesDb() {
  return notes_db;
}
