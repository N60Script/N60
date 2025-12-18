const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("say")
    .setDescription("يرسل كلام بدون اسمك")
    .addStringOption(option =>
      option
        .setName("text")
        .setDescription("الكلام")
        .setRequired(true)
    )
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("⏳ تسجيل الأمر...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ تم تسجيل /say");
  } catch (error) {
    console.error(error);
  }
})();
