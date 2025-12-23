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
                        {
                            label: "شراء_نقاط",
                            value: "buy_points"
                        },
                        {
                            label: "شراء_حسابات",
                            value: "buy_account"
                        }
                    ])
            );

            await interaction.reply({ content: "اختر ما تريد شراءه:", components: [row], ephemeral: true });
        }
    }

    // التعامل مع Select Menu
    else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "purchase_select") {
            const choice = interaction.values[0];
            const userId = interaction.user.id;

            if (choice === "buy_account") {
                const userPoints = points.get(userId) || 0;
                if (userPoints < PRICE_ACCOUNT) {
                    return interaction.update({ content: "رصيدك غير كافي", components: [], ephemeral: true });
                }
                points.set(userId, userPoints - PRICE_ACCOUNT);
                interaction.update({ content: "تم شراء الحساب بنجاح ✅", components: [], ephemeral: true });
            }

            else if (choice === "buy_points") {
                const guild = interaction.guild;

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
                    ],
                }).then(channel => {
                    interaction.update({ content: `تم إنشاء روم خاص لشراء النقاط: ${channel}`, components: [], ephemeral: true });
                }).catch(err => {
                    interaction.update({ content: `حدث خطأ عند إنشاء الروم`, components: [], ephemeral: true });
                    console.error(err);
                });
            }
        }
    }
});

client.login(process.env.TOKEN);
