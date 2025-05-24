import axios from "axios";
export const dbserver = "http://localhost:4000";

export const baseUrl = dbserver;
export default axios.create({
  baseURL: baseUrl,
});
