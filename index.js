const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

// إعداد البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// معرف البوت
const CLIENT_ID = "1446924508043804742";

// خريطة لتخزين النقاط مؤقتًا
const points = new Map();
const RANK_ROLE = "نقاط"; // اسم الرتبة اللازمة لإعطاء نقاط

// تسجيل أمر /say عالمي
const commands = [
    new SlashCommandBuilder()
        .setName("say")
        .setDescription("يكتب أي كلام تختاره")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("اكتب كلامك هنا")
                .setRequired(true)
        )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("⏳ تسجيل الأوامر عالمياً...");
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
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

// مراقبة الرسائل لنظام النقاط في أي سيرفر
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const args = message.content.split(" ");
    const command = args[0];

    // ======= نقاط =======
    if (command === "نقاط") {
        const userPoints = points.get(message.author.id) || 0;
        message.reply(`لديك ${userPoints} نقاط`);
    }

    // ======= اعطاء =======
    else if (command === "اعطاء") {
        if (!message.member.roles.cache.some(r => r.name === RANK_ROLE)) {
            return message.reply("ليس لديك الرتبة اللازمة لإعطاء نقاط!");
        }

        const mentionedUser = message.mentions.users.first();
        const amount = parseInt(args[2]);
        if (!mentionedUser || isNaN(amount)) return;

        const currentPoints = points.get(mentionedUser.id) || 0;
        points.set(mentionedUser.id, currentPoints + amount);

        message.channel.send(`${mentionedUser} تم إعطاؤه ${amount} نقاط`);
    }

    // ======= تحويل =======
    else if (command === "تحويل") {
        const mentionedUser = message.mentions.users.first();
        const amount = parseInt(args[2]);
        if (!mentionedUser || isNaN(amount)) return;

        const myPoints = points.get(message.author.id) || 0;
        if (myPoints < amount) {
            return message.reply("ليس لديك رصيد كافي للتحويل");
        }

        points.set(message.author.id, myPoints - amount);
        const targetPoints = points.get(mentionedUser.id) || 0;
        points.set(mentionedUser.id, targetPoints + amount);

        message.channel.send(`${message.author} تم تحويل ${amount} نقاط إلى ${mentionedUser}`);
    }

    // ======= شراء_نقاط =======
    else if (command === "شراء_نقاط") {
        const amount = parseInt(args[1]);
        if (isNaN(amount)) return;

        const myPoints = points.get(message.author.id) || 0;
        if (myPoints < amount) return message.reply("ليس لديك نقاط كافية للشراء");

        points.set(message.author.id, myPoints - amount);
        message.reply(`تم شراء نقاط بنجاح ${message.author}`);
    }

    // ======= شراء_حساب =======
    else if (command === "شراء_حساب") {
        const amount = parseInt(args[1]);
        if (isNaN(amount)) return;

        const myPoints = points.get(message.author.id) || 0;
        if (myPoints < amount) return message.reply("ليس لديك نقاط كافية للشراء");

        points.set(message.author.id, myPoints - amount);
        message.reply(`تم شراء الحساب بنجاح ${message.author}`);
    }
});

client.login(process.env.TOKEN);
