const { io } = require("socket.io-client");
require("dotenv").config();

const socket = io(process.env.BACKEND_URL);

module.exports = socket;