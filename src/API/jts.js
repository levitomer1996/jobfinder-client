import axios from "axios";
var localhost = "http://localhost:4000";

export const baseUrl = localhost;
export default axios.create({
  baseURL: baseUrl,
});
