const Discord = require('discord.js');
exports.run = async (client, message) => {
    let replies = [
        'wassup pee',
	    'stfu stay silent',
	    'I hope so.',
	    'hello',
    	'get to work asshole',
	    'is this is ur home?',
    	'wtf dude lemme sleep',
    	'sup',
    	'heelo motherfucka',
    	'hey!, how are you?',
    	'kiddo. hello',
	    'Sorry, bucko.',
    	'u ok?'
    ];
    let result = replies[Math.floor(Math.random() * replies.length)];
    message.channel.send(result);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["heelo", "hey", "hi", "sup", "helo"],
    permLevel: 0
  };