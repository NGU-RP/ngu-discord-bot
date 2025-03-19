const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences // Hinzugefügt
  ] 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set bot status
  client.user.setActivity(`337 Spieler`, { type: ActivityType.WATCHING });
});

client.on('messageCreate', message => {
  console.log(`Received message: "${message.content}" from ${message.author.tag} in ${message.channel.name}`);

  if (message.content.startsWith('!embed')) {
    console.log('Embed command detected');

    const embedDescription = message.content.substring(7).trim();
    console.log(`Embed description: "${embedDescription}"`);

    const embed = {
      description: embedDescription,
      color: '006666',
      footer: {
        text: 'NGU-RP.com',
        icon_url: 'https://ngu-rp.com/wp-content/uploads/2023/11/31b25197-a414-4d1e-9f7a-3cda2e56b535.png',
      },
    };

    message.channel.send({ embeds: [embed] })
      .then(() => console.log('Embed sent successfully'))
      .catch(console.error);

    // Lösche die ursprüngliche Nachricht nach 3 Sekunden
    setTimeout(() => {
      message.delete()
        .then(() => console.log('User message deleted'))
        .catch(console.error);
    }, 3000);
  }
});

const prefix = '!';

client.on('messageCreate', message => {
    // Ignoriere Nachrichten von Bots, einschließlich des eigenen Bots
    if (message.author.bot) return;

    // Prüfe, ob die Nachricht mit dem Präfix beginnt
    if (!message.content.startsWith(prefix)) return;

    // Entferne das Präfix und spalte die Nachricht in Argumente
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Prüfe, ob der Befehl "message" ist
    if (command === 'message') {
        // Füge die restlichen Argumente zu einer Nachricht zusammen
        const response = args.join(' ');

        // Sende die Antwort zurück in den gleichen Kanal
        message.channel.send(response);
    }
});


client.login('DUBISTEINNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOB');

client.on('error', console.error);
client.on('warn', console.warn);
client.on('debug', console.log);
