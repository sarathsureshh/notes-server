import {
  processCreateNotes,
  processDeleteNotes,
} from "../process/processNotesData.js";

export async function services(routePath) {
  routePath.get("/health", async function (req, res) {
    res.status(200).json({ status: "OK" });
  });

  routePath.get("/notes", async function (req, res) {
    res.status(200).json({ status: "OK" });
  });

  routePath.post("/notes", async function (req, res) {
    await processCreateNotes(req, res);
  });

  routePath.put("/notes", async function (req, res) {
    res.status(200).json({ status: "OK" });
  });

  routePath.delete("/notes", async function (req, res) {
    await processDeleteNotes(req, res);
  });
}
