import { deleteOne, insertOne } from "../db/dbHandler.js";

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
