import {
    Client,
    GatewayIntentBits
} from "discord.js";

import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
});


client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    const args = message.content.slice(1).split(" ");

    const command = args.shift().toLowerCase();

    // handle individual !commands 

    switch (command) {

        case "ping":
            return message.reply("🏓 Pong!");

        case "help":
            return message.reply(`
!status
!usage
!room drawing
!room work1
!room work2
            `);

        case "status": {

            const s = backend.status();

            return message.reply(`
Drawing Room: ${s.drawing.fans} fan(s) ON, ${s.drawing.lights} light(s) ON
Work Room 1: ${s.work1.fans} fan(s) ON, ${s.work1.lights} light(s) ON
Work Room 2: ${s.work2.fans} fan(s) ON, ${s.work2.lights} light(s) ON
            `);

        }

        case "usage": {

            const u = backend.usage();

            return message.reply(
                `⚡ ${u.power}W\n📈 ${u.today} kWh today`
            );

        }

        case "room": {

            const room = backend.room(args[0]);

            if (!room)
                return message.reply("Unknown room.");

            return message.reply(
                `Fans ON: ${room.fans}\nLights ON: ${room.lights}`
            );

        }

        default:
            return message.reply("Unknown command.");

    }

});

client.login(process.env.DISCORD_TOKEN);