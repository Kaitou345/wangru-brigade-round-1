const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.BACKEND_URL;

async function getStatus() {
    try {
        const response = await axios.get(`${BASE_URL}/discord/status`);
        return response.data.answer;
    } catch (err) {
        console.error("GET /discord/status:", err.message);
        return "Status Unavailable.";
    }

}
async function getUsage() {
    try {
        const response = await axios.get(`${BASE_URL}/discord/usage`);
        return response.data.answer;
    } catch (err) {
        console.error("GET /discord/usage:", err.message);
        return "Usage unavailable ";
    }

}

async function getRoom(roomName) {
    try {
        const response = await axios.get(`${BASE_URL}/discord/room/${roomName}`);
        return response.data.answer;

    } catch (err) {
        console.error("GET /discord/room/{roomName}:", err.message);
        return "Room not found";
    }
}
module.exports = {
    getStatus, getUsage, getRoom
}