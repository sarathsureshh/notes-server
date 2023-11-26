import { createUser } from "../auth/auth.js";

export async function authServices(routePath) {
  routePath.post("/createUser", async function (req, res) {
    await createUser(req, res);
  });
}
