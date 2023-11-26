import axios from "axios";

export async function doGet(url, params, headers) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error.message);
    throw error;
  }
}

export async function doPost(url, params, headers, payload) {
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error("POST request error:", error.message);
    throw error;
  }
}
