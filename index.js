const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// ضع هنا ID السيرفر الخاص بك
const GUILD_ID = "1414604618713006132";
const CLIENT_ID = "1446924508043804742";

// تسجيل الـ Slash Command
const commands = [
    new SlashCommandBuilder()
        .setName("say")
        .setDescription("يكتب أي كلام تختاره")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("اكتب كلامك هنا")
                .setRequired(true)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("⏳ تسجيل الأوامر...");
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log("✅ تم تسجيل الأوامر");
    } catch (error) {
        console.error(error);
    }
})();

// تشغيل البوت
client.once("ready", () => {
    console.log(`✅ البوت شغال: ${client.user.tag}`);
});

// التعامل مع الأوامر
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "say") {
        const text = interaction.options.getString("text");

        // إرسال الكلام
        await interaction.reply({ content: text, ephemeral: false });
    }
});

client.login(process.env.TOKEN);
