const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // ضروري لقراءة الرسائل
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

        // إرسال الكلام
        await interaction.reply({ content: text, ephemeral: false });
    }
});

// مراقبة أي رسالة تحتوي كلمات معينة
client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // تجاهل رسائل البوت نفسه

    const triggers = ["/delta", "/krnl"];

    for (let trigger of triggers) {
        if (message.content.includes(trigger)) {
            await message.channel.send(
                `اول شي اكتب ${trigger} على حسب الهاك بعدها حط فيه رابط المفتاح وارجع حط المفتاح في قوقل تلقاه اشتغل`
            );
            break; // يكفي مرة واحدة لكل رسالة
        }
    }
});

client.login(process.env.TOKEN);
