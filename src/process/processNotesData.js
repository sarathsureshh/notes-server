import { ObjectId } from "mongodb";
import {
  deleteOne,
  findFew,
  insertOne,
  getDocumentCount,
  updateOne,
} from "../db/dbHandler.js";

export async function processCreateNotes(req, res) {
  try {
    const inputData = req.body;
    if (inputData) {
      const notesPayload = {
        text: inputData?.text,
        heading: inputData?.heading,
        createdTime: Date.parse(new Date()) / 1000,
        updatedTime: Date.parse(new Date()) / 1000,
        createdBy: inputData?.userName,
        parentFolder: inputData?.parentFolder,
      };
      let resultId = await insertOne(notesPayload, "notes");
      if (resultId) {
        res.status(200).json({ status: "success", id: resultId });
      } else {
        res
          .status(500)
          .json({ status: "failure", failreReason: "Internal Server Error" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failure", failreReason: "Invalid input Data" });
    }
  } catch (error) {
    console.error("Error processing create notes:", error);
    res
      .status(500)
      .json({ status: "failure", failreReason: "Internal Server Error" });
  }
}

export async function processDeleteNotes(req, res) {
  try {
    const inputData = req.body;
    if (inputData) {
      let deleteObject = inputData?.id;
      let deleteResponse = await deleteOne(deleteObject, "notes");
      if (deleteResponse === deleteObject) {
        res.status(200).json({ status: "success", deletedId: deleteResponse });
      } else {
        res
          .status(500)
          .json({ status: "failure", failreReason: "Internal Server Error" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failure", failreReason: "Invalid input Data" });
    }
  } catch (error) {
    console.error("Error processing create notes:", error);
    res
      .status(500)
      .json({ status: "failure", failreReason: "Internal Server Error" });
  }
}

export async function processGetNotes(req, res) {
  try {
    let pageSize = parseInt(req?.query?.pageSize, 10) || 25;
    let pageNumber = parseInt(req?.query?.pageNumber, 10) || 1;
    if (pageSize && pageNumber) {
      let totalCount = await getDocumentCount("notes");
      let documents = await findFew(pageSize, pageNumber, "notes");
      if (documents.length > 0) {
        let response = {
          status: "success",
          totalCount: totalCount || 0,
          pageNumber: pageNumber,
          pageSize: pageSize,
          data: documents,
        };
        res.status(200).json(response);
      } else {
        res
          .status(500)
          .json({ status: "failure", failreReason: "Internal Server Error" });
      }
    } else {
      res.status(400).json({
        status: "failure",
        failreReason: "Oops something wrong happend :(",
      });
    }
  } catch (error) {
    console.error("Error processing create notes:", error);
    res
      .status(500)
      .json({ status: "failure", failreReason: "Internal Server Error" });
  }
}

export async function processUpdateNotes(req, res) {
  try {
    const inputData = req.body;
    if (inputData) {
      let searchQuery = {
        _id: new ObjectId(inputData?.id),
      };
      let updateObject = {};
      updateObject.heading = inputData?.heading ?? undefined;
      updateObject.text = inputData?.text ?? undefined;
      updateObject.updatedBy = inputData?.updatedBy ?? undefined;
      updateObject.updatedTime = Date.parse(new Date()) / 1000;
      let modifiedCount = await updateOne(searchQuery, updateObject, "notes");
      if (modifiedCount) {
        res.status(200).json({ status: "success", response: "Notes updated" });
      } else {
        res
          .status(500)
          .json({ status: "failure", failreReason: "Internal Server Error" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failure", failreReason: "Invalid input Data" });
    }
  } catch (error) {
    console.error("Error processing create notes:", error);
    res
      .status(500)
      .json({ status: "failure", failreReason: "Internal Server Error" });
  }
}
