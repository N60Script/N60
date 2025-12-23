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
    if (interaction.isCommand()) {
        if (interaction.commandName === "add") {
            const row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("purchase_select")
                    .setPlaceholder("اختر خيار الشراء")
                    .addOptions([
                        { label: "شراء_نقاط", value: "buy_points" },
                        { label: "شراء_حسابات", value: "buy_account" }
                    ])
            );

            // هنا تظهر القائمة للجميع
            await interaction.reply({ content: "اختر ما تريد شراءه:", components: [row], ephemeral: false });
        }
    }

    else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "purchase_select") {
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
                        {
                            id: guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: userId,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: guild.roles.cache.find(r => r.name === RANK_ROLE)?.id || "0",
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ],
                }).then(channel => {
                    interaction.reply({ content: `تم فتح تكت شراء نقاط ${channel}`, ephemeral: true });
                }).catch(err => {
                    interaction.reply({ content: `حدث خطأ عند إنشاء الروم`, ephemeral: true });
                    console.error(err);
                });
            }
        }
    }
});

client.login(process.env.TOKEN);
