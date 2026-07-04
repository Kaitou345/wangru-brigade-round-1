const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const {
    DRAWING,
    ROOM_1,
    ROOM_2
} = require("./simulator/constants");

const ROOM_MAP = {
    drawing: DRAWING,
    work1: ROOM_1,
    work2: ROOM_2
};

const simulator = require("./simulator/simulator");
const llm = require("./llm");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

/* -----  Simulator  ----- */

simulator.on("update", (state) => {
    io.emit("office:update", state);
});

simulator.start();

/* ---- Socket.IO ----- */

io.on("connection", (socket) => {

    console.log(`Client connected: ${socket.id}`);

    socket.emit("office:update", simulator.getState());

});

/* -----  REST API  -----*/

app.get("/api/state", (req, res) => {
    res.json(simulator.getState());
});

app.get("/api/usage", (req, res) => {
    res.json(simulator.getUsage());
});

app.get("/api/alerts", (req, res) => {
    res.json(simulator.getAlerts());
});

/* -----  Gemini Helper  -----*/

async function ask(question, context) {

    const prompt = `
You are OfficeErPeon, an AI office energy monitoring assistant.

Current Data:

${JSON.stringify(context, null, 2)}

Question:
${question}

Rules:
- Keep responses under 80 words.
- Sound natural.
- Be concise.
- Your messages should be formatted well, so that a user can instantly get their necessary info
- Your reply should always sound friendly and funny
- Never invent information.
- Mention rooms, active devices and power if relevant.
`;

    return await llm.ask(prompt);

}

/* -----   Discord Endpoints  ----- */

app.get("/api/discord/status", async (req, res) => {

    try {

        const answer = await ask(
            "Summarize the current office status. Only mention what appliances are being run in which rooms. Don't mention power usage.",
            simulator.getState()
        );

        res.json({ answer });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            answer: "⚠️ Backend unavailable."
        });

    }

});

app.get("/api/discord/usage", async (req, res) => {

    try {

        const answer = await ask(
            "Summarize power usage. Make the reply noticeable and the infos should be highlighted.",
            simulator.getUsage()
        );

        res.json({ answer });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            answer: "⚠️ Backend unavailable."
        });

    }

});

app.get("/api/discord/room/:room", async (req, res) => {

    try {

        const roomName = ROOM_MAP[req.params.room.toLowerCase()];
        console.log(roomName)
        if (!roomName) {
            return res.status(404).json({
                answer: "Unknown room."
            });
        }

        const answer = await ask(
            `Describe the current status of ${roomName}.",`,
            simulator.getRoom(roomName)
        );

        res.json({ answer });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            answer: "⚠️ Backend unavailable."
        });

    }

});

app.get("/api/discord/alerts", async (req, res) => {

    try {

        const answer = await ask(
            "Summarize the active alerts. If there are none, explicitly say there are no active alerts.",
            simulator.getAlerts()
        );

        res.json({ answer });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            answer: "⚠️ Backend unavailable."
        });

    }

});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});