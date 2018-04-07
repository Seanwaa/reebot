exports.run = (client, message, args) => {
    message.channel.send('REPLACE').catch(console.error);
}