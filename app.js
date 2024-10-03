const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const fs = require('fs');


dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Support Bot! How can I assist you today?');
});


const faqs = JSON.parse(fs.readFileSync('faqs.json', 'utf-8'));

function findAnswer(userMessage) {
    for (const faq of faqs) {
        if (userMessage.includes(faq.question.toLowerCase())) {
            return faq.answer;
        }
    }
    return "I'm sorry, I don't have an answer for that. Please contact support.";
}

// Handle user messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text.toLowerCase();

    const answer = findAnswer(userMessage);
    bot.sendMessage(chatId, answer);
});


console.log('Bot is running...');
