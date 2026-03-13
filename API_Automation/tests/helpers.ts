import axios from "axios";
import "dotenv/config";

const apiKey = process.env["API_KEY"];

if (!apiKey) {
  throw new Error("API_KEY is not set in the environment");
}

export const apiClient = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    "x-api-key": apiKey,
  },
  validateStatus: () => true, // Allow handling of all status codes in tests
});
