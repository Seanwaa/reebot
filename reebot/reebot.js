const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('../config.json');

client.on('ready', () => {
    console.log('I am ready!');
});

// the 'commands' folder is looped over to associate the event with the appropriate event file.
fs.readdir('../events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`../events/${file}`);
        let eventName = file.split('.')[0];

        // passes arguments to command accessed from file.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

/*  On message receipt check for non-bot user submitting, and appropriate command prefix.
    Isolate command and any arguments supplied
*/
client.on('message', (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowercase();

    try {
        // needs to be secured
        let commandFile = require(`../commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

client.login(config.token);