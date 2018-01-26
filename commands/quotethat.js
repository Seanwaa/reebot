const fs = require('fs');
const request = require('request');

exports.run = (client, message, args) => {
    const name = args[0];
    const url = `http://discordapp.com/api/channels/${message.channel_id}/messages?before=${message.id}&limit=1`;

    let response;
    let body;
    
    request(url, function (error, response, body) {
        this.response = response;
        this.body = body;
    });

    const quote = body[0].content;
    const timestamp = body[0].timestamp.toISOString().split(T);
    const author = body[0].author.username;

    const quoteText = `${quote} - ${author}, ${timestamp}.`

    try {
        fs.createReadStream('quotetmp.js').pipe(fs.createWriteStream(`${name}.js`));

        fs.readFile(`${name}.js`, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
            }
            
            let result = data.replace(/'**REPLACE**'/g, quoteText);

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