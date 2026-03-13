import axios from "axios";
import "dotenv/config";

const apiKey = process.env["API_KEY"];
const baseURL = "https://reqres.in/api/";
export const users_per_page = 6;
export const total_users = 12;

if (!apiKey) {
  throw new Error("API_KEY is not set in the environment");
}

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": apiKey,
  },
  validateStatus: () => true, // Allow none 2xx status codes so they can be asserted in tests
});
