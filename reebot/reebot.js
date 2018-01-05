const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

const config = require('../config.json');
const prefix = config.prefix;

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (message.content.startsWith(prefix)) {
        switch(command) {
            case 'newlan' :
                if (message.author.id !== config.ownerId) return;

                let [name, start, end, month] = args;
                config.lanName = name;
                config.lanStart = start;
                config.lanEnd = end;
                config.lanMonth = month;

                fs.writeFile('../config.json', JSON.stringify(config, null, 4), (err) => console.error);

                message.channel.send('Got it! New LAN registered');
                break;
        
            case 'ozlanwhen' :
                message.reply(`The next OzLAN is ${config.lanName}, taking place from ${config.lanStart} to ${config.lanEnd} of ${config.lanMonth}.`);
                break;
       }
    }
});

client.login(config.token);