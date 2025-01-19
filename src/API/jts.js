import axios from "axios";
var localhost = "http://192.168.90.22:4000";

export const baseUrl = localhost;
export default axios.create({
  baseURL: baseUrl,
});
