const { Client, GatewayIntentBits, AuditLogEvent } = require('discord.js');

const TOKEN = "MTQ0NjkwNzMyNjc3MzcyNzM2Mg.Gq5eWb.ubHzjQq8NtcZEV9hZLgyKgHwD6ddr3tuHWifgs";
const GUILD_ID = "1414604618713006132";
const EXEMPT_ROLE_NAME = "N60"; // الرتبة المسموح لها بالطرد
const ALERT_CHANNEL_ID = "1460025824425017455";

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages
    ] 
});

client.once('ready', () => {
    console.log(`${client.user.tag} جاهز!`);
});

// راقب الطرد والبان
client.on('guildMemberRemove', async member => {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return;

    try {
        // جلب آخر عملية Kick
        const kickLogs = await guild.fetchAuditLogs({
            limit: 5,
            type: AuditLogEvent.MemberKick
        });
        const kickEntry = kickLogs.entries.find(e => e.target.id === member.id);

        // جلب آخر عملية Ban
        const banLogs = await guild.fetchAuditLogs({
            limit: 5,
            type: AuditLogEvent.MemberBanAdd
        });
        const banEntry = banLogs.entries.find(e => e.target.id === member.id);

        const entry = kickEntry || banEntry; // أي عملية طرد أو بان
        if (!entry) return; // إذا ما في شيء، نخرج

        const executor = entry.executor;
        const executorMember = await guild.members.fetch(executor.id);

        // تحقق إذا لديه رتبة N60
        const hasN60 = executorMember.roles.cache.some(r => r.name === EXEMPT_ROLE_NAME);

        const alertChannel = guild.channels.cache.get(ALERT_CHANNEL_ID);

        if (!hasN60) {
            // حاول طرد الشخص بدون رتبة N60 → نطرده هو فوراً
            if (executorMember.kickable) { // نتأكد أن البوت قادر على طرده
                await executorMember.kick("حاول طرد/بان عضو بدون رتبة N60");
                if (alertChannel) {
                    alertChannel.send(`⚠️ ${executor.tag} تم طرده لأنه حاول طرد/بان ${member.user.tag} بدون رتبة N60`);
                }
                console.log(`${executor.tag} تم طرده لأنه حاول طرد/بان ${member.user.tag} بدون رتبة N60`);
            } else {
                if (alertChannel) {
                    alertChannel.send(`⚠️ ${executor.tag} حاول طرد/بان ${member.user.tag} بدون رتبة N60 لكن البوت لا يستطيع طرده (رتبة البوت أقل)`);
                }
                console.log(`${executor.tag} حاول طرد/بان ${member.user.tag} بدون رتبة N60 لكن البوت لا يستطيع طرده`);
            }
        } else {
            if (alertChannel) {
                alertChannel.send(`✅ ${executor.tag} مسموح له لأنه عنده رتبة N60`);
            }
        }

    } catch (err) {
        console.error("حدث خطأ:", err);
    }
});

client.login(TOKEN);
