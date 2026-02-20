import axios from "axios";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
if (!apiKey) throw new Error("Missing VITE_FIREBASE_API_KEY in .env");

export default axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: { key: apiKey },
  headers: { "Content-Type": "application/json" },
});
