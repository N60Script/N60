const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ شغال: ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "say") {
    const text = interaction.options.getString("text");
    await interaction.reply({
      content: text,
      ephemeral: false
    });
  }
});

client.login(process.env.TOKEN);
