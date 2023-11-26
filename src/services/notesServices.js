import {
  processCreateNotes,
  processDeleteNotes,
  processGetNotes,
  processUpdateNotes,
} from "../process/processNotesData.js";

export async function notesServices(routePath) {
  routePath.get("/health", async function (req, res) {
    res.status(200).json({ status: "OK" });
  });

  routePath.get("/notes", async function (req, res) {
    await processGetNotes(req, res);
  });

  routePath.post("/notes", async function (req, res) {
    await processCreateNotes(req, res);
  });

  routePath.put("/notes", async function (req, res) {
    processUpdateNotes(req, res);
  });

  routePath.delete("/notes", async function (req, res) {
    await processDeleteNotes(req, res);
  });
}
