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

                message.channel.send('Got it!');
                break;
        
            case 'ozlanwhen' :
                const lanName = config.lanName;
                const lanStart = config.lanStart;
                const lanEnd = config.lanEnd;
                const lanMonth = config.lanMonth;

                message.reply(`The next OzLAN is ${lanName}, taking place from ${lanStart} to ${lanEnd} of ${lanMonth}.`);
                break;
       }
    }
});

client.login(config.token);