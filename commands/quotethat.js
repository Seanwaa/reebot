const fs = require('fs');

exports.run = (client, message, args) => {
    const name = args[0];
    const msgid = message.channel.lastMessageID;
    
    message.channel.messages.fetch({before: `${msgid}`, limit: 1}).then(messages => {
        const prevMsg = messages.first();
    });

    const quote = prevMsg.content;
    const timestamp = prevMsg.timestamp.toISOString().split(T);
    const author = prevMsg.author.username;

    const quoteText = `${quote} - ${author}, ${timestamp}.`

    //improve error handling
    try {
        fs.createReadStream('quotetmp.js').pipe(fs.createWriteStream(`${name}.js`));

        fs.readFile(`${name}.js`, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
            }
            
            let result = data.replace(/#~'**REPLACE**'/g, quoteText);

            fs.writeFile(`${name}.js`, result, 'utf8', function(err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    } catch (err) {
        console.error(err)
    }
}