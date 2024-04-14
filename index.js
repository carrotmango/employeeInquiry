const { Client, GatewayIntentBits } = require('discord.js');
const crawlWebsite  = require('../randomAIGen/randomAIGen.js');
const env = require('dotenv');
env.config();

const token = process.env.DISCORD_TOKEN

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log(`봇이 로그인되었습니다: ${client.user.tag}`);
});


client.on('messageCreate', async message => {
  if (message.author.bot) return;

  let userInput = message.content;

if(userInput == "AI" || userInput == "ai" || userInput == "Ai" || userInput == "aI"){
let image = await crawlWebsite();
await message.reply(image);
}
});

client.login(token);
/*
if (message.content.startsWith('!')) {
  let commandRegex = /^!(.+)/;
  let chtNm = userInput.match(commandRegex);

  if (chtNm) {
    chtNm = chtNm[1];
    message.reply({
      files: [{
        attachment: `E:/genshin/${chtNm}_장비.png`,
        name: `${chtNm}_장비.png`,
      }],
    });
  } 
}
if (message.content.startsWith('^')){

  let commandRegex = /^(.+)/;
  let chtNm = userInput.match(commandRegex);


  if (chtNm) {
    
    chtNm = chtNm[1];
    chtNm = chtNm.replace(/^(\^+)/, '');
    chtNm.trim();

    message.reply({
      files: [{
        attachment: `E:/genshin/${chtNm}_돌파.png`,
        name: `${chtNm}_돌파.png`,
      }],
    });
    
  }
}
*/
