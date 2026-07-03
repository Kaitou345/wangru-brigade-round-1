const axios = require("axios");

const BASE_URL = process.env.BACKEND_URL;

async function get(path) {
    const response = await axios.get(`${BASE_URL}${path}`);
    return response.data;
}

module.exports = {
    get
};