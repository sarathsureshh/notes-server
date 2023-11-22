module.exports = {
  services: async function (routePath) {
    routePath.get("/notes", function (req, res) {
      console.log("Hi");
      res.status(200).json({ status: "OK" });
    });
    routePath.get("/health", function (req, res) {
      res.status(200).json({ status: "OK" });
    });
  },
};
