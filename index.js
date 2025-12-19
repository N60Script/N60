const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // ضروري لقراءة الرسائل وحذفها
    ]
});

// ضع هنا ID السيرفر الخاص بك
const GUILD_ID = "1414604618713006132";
const CLIENT_ID = "1446924508043804742";

// تسجيل الـ Slash Command /say
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

// التعامل مع أوامر Slash Commands
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "say") {
        const text = interaction.options.getString("text");
        await interaction.reply({ content: text, ephemeral: false });
    }
});

// مراقبة رسائل "حذف <رقم>"
client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // تجاهل رسائل البوت نفسه

    // التحقق من أن الرسالة تبدأ بكلمة "حذف"
    if (message.content.startsWith("حذف")) {
        const parts = message.content.split(" ");
        const count = parseInt(parts[1]); // الرقم اللي كتبته بعد "حذف"

        if (!isNaN(count) && count > 0) {
            // استرجاع الرسائل الأخيرة
            const messages = await message.channel.messages.fetch({ limit: count + 1 }); 
            // +1 عشان يشمل رسالة "حذف" نفسها
            await message.channel.bulkDelete(messages)
                .catch(err => console.log("لا يمكن حذف الرسائل:", err));
        }
    }
});

client.login(process.env.TOKEN);
