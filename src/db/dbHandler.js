import { ObjectId } from "mongodb";
import { getNotesDb } from "../utils/mongoUtils.js";

export async function insertOne(insertObject, collection) {
  try {
    let db = getNotesDb();
    const result = await db.collection(collection).insertOne(insertObject);
    if (result?.insertedId) {
      return result?.insertedId?.toString();
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Error inserting object: ${error}`);
  }
}

export async function deleteOne(deleteObject, collection) {
  try {
    let db = getNotesDb();
    const objectIdToDelete = new ObjectId(deleteObject);
    const result = await db
      .collection(collection)
      .deleteOne({ _id: objectIdToDelete });
    if (result.deletedCount === 1) {
      return deleteObject;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Error inserting object: ${error}`);
  }
}
