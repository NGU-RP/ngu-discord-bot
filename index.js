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

/*
auskommentierter Bereich, der auch mehrere
Zeilen lang sein kann
const welcomeMessage = '**Welcome to MFPSCRIPTS!** We offer scripts for your GTA roleplaying server on FiveM. Enhance your gaming experience with high quality and unique scripts. Our scripts are of the highest quality and created by experienced developers who are committed to best programming practices. \nOur Website: https://mfpscripts.com \nOur Store: https://store.mfpscripts.com \n\n*Our Discord:* https://discord.gg/mfp';
const newuserchannelId = 'DUBISTEINNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOB'; // ID des Channel

client.on('guildMemberAdd', (member) => {
  member.send(welcomeMessage)
    .then(() => console.log(`🐞 Sent welcome message to ${member.user.tag}`))
    .catch(console.error);
    // Ende DB, Anfang Normale Nachricht Chat
  	const newuserchannel = member.guild.channels.cache.get(newuserchannelId);
  	if (newuserchannel) {
    	newuserchannel.send(`**Hey new user!** \nWe welcome ${member} with us in the *Community*!`); // Erwähnen Sie den neuen Benutzer im Channel
  	} else {
    	console.log(`Channel with ID ${newuserchannelId} not found`);
  	}
});
/////// WELCOMMER
*/

//// Welcome
const welcomeMessage = "**Willkommen auf NGU!** Checke doch gerne ab was Dir der Discord so bietet. \nUnd besuch doch mal unsere Website: https://ngu-rp.com \n\n*Hier findest Du zum Discord zurück falls Du dich verirrst:* https://discord.gg/ngu-rp";

client.on('guildMemberAdd', (member) => {
  // Überprüfe, ob der Benutzer dem bestimmten Server (Guild) beigetreten ist
  const targetGuildId = 'DUBISTEINNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOB'; // Ersetze dies durch die tatsächliche Guild-ID
  if (member.guild.id !== targetGuildId) {
    console.log(`User ${member.user.tag} joined a different guild. Ignoring.`);
    return;
  }

  // Sende die Willkommensnachricht als private Nachricht
  member.send(welcomeMessage)
    .then(() => console.log(`🐞 Sent welcome message to ${member.user.tag}`))
    .catch(console.error);

  // Sende die Willkommensnachricht auch im Textchannel
  const newuserchannelId = 'DUBISTEINNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOBNOOB'; // Ersetze dies durch die tatsächliche Channel-ID
  const newuserchannel = member.guild.channels.cache.get(newuserchannelId);
  if (newuserchannel) {
    newuserchannel.send(`**Hey Du!** \nWir begrüßen ${member} bei uns in der *Community*!`);
  } else {
    console.log(`Channel with ID ${newuserchannelId} not found`);
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
