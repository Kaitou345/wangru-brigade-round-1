const {
    Client,
    GatewayIntentBits
} = require("discord.js");

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

                const loading = await message.reply("🔍 Checking office status...");

                const response = await getStatus();

                return loading.edit(response);
            }

            case "usage": {

                const loading = await message.reply("⚡ Calculating power usage...");

                const response = await getUsage();

                return loading.edit(response);
            }

            case "room": {

                const roomName = args[0];

                if (!roomName) {
                    return message.reply(
                        "Usage: `!room drawing`, `!room work1`, or `!room work2`"
                    );
                }

                const loading = await message.reply(`🏢 Checking ${roomName}...`);

                const response = await getRoom(roomName);

                return loading.edit(response);
            }

            default:
                return message.reply(
                    "Unknown command. Type `!help` to see available commands."
                );
        }

    } catch (err) {

        console.error(err);

        return message.reply(
            "❌ An unexpected error occurred."
        );
    }

});

client.login(process.env.DISCORD_TOKEN);