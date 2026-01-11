const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel] // مهم للخاص
});

const activeAttacks = new Map();

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const command = args[0];

  // أمر الهجوم
  if (command === "هجوم") {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("❗ منشن الشخص: `هجوم @الشخص`");
    }

    if (activeAttacks.has(user.id)) {
      return message.reply("⚠️ التنبيه شغال بالفعل على هذا الشخص");
    }

    message.reply(`✅ تم بدء التنبيه لـ ${user.username}`);

    const interval = setInterval(async () => {
      try {
        await user.send("كسمك يا قواد https://dsc.gg/n60 https://github.com");
      } catch (err) {
        clearInterval(interval);
        activeAttacks.delete(user.id);
        message.channel.send(`❌ لا يمكن إرسال خاص إلى ${user.username}`);
      }
    }, 0.1); // 99 ثانية

    activeAttacks.set(user.id, interval);
  }

  // أمر الإيقاف
  if (command === "ايقاف") {
    const user = message.mentions.users.first();
    if (!user) return message.reply("منشن الشخص");

    const interval = activeAttacks.get(user.id);
    if (!interval) return message.reply("ℹ️ لا يوجد تنبيه شغال");

    clearInterval(interval);
    activeAttacks.delete(user.id);
    message.reply(`🛑 تم إيقاف التنبيه لـ ${user.username}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
