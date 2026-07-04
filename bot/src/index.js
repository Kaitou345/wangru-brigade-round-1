const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const socket = require("./socket");
const {
    getStatus,
    getUsage,
    getRoom
} = require("./api/api");

require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", () => {

    console.log(`Logged in as ${client.user.tag}`); 

    socket.on("connect", () => {

        console.log("Connected to backend.");

    });

    socket.on("disconnect", () => {

        console.log("Disconnected from backend.");

    });

    socket.on("after-hours-alert", async ({ hour, alerts }) => {

        try {

            const channel = await client.channels.fetch(
                process.env.ALERT_CHANNEL_ID
            );

            if (!channel) return;

            const grouped = {};

            for (const alert of alerts) {

                if (!grouped[alert.room]) {
                    grouped[alert.room] = [];
                }

                grouped[alert.room].push(alert.device);

            }

            let message =
                `🚨 **After Hours Alert**

🕔 Simulated Time: ${hour}:00

The following devices are still running outside office hours:

`;

            for (const room in grouped) {

                message += `📍 **${room}**\n`;

                for (const device of grouped[room]) {
                    message += `• ${device}\n`;
                }

                message += "\n";

            }

            message +=
                `Please switch them off if they're no longer needed.`;

            await channel.send(message);

        } catch (err) {

            console.error(err);

        }

    });

});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    const args = message.content.trim().split(/\s+/);

    const command = args.shift().slice(1).toLowerCase();

    try {

        switch (command) {

            case "ping": {

                return message.reply("🏓 Pong!");

            }

            case "help": {

                return message.reply(`
**Available Commands**

!status
!usage
!room drawing
!room work1
!room work2
`);

            }

            case "status": {

                const loading = await message.reply(
                    "🔍 Checking office status..."
                );

                const response = await getStatus();

                return loading.edit(response.answer);

            }

            case "usage": {

                const loading = await message.reply(
                    "⚡ Calculating power usage..."
                );

                const response = await getUsage();

                return loading.edit(response.answer);

            }

            case "room": {

                const roomName = args[0];

                if (!roomName) {

                    return message.reply(
                        "Usage: `!room drawing`, `!room work1`, or `!room work2`"
                    );

                }

                const loading = await message.reply(
                    `🏢 Checking ${roomName}...`
                );

                const response = await getRoom(roomName);

                return loading.edit(response.answer);

            }

            default: {

                return message.reply(
                    "Unknown command. Type `!help`."
                );

            }

        }

    } catch (err) {

        console.error(err);

        return message.reply(
            "❌ An unexpected error occurred."
        );

    }

});

client.login(process.env.DISCORD_TOKEN);