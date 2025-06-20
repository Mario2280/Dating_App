require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Вставьте сюда токен вашего бота
const token = process.env.TELEGRAM_BOT_TOKEN || "";

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start с параметром (например, /start some_data)
bot.onText(/^\/start(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1]; // параметр после /start, если есть
  console.log(chatId);
  
  if (param) {
    bot.sendMessage(chatId, `Привет! Вы запустили бота с параметром: ${param}`);
    // Здесь можно обработать параметр, например, включить уведомления
  } else {
    bot.sendMessage(chatId, 'Привет! Это простой бот. Используйте /help для справки.');
  }
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `
Команды бота:
/start - Запустить бота
/start <параметр> - Запустить бота с параметром
/help - Показать эту справку
  `;
  bot.sendMessage(chatId, helpText);
});

// Обработка любых текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Игнорируем команды, чтобы не дублировать ответы
  if (msg.text.startsWith('/')) return;

  bot.sendMessage(chatId, `Вы написали: ${msg.text}`);
});
