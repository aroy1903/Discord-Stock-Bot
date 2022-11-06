const { Client, GatewayIntentBits, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { getStock, getCoin } = require('./stockCrypto');
require('dotenv').config();

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;
const rest = new REST({ version: 10 }).setToken(TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.commandName === 'stock') {
    const stock = interaction.options.getString('symbol');
    const stockPrice = await getStock(stock);
    interaction.reply({ content: stockPrice });
  } else if (interaction.commandName === 'help') {
    interaction.reply({
      content: `Enter a stocks symbols to get its value or enter a crytocurrency's symbol`,
    });
  } else if (interaction.commandName === 'crypto') {
    const coin = interaction.options.getString('coin');
    const coinVal = await getCoin(coin);
    interaction.reply({ content: coinVal });
  }
});

(async function main() {
  const commands = [
    {
      name: 'stock',
      description: 'Enter a stocks symbols to get its value in USD',
      options: [
        {
          name: 'symbol',
          description: 'A valid US Stock symbol',
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: 'crypto',
      description: 'Enter a valid crypto coin to get its value in USD',
      options: [
        {
          name: 'coin',
          description: 'A valid coin',
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: 'help',
      description: 'Help!',
    },
  ];
  try {
    client.login(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    console.log(err);
  }
})();
