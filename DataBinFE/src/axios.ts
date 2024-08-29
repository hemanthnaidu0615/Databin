import axios from "axios";

const authFetch = axios.create({
  baseURL: "https://databin-meridianit.com/backend/v2",
});

export default authFetch;