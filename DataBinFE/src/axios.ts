import axios from "axios";

const authFetch = axios.create({
  baseURL: "http://13.233.98.14:3000/v2",
});

export default authFetch;
// http://13.233.98.14:3000
