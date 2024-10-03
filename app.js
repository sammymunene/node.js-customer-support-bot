const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a bot instance
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Welcome message
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Support Bot! How can I assist you today?');
});

// Handle user messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text.toLowerCase();


  if(userMessage.includes('/start')){
    bot.sendMessage(chatId, 'Hello there, I am your SBA assistant, how may I help you?')
  }
  else if (userMessage.includes('reset password')) {
    bot.sendMessage(chatId, 'To reset your password, please follow this link: https://technoleo.net');
  } else if (userMessage.includes('open ticket')) {
    bot.sendMessage(chatId, 'You can open a support ticket by emailing support@example.com.');
  } else {
    bot.sendMessage(chatId, 'I\'m sorry, but I didn\'t understand that. Please try again.');
  }
});

console.log('Bot is running...');
