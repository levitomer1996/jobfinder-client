import axios from "axios";
export const dbserver = "http://10.100.102.122:4000";

export const baseUrl = dbserver;
export default axios.create({
  baseURL: baseUrl,
});
