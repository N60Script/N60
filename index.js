const { Client, GatewayIntentBits, Partials, AuditLogEvent } = require("discord.js");

// ================= إعدادات =================
const OWNER_ID = "1328099909425041540";          // ينشنك بعد كل حدث
const LOG_CHANNEL_ID = "1460048960335904892";   // روم اللوق

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// ================= دالة إرسال التنبيه =================
async function sendLog(message) {
  const channel = await client.channels.fetch(LOG_CHANNEL_ID).catch(() => null);
  if (!channel) return;
  channel.send(message);
}

// ================= حدث جاهزية البوت =================
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// ================= مراقبة إضافة بوت =================
client.on("guildMemberAdd", async (member) => {
  if (!member.user.bot) return;

  const logs = await member.guild.fetchAuditLogs({
    type: AuditLogEvent.BotAdd,
    limit: 1
  });
  const entry = logs.entries.first();
  if (!entry) return;

  const { executor, target } = entry;

  sendLog(
`🚨 **تم اكتشاف نشاط مريب**
👤 يوزر الحساب: ${executor.tag}
➕ قام بإضافة: ${target.tag}
<@${OWNER_ID}>`
  );
});

// ================= مراقبة إنشاء Webhook =================
client.on("webhookUpdate", async (channel) => {
  const guild = channel.guild;
  const logs = await guild.fetchAuditLogs({
    type: AuditLogEvent.WebhookCreate,
    limit: 1
  });
  const entry = logs.entries.first();
  if (!entry) return;

  const { executor, target } = entry;
  sendLog(
`⚠️ **تم اكتشاف نشاط مريب**
👤 يوزر الحساب: ${executor.tag}
➕ قام بإنشاء Webhook: ${target.name}
<@${OWNER_ID}>`
  );
});

// ================= مراقبة Kick و Ban =================
client.on("guildMemberRemove", async (member) => {
  const guild = member.guild;

  // --- Kick ---
  let logs = await guild.fetchAuditLogs({
    type: AuditLogEvent.MemberKick,
    limit: 1
  });
  let entry = logs.entries.first();
  if (entry && entry.target?.id === member.id) {
    sendLog(
`🚨 **تم اكتشاف نظام مريب**
👤 يوزر الحساب: ${entry.executor.tag}
❌ الشخص المطرود: ${member.user.tag}
<@${OWNER_ID}>`
    );
    return;
  }

  // --- Ban ---
  logs = await guild.fetchAuditLogs({
    type: AuditLogEvent.MemberBanAdd,
    limit: 1
  });
  entry = logs.entries.first();
  if (entry && entry.target?.id === member.id) {
    sendLog(
`🚨 **تم اكتشاف نظام مريب**
👤 يوزر الحساب: ${entry.executor.tag}
🚫 الشخص المبند: ${member.user.tag}
<@${OWNER_ID}>`
    );
  }
});

// ================= تشغيل البوت =================
client.login(process.env.DISCORD_TOKEN);
