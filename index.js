const { Client, GatewayIntentBits, AuditLogEvent } = require('discord.js');

const GUILD_ID = "1414604618713006132";
const EXEMPT_ROLE_NAME = "N60"; // الرتبة الوحيدة المسموح لها Kick / Ban
const ALERT_CHANNEL_ID = "1460025824425017455";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} جاهز 🔥`);
});

// مراقبة الطرد والبان
client.on('guildMemberRemove', async member => {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return;

    try {
        // آخر عملية Kick
        const kickLogs = await guild.fetchAuditLogs({
            limit: 5,
            type: AuditLogEvent.MemberKick
        });
        const kickEntry = kickLogs.entries.find(e => e.target?.id === member.id);

        // آخر عملية Ban
        const banLogs = await guild.fetchAuditLogs({
            limit: 5,
            type: AuditLogEvent.MemberBanAdd
        });
        const banEntry = banLogs.entries.find(e => e.target?.id === member.id);

        const entry = kickEntry || banEntry;
        if (!entry) return;

        const executor = entry.executor;
        if (!executor || executor.bot) return;

        const executorMember = await guild.members.fetch(executor.id).catch(() => null);
        if (!executorMember) return;

        // تحقق من رتبة N60 (لا نهتم بأي صلاحيات أخرى)
        const hasN60 = executorMember.roles.cache.some(
            role => role.name === EXEMPT_ROLE_NAME
        );

        const alertChannel = guild.channels.cache.get(ALERT_CHANNEL_ID);

        if (!hasN60) {
            if (executorMember.kickable) {
                await executorMember.kick("محاولة Kick/Ban بدون رتبة N60");

                alertChannel?.send(
                    `🚨 **تم طرد الإداري**\n` +
                    `👤 المنفذ: ${executor.tag}\n` +
                    `❌ بدون رتبة: ${EXEMPT_ROLE_NAME}\n` +
                    `🛡️ العضو المحمي: ${member.user.tag}`
                );

                console.log(`🚨 ${executor.tag} تم طرده (بدون N60)`);
            } else {
                alertChannel?.send(
                    `⚠️ ${executor.tag} حاول Kick/Ban بدون N60 لكن رتبة البوت أقل`
                );
            }
        } else {
            alertChannel?.send(
                `✅ ${executor.tag} نفذ Kick/Ban (مسموح – رتبة N60)`
            );
        }

    } catch (err) {
        console.error("❌ خطأ في نظام الحماية:", err);
    }
});

// تسجيل الدخول بالتوكن من Railway Variables
client.login(process.env.DISCORD_TOKEN);
