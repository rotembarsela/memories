import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_API_URL || "http://localhost:3000",
});

export { api };
