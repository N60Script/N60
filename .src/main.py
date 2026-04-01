import discord
from discord import app_commands
import asyncio
import os

TOKEN = os.getenv('TOKEN')

class MyClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.tree = app_commands.CommandTree(self)
    async def setup_hook(self):
        await self.tree.sync()

client = MyClient()

@client.tree.command(name="say", description="ارسال رسالة بوقت محدد")
async def say(interaction: discord.Interaction, seconds: float, message: str):
    await interaction.response.send_message(f"جاري الانتظار {seconds} ثانية...", ephemeral=True)
    await asyncio.sleep(seconds)
    await interaction.channel.send(message)

client.run(TOKEN)
