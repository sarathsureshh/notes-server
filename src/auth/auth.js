import { config } from "../config/config.js";
import { insertOne } from "../db/dbHandler.js";
import { doPost } from "../utils/httpUtils.js";

export async function createUser(req, res) {
  try {
    let inputData = req.body;
    if (inputData?.email && inputData?.password) {
      let url = `${config.firebaseAuthDomain}/${config.firebaseAuthVersion}/${config.firebaseAuthAccountsEndPoint}:signUp?key=${process.env.FIREBASE_API_KEY}`;
      let payload = {
        email: inputData?.email,
        password: inputData?.password,
        returnSecureToken: true,
      };
      let response = await doPost(url, " ", " ", payload);
      if (response?.status && response?.status === 200) {
        if (await processInsertNewUser(response)) {
          res.status(201).json({
            status: "succes",
            userId: response?.data?.localId,
          });
        }
      } else {
        res.status(400).json({
          status: "failure",
          failreReason: "Oops something wrong happend :(",
        });
      }
    } else {
      res.status(400).json({
        status: "failure",
        failreReason: "Oops something wrong happend :(",
      });
    }
  } catch (error) {
    console.log(`Error occured while creating new user, error: ${error}`);
    res
      .status(500)
      .json({ status: "failure", failreReason: "Internal Server Error" });
  }
}

async function processInsertNewUser(respData, res) {
  try {
    let data = respData?.data;
    let insertObject = {
      userId: data?.localId,
      email: data?.email,
      idToken: data?.idToken,
      refreshToken: data?.refreshToken,
      timeCreated: Date.parse(new Date()) / 1000,
      refreshTokenExpiryTime: data?.expiresIn
    };
    let resultId = await insertOne(insertObject, "users");
    if (resultId) {
      return resultId;
    }
  } catch (error) {
    console.log(`Error while processing new user, error: ${error}`);
    throw error;
  }
}
