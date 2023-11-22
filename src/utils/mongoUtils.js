const { MongoClient } = require("mongodb");
require("dotenv").config();

let notes_db;

module.exports = {
  connectToServer: async function (callback) {
    const mongoUri = process.env.MONGO_URI;
    const notesDBName = process.env.NOTES_DB;

    const notesClient = new MongoClient(mongoUri, {
      useUnifiedTopology: true,
    });

    try {
      await notesClient.connect();

      notes_db = notesClient.db(notesDBName);
      callback();
    } catch (e) {
      console.error(e);
      callback(e);
    }
  },

  getNotesDb: function () {
    return notes_db;
  },
};
