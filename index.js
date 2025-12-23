const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const CLIENT_ID = "1446924508043804742";
const points = new Map(); // خريطة النقاط
const PRICE_ACCOUNT = 30;
const RANK_ROLE = "نقاط";

// تسجيل أمر /add
const commands = [
    new SlashCommandBuilder()
        .setName("add")
        .setDescription("يظهر قائمة شراء النقاط أو الحسابات")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log("✅ تم تسجيل الأوامر");
    } catch (error) {
        console.error(error);
    }
})();

client.once("ready", () => {
    console.log(`✅ البوت شغال: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    // أمر /add
    if (interaction.isCommand() && interaction.commandName === "add") {
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("purchase_select")
                .setPlaceholder("اختر خيار الشراء")
                .addOptions([
                    { label: "شراء_نقاط", value: "buy_points" },
                    { label: "شراء_حسابات", value: "buy_account" }
                ])
        );

        await interaction.reply({ content: "اختر ما تريد شراءه:", components: [row], ephemeral: false });
    }

    // التعامل مع قائمة الاختيار
    else if (interaction.isStringSelectMenu() && interaction.customId === "purchase_select") {
        const choice = interaction.values[0];
        const userId = interaction.user.id;
        const guild = interaction.guild;

        if (choice === "buy_account") {
            const userPoints = points.get(userId) || 0;

            if (userPoints < PRICE_ACCOUNT) {
                return interaction.reply({ content: "رصيدك غير كافي", ephemeral: true });
            }

            points.set(userId, userPoints - PRICE_ACCOUNT);
            interaction.reply({ content: "تم شراء الحساب بنجاح ✅", ephemeral: true });
        }

        else if (choice === "buy_points") {
            guild.channels.create({
                name: `Tickets نقاط`,
                type: 0, // text channel
                permissionOverwrites: [
                    { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: userId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                    { id: guild.roles.cache.find(r => r.name === RANK_ROLE)?.id || "0", allow: [PermissionsBitField.Flags.ViewChannel] }
                ],
            }).then(channel => {
                interaction.reply({ content: `تم فتح تكت شراء نقاط ${channel}`, ephemeral: true });
            }).catch(err => {
                interaction.reply({ content: `حدث خطأ عند إنشاء الروم`, ephemeral: true });
                console.error(err);
            });
        }
    }
});

// نظام النقاط في الشات
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    const args = message.content.split(" ");
    const command = args[0];

    // نقاط
    if (command === "نقاط") {
        const userPoints = points.get(message.author.id) || 0;
        message.reply(`لديك ${userPoints} نقاط`);
    }

    // اعطاء
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

    // تحويل
    else if (command === "تحويل") {
        const mentionedUser = message.mentions.users.first();
        const amount = parseInt(args[2]);
        if (!mentionedUser || isNaN(amount)) return;

        const myPoints = points.get(message.author.id) || 0;
        if (myPoints < amount) return message.reply("ليس لديك رصيد كافي للتحويل");

        points.set(message.author.id, myPoints - amount);
        const targetPoints = points.get(mentionedUser.id) || 0;
        points.set(mentionedUser.id, targetPoints + amount);

        message.channel.send(`${message.author} تم تحويل ${amount} نقاط إلى ${mentionedUser}`);
    }
});

client.login(process.env.TOKEN);
