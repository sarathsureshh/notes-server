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

export async function updateOne(searchQuery, updateObject, collection) {
  try {
    let db = getNotesDb();
    const result = await db
      .collection(collection)
      .updateOne(searchQuery, { $set: updateObject });

    if (result?.modifiedCount > 0) {
      return result?.modifiedCount;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Error updating object: ${error}`);
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

export async function findFew(pageSize, pageNumber, collection) {
  try {
    let db = getNotesDb();
    let skip = (pageNumber - 1) * pageSize;
    const result = await db
      .collection(collection)
      .find({})
      .skip(skip)
      .limit(pageSize)
      .toArray();
    if (result) {
      return result;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Error inserting object: ${error}`);
  }
}

export async function getDocumentCount(collection) {
  try {
    let db = getNotesDb();
    const result = await db.collection(collection).countDocuments();
    if (result) {
      return result;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Error inserting object: ${error}`);
  }
}
