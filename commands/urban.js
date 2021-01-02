const Discord = require('discord.js')
const querystring = require('querystring');

const fetch = require('node-fetch');
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send('You need to supply a search term!');
    }

    const query = querystring.stringify({ term: args.join(' ') });

    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

    if (!list.length) {
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const [answer] = list;

    const embed = new Discord.MessageEmbed()
        .setColor('#EFFF00')
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addField('Definition', trim(answer.definition, 1024), true)
        .addField('Example', trim(answer.example, 1024), true)
        .addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`, true);

    message.channel.send(embed);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };