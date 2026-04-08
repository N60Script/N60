import os
import asyncio
import discord
from discord import app_commands
from discord.ext import commands

# جلب التوكن من إعدادات الاستضافة (Environ Variable)
# تأكد إنك سميت السيكرت في GitHub أو في الاستضافة باسم TOKEN
TOKEN = os.environ.get('TOKEN')

class BotLap(commands.Bot):
    def __init__(self):
        # Intents ضرورية لعمل البوت بشكل صحيح
        intents = discord.Intents.default()
        intents.message_content = True 
        super().__init__(command_prefix="!", intents=intents)

    async def setup_hook(self):
        # مزامنة الأوامر مع سيرفرات ديسكورد لتظهر أوامر الـ /
        try:
            await self.tree.sync()
            print(f"✅ تم بنجاح مزامنة أوامر الـ Slash")
        except Exception as e:
            print(f"❌ فشل مزامنة الأوامر: {e}")

bot = BotLap()

# --- [1] أمر التحدث (/say) ---
@bot.tree.command(name="say", description="يجعل البوت يرسل رسالة محددة")
@app_commands.describe(message="النص الذي تريد من البوت كتابته")
async def say(interaction: discord.Interaction, message: str):
    # إرسال رد مخفي للمستخدم ليعلم أن الطلب تم
    await interaction.response.send_message("✅ تم الإرسال!", ephemeral=True)
    # إرسال الرسالة المطلوبة في القناة
    await interaction.channel.send(message)

# --- [2] أمر السبام (/spam) ---
@bot.tree.command(name="spam", description="إرسال رسائل متكررة بسرعة")
@app_commands.describe(
    message="النص المراد تكراره", 
    count="عدد مرات التكرار", 
    speed="السرعة (ثانية بين كل رسالة)"
)
async def spam(interaction: discord.Interaction, message: str, count: int = 5, speed: float = 0.5):
    await interaction.response.send_message(f"🚀 بدأ السبام: {count} رسالة", ephemeral=True)
    
    for i in range(count):
        try:
            await interaction.channel.send(f"{message} `[{i+1}]`")
            # الانتظار حسب السرعة المحددة (يفضل ألا تقل عن 0.4 لتجنب التبند)
            await asyncio.sleep(speed)
        except Exception as e:
            print(f"⚠️ توقف السبام: {e}")
            break

# --- تشغيل البوت ---
if __name__ == "__main__":
    if TOKEN:
        print("⏳ جاري تشغيل BotLap...")
        bot.run(TOKEN)
    else:
        print("❌ خطأ: لم يتم العثور على TOKEN. تأكد من إضافته في الـ Environment Variables.")
