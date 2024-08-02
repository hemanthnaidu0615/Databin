const axios = require('axios');

const authFetch = axios.create({
  baseURL: "http://13.233.98.14:3000/v2",
});

module.exports = authFetch;
// http://13.233.98.14:3000
