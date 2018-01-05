const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.content.startsWith('ping')) {
        message.channel.send('pong!');
    }
});

client.login('MzkzMzQzMDMxMzcxMTA0MjU4.DR0mBQ.E4XRq3VaRPM70SXU2MhV_WdUixo');