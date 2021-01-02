const Discord = require("discord.js");
const util = require('util');
const request = require('request');
const { Client, MessageAttachment, Collection } = require('discord.js');
const fs = require('fs');
const Canvas = require('canvas');
const BananAPI = require("bananapi");
const fetch = require('node-fetch');
const querystring = require('querystring');
const snekfetch = require('snekfetch');
const fsn = require('fs-nextra')
const queue = new Map();
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const canva = require('canvacord');
const { CommandoClient } = require('discord.js-commando');
const { join } = require("path");
const ytdl = require('ytdl-core');
const YouTubeAPI = require("simple-youtube-api");
const { YOUTUBE_API_KEY } = require("./config/bot.json");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { Structures } = require('discord.js');
const { prefix, token } = require('./config/bot.json');
const { Player } = require("discord-player");
const { allowedNodeEnvironmentFlags, exitCode, exit } = require("process");
const client = new Discord.Client();
const player = new Player(client)
client.player = player;
client.emotes = require('./config/emojis.json');
client.commands = new Discord.Collection();








client.once('ready', () => {
	console.log('Ready!');
	console.log('Bot: Hosting ' + `${client.users.size}` + ' users, in ' + `${client.channels.size}` + ' channels of ' + `${client.guilds.size}` + ' guilds.');
    client.user.setStatus('dnd', 'Made by Daemon')
    client.user.setActivity("Databases to NSA", {
		type: "STREAMING",
		url: "https://www.twitch.tv/mdc"
	  });

});


function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

client.on("message", function(message) {
	console.log(message.content);
	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command === "ping") {
		
		message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. `);
      
	}
	else if (command === 'bump') {
		message.channel.send(`!d bump`);}
	else if (command === "sum") {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		message.reply(`The sum of all the arguments you provided is ${sum}!`);
	  }
	  else if (message.content === `${prefix}server`) {
		message.channel.send(`This server's name is: ${message.guild.name}`);
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (command === 'args-if') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		else if (args[0] === 'fuck') {
			return message.channel.send('fuck-off');
		}
	
		message.channel.send(`First argument: ${args[0]}`);
	}
	else if (command === 'dm') {

		var user = message.mentions.users.first();
		var text = message.content.split(' ').slice(2).join(' ');
	
		message.delete();
	
		if(message.author.bot) return;
		if(!message.member.hasPermission("ADMINISTRATOR")){
		  message.channel.send("Du hast leider keine Rechte dafür!")
		  return;
		}
	
		if(message.author.id == "ID hier"){
		  message.reply("Tja da hast du wohl keine Rechte für! Du stehst für diesen Command leider auf der Blacklist!")
		  return;
		}
	
		if(!user) return message.channel.send("Du hast keinen User angegeben.");
		if(!text) return message.channel.send("Du hast keine Nachricht angegeben.")
	
		user.send(`**${message.guild.name}:**`)
		user.send(text)
	  }
	else if (command === 'purge') {
		const amount = parseInt(args[0]) + 1;
		

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 1000) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
	
	
	
	else if (message.content === 'invites') {

        var userId = message.author.id;

        var userInvites = message.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === userId));

        var useAmount = userInvites.uses;

        if (useAmount === undefined) {

            message.channel.send(`${message.author.username} has 0 invites`);
        }

        else {

            message.channel.send(`${message.author.username} has ${useAmount} invites`);
        }
	}
	
	

	else if (command === 'help') {
		const help = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Help Command**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  
		  .setDescription(`This is a help command what else u were expecting?`)
		  .addField('Prefix', '.', true)
          .addField('calculator', 'a fucking alculator', true)
          .addField('tools', 'few tools', true)
          .addField('misc', 'misc commands', true)
		  .addField('nsfw', 'nsfw commands', true)
		  .addField('botcmd', 'fun commands', true)
		  .addField('admin', 'admin commands', true)
		  .addField('music', 'music commands', true)
		  .addField('contact', 'contact us!', true)
		  .addField('welcome-goodbye', 'sends message when a member joins or leave', true)
		  .addField('ReactionRoles', 'add some reaction roles')
		  .setFooter(
			`mdc`
		  )
		  message.channel.send(help);
		
	}else if (command === 'welcome-goodbye') {
		const help = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Help Command**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  
		  .setDescription(`Create a channel named 'member-log' or 'welcome' and 'goodbye' or 'welcome-goodbye' or 'new-usher'. for more channels to be added please suggest the dev by using .suggest`)
		  
		  .setFooter(
			`mdc`
		  )
		  message.channel.send(help);
		}
		else if (command === 'ReactionRoles') {
			const help = new Discord.MessageEmbed()
			  .setColor('#000000')
			  .setTimestamp()
			  .setTitle(`**Help Command**`)
			  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
			  
			  .setDescription(`Usage: .createReactionRole <role> <emoji>. To delete the reaction role use: deleteReactionRole <emoji>`)
			  
			  .setFooter(
				`mdc`
			  )
			  message.channel.send(help);
			}
			
	else if (command === 'contact') {
		const contact = new Discord.MessageEmbed()
		.setColor(Math.floor(Math.random()*16777215))
		.setTimestamp()
		.setTitle(`**Contact**`)
		.setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		.setDescription(`Contact us!`)
		.addField('invbot', 'invite the bot to your guild!')
		.addField('suggest', 'suggest us your ideas :)')
		.addField('bug', 'report a bug!')
		.setFooter(
			`mdc`
		)
		message.channel.send(contact)
	}
	else if (command === 'calculator') {
		const calc = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Calculator**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  .setDescription(`What do u think it contains?`)
		  .addField('sum', 'add integer values', true)
		  .addField('calculate', 'get answers to a math problem')
          
		  .setFooter(
			`mdc`
		  )
		message.channel.send(calc);
	}
	else if (command === 'misc') {
		const misc = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Misc**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  .setDescription(`Contains server shit and some server commands`)
		  .addField('server', 'prints server name and members')
		  .addField('serverinfo', 'server info', true)
		  .addField('stats', "shows the bot's stats")
		  
		  .addField('avatar', 'shows user avatar', true)
          .addField('animals', 'sends cute animal images.')
		  .addField('memes', 'sends memes', true)
		  .addField('imagemanup', 'manuplates the avatar using canvas of discord.js')
		  .addField('games', 'a few games', true)
		  .addField('vote', 'a polling command')
		  .setFooter(
			`mdc`
		  )
		message.channel.send({embed: misc});
	}
	else if (command === 'imagemanup') {
		const img = new Discord.MessageEmbed()
		  .setColor('black')
		  .setTimestamp()
		  .setTitle(`**Image Manuplation**`)
		  .setDescription(`manuplates images in different forms`, true)
		  .addField(`gay`, `overlays a ranbow on an avatar`, true)
		  .addField('glass', 'avatar appears to be on glass', true)
		  .addField('triggered', 'avatar gets triggered', true)
		  .addField('wasted', 'shows GTA wasted over an avatar', true)
		  .addField('invert', 'inverts colors', true)
		  .addField('greyscale', 'manuplates the avatar to turn grey', true)
		  .addField('invertgreyscale', 'a combination of both invert and greyscale', true)
		  .addField('brightness', 'increases brightness of an avatar', true)
		  .addField('threshold', 'choose your side white or black', true)
		  .addField('sepia', 'turns avatar into a sepia look', true)
		  .addField('red', 'turns avatar into red', true)
		  .addField('blue', 'turns avatar into blue color', true)
		  .addField('green', 'turns avatar into green color', true)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  .setFooter(
			  `mdc`
		  )
		message.channel.send({embed: img})
	}
	else if (command === 'tools') {
		const tools = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Tools**`)
		  
		  .setDescription(`Contains some hacking tools, nah kidding`)
		  .addField('iplookup', 'prints ip info', true)
		  .addField('numlookup', 'prints num info', true)
		  .addField('terrorist database', 'sends files', true)
		  .addField('surl', 'scans url for malcious code', true)
          
		  .setFooter(
			`mdc`
		  )
		message.channel.send({embed: tools});
	}
	else if (command === 'nsfw') {
		const nsfw = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**NSFW**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  .setDescription(`you know what it is no need for description`)
		  .addField('spank', 'spank someone XD')
		  .addField(prefix + 'pussy', 'Returns a pussy image/gif')
		.addField(prefix + 'lesbian', 'Returns a lesbian image/gif')
		.addField(prefix + 'cumsluts', 'Returns a cumsluts image/gif')
		.addField(prefix + 'boobs', 'Returns a boobs image/gif')
		.addField(prefix + 'blowjob', 'Returns a blowjob image/gif')
		.addField(prefix + 'anal', 'Returns a anal image/gif')
		.addField(prefix + 'trap', 'Returns a trap image/gif')
		.addField(prefix + 'tits', 'Returns a tits image/gif')
		.addField(prefix + 'cumart', 'Returns a cumart image/gif')
		.addField(prefix + 'femdom', 'Returns a femdom image/gif')
		.addField(prefix + 'yuri', 'Returns a yuri image/gif')
		.addField(prefix + 'nsfwavatar', 'Returns an nsfw avatar')
		.addField(prefix + 'kuni', 'Returns a kuni image')
		.addField(prefix + 'girlsolo', 'Returns a girlsolo image')
		.addField(prefix + 'girlsologif', 'Returns a girlsolo gif')
		.addField(prefix + 'pussywank', 'Returns a pussywank gif')
		.addField(prefix + 'pussyart', 'Returns a pussyart image/gif')
		.addField(prefix + 'kitsune', 'Returns a kitsune image/gif')
		.addField(prefix + 'futanari', 'Returns a futanari image/gif')
		.addField(prefix + 'keta', 'Returns a keta image/gif')
		  .addField('funnynsfw', 'nsfw memes')
		  .addField('hentai', 'sends hentai')
		  
          
		  .setFooter(
			`mdc`
		  )
		message.channel.send({embed: nsfw});
	}
	else if (command === 'botcmd') {
		const bot = new Discord.MessageEmbed()
		  .setColor('#000000')
		  .setTimestamp()
		  .setTitle(`**Bot will reply**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		  .setDescription(`it will fucking reply to your fuckery. PS: these commands run without prefix`)
		  .addField('hack', 'check on your own', true)
		  .addField('skid', 'skid alert', true)
		  .addField('react', 'reacts to message', true)
		  .addField('sad', 'reacts to message', true)
		  .addField('ded', 'ded', true)
		  .addField('hello', 'greets you', true)
		  .addField('gn', 'greets you', true)
		  .addField('sorry', 'feels sorry', true)
		  .addField('ctf', 'pico-ctf')
		  .addField('mdc', 'sends mdc msg')
		  .addField('i c', 'agrees')
		  .addField('bad teacher', 'agrees')
		  .addField('networking', 'Coming Soon!')
		
          
		  .setFooter(
			`mdc`
		  )
		message.channel.send({embed: bot})
	}
	else if (command === 'animals') {
		const animals = new Discord.MessageEmbed()
                  .setColor('#000000')
                  .setTimestamp()
                  .setTitle(`**Animal Images**`)
		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
                  .setDescription(`send you cute animal images`)
		  .addField('Usage', '.animals (animals name)')
                  .addField('dog', 'sends Dogs images')
                  .addField('cat', 'sends Cats images')
                  .addField('panda', 'sends panda images')
                  .addField('fox', 'sends fox images')
                  .addField('birb', 'sends Birb images')
                  .addField('koala','sends Koala images')
                  .addField('kangroo', 'sends kangroo images')
                  .addField('racoon', 'sends Racoon images')
                  .addField('whale', 'sends Whale images')
                  .addField('pikachu', 'sends Pikachu images')
                  

                  .setFooter(
                        `mdc`
                  )
                message.channel.send({embed: animals});
		}
	else if (command === 'games') {
			const animals = new Discord.MessageEmbed()
					  .setColor('#000000')
					  .setTimestamp()
					  .setTitle(`**Games**`)
			  		  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
					  .setDescription(`few games`)
			  		  .addField('8ball', 'replies with a question')
					  .addField('feed', 'feeds a member OwO')
					  .addField('rps', 'rock! paper! scissors!')
					  .addField('coinflip', 'Heads or Tails?')
					  .addField('advice', 'gives an advice')
					  .addField('kitsune', 'sends your fox girl image')
					  .addField('say','copies you')
					  .addField('hack', 'hacks you')
					  .addField('vuln discord (no prefix)', 'a fun command')
					  
					  
	
					  .setFooter(
							`mdc`
					  )
					message.channel.send({embed: animals});
	}
	else if (command === 'admin') {
		const admin = new Discord.MessageEmbed()
				  .setColor('#000000')
				  .setTimestamp()
				  .setTitle(`**Admin**`)
					.setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
				  .setDescription(`Admin commands`)
					.addField('kick', 'kicks a member', true)
				  .addField('ban', 'bans a member', true)
				  .addField('lockdown', 'locks a chanel', true)
				  .addField('unlockdown', 'unlocks a channel')
				  .addField('mute', 'mutes a member for specified time', true)
				  .addField('warn', 'warns an user', true)
				  .addField('deletewarn', 'deletes the warnings of an user', true)
				  .addField('warnings', 'shows the warnings of an user', true)
				  
				  
				  
				  

				  .setFooter(
						`mdc`
				  )
				message.channel.send({embed: admin});
	}
	else if (command === 'avatar') {
		let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
		if (message.mentions.users.size > 0) {
		const embed = new Discord.MessageEmbed()
			.setColor(0xFFFF00)
			.setTitle(`Avatar for ${message.mentions.users.first().username}:`)
			.setImage(`${avatar}`)
			.setFooter(`Mente-de-cipolla`);
			message.channel.send({embed});
		} else {
		const embed = new Discord.MessageEmbed()
		.setColor(0xFFFF00)
		.setTitle(`Avatar for ${message.author.username}:`)
		.setImage(`${avatar + "?size=2048"}`)
		.setFooter(`Mente-de-cipolla`);
		message.channel.send({embed});
		}
	}
	else if (command === 'iplookup') {
		if (!args) return message.reply('Must enter an IP for me to lookup.');

		snekfetch.get(`http://api.ipapi.com/${args}?access_key=63db32fc4bf773879eedf8ba34e7919f&format=1`).then(r => {
			const Geo = new Discord.MessageEmbed()
			  .setTimestamp()
			  .setTitle(`**IP Lookup**`)
			  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
			  .setDescription(`**__Some info of IP that u gave:__**
			  **Looked up IP**: ${args}
			  **Country**: ${r.body.country_name}
			  **Type**: ${r.body.type}
			  **Continent**: ${r.body.continent_name}
			  **latitude**: ${r.body.latitude}
			  **longitude**: ${r.body.longitude}
			  **region**: ${r.body.region_name}
			  **Zip Code**: ${r.body.zip}
			  **Flag**: ${r.body.location.country_flag}`)
			  .addField(`Note:`, `only 10,000 requests per month`)
			  .setFooter(`${message.author.username} mdc`)
		message.channel.send({embed: Geo});
		message.react(':ballot_box_with_check: ');
		});
	}
	else if (command === 'numlookup') {
		

		snekfetch.get(`http://apilayer.net/api/validate?access_key=cb43082602aac37acf730556f5d8f4d0&number=${args}`).then(r => {
			const Geo = new Discord.MessageEmbed()
			  .setTimestamp()
			  .setTitle(`**Number Lookup**`)
			  .setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
			  .setDescription(`**__Some info of Number you gave:__**
			  **Looked up Number**: ${args}
			  **Country Code**: ${r.body.country_code}
			  **Country**: ${r.body.country_name}
			  **Format**: ${r.body.international_format}
			  **Carrier**: ${r.body.carrier}
			  **Location**: ${r.body.location}
			  **Type**: ${r.body.line_type}`)
			  .addField(`Note:`, `only 250 per month`)
			  .setFooter(`${message.author.username} looked up by: mdc`)
		message.channel.send({embed: Geo});
		});
	}
	else if (command === 'socialsearcher') {
		snekfetch.get(`https://api.social-searcher.com/v2/search?q=${args}&network=web&key=58a28623f45e7f0661d4c50900133c0a`).then(r => {
			const ss = new Discord.MessageEmbed()
				.setTimestamp()
				.setTitle(`**Social Searcher**`)
				.setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
				.setDescription(`**Some info of the person you gave**
				**Looked up name**: ${args}
				**Network**: ${r.body.posts.network}
				**Posted**: ${r.body.posts.posted}
				**ID**: ${r.body.posts.postid}
				**Text**: ${r.body.posts.text}`)
				
				.addField(`Note:`, `only 100 requests per month`)
				.setFooter(`Created by mdc looked up by: mdc`)
			message.channel.send({embed: ss});
		});
	}
	else if(command === 'tdb') {
		message.channel.send("Global Terrorist Codebook.", { files: ["Codebook.pdf"] });
		message.channel.send("globalterrorism Database", {files: ["globalterrorismdb_0919dist.xlsx"] });
		message.channel.send("globalterrorism 1993", {files: ["gtd1993_0919dist.xlsx"] });
	}
	else if(command === 'surl') {
		snekfetch.get(`https://www.virustotal.com/vtapi/v2/url/report?apikey=79d7b3a1e80ee62a149c5d2d2a2195a0724d5053653045bff99ca09deb77cb4d&resource=${args}`).then(r => {
			const su = new Discord.MessageEmbed()
				.setTimestamp()
				.setTitle(`**URL Scanner**`)
				.setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
				.setDescription(`**Result**
				**URL**: ${args}
				**Positive**: ${r.body.positives}
				**Total**: ${r.body.total}
				${r.body.verbose_msg}`)
				.setFooter(`Created by Daemon`)
			message.channel.send({embed: su});
		});
	} else if(command === 'kick') {
        // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  
    }

	else if (command === '8ball') {
		if(!args[0]) return message.reply("Please ask a full question");
		let replies = [
			'Maybe.',
			'Certainly not.',
			'I hope so.',
			'Not in your wildest dreams.',
			'There is a good chance.',
			'Quite likely.',
			'I think so.',
			'I hope not.',
			'I hope so.',
			'Never!',
			'Pfft.',
			'Sorry, bucko.',
			'Hell, yes.',
			'Hell to the no.',
			'The future is bleak.',
			'The future is uncertain.',
			'I would rather not say.',
			'Who cares?',
			'Possibly.',
			'Never, ever, ever.',
			'There is a small chance.',
			'Yes!',
			'lol no.',
			'There is a high probability.',
			'What difference does it makes?',
			'Not my problem.',
			'Ask someone else.'
		];
	
		let result = Math.floor((Math.random() * replies.length));
		let question = args.slice(0).join(" ");
	
		let embed = new Discord.MessageEmbed()
		.setTitle("MAGIC 8 BALL!!!")
		.setColor("#AA9900")
		.addField("Q:", question)
		.addField("A:", replies[result])
		.setFooter(`Mente-De-Cipolla`);
	
		message.channel.send({embed});
			}
    else if (command === 'coinflip') { //The coinflip Message
		let random = (Math.floor(Math.random() * Math.floor(2)));
		if(random === 0) {
		message.channel.send('Heads!');
		}
		else {
		message.channel.send('Tails!');
		}
	}
	else if (command === 'embed') {
		var m = args.join(' ');
		if (!m) return message.reply('Need content for the embed...');
		const embed = new Discord.MessageEmbed()
			.setDescription(m)
			.setColor([114, 137, 218]);
		message.channel.send({ embed });
	}
	else if (command === 'rps') { //The rps Message
		let rps = ["**:pencil: paper**", "**:moyai: rock**", "**:scissors: scissors**"];
		function random() { return `${rps[Math.floor(Math.random() * Math.floor(2))]}!` }
		let choice = args.join(" ").toLowerCase();
		if (choice === '') return message.reply("Please specify either rock, paper or scissors.");
		if (choice !== "rock" && choice !== "paper" && choice !== "scissors") return msg.reply(`Please specify either rock, paper or scissors. ${choice} isn't one of those :P`);
		message.reply(random());
	}
	else if (command === 'say') {
		let args = message.content.split(" ").slice(1);
		message.delete();
		if (message.content.includes("@everyone")  || message.content.includes("@here")) return message.channel.send("You ain't making me Ping anyone BOI!");
		message.channel.send(args.join(" ")).cleanContent;
	}
	else if (command === 'serverinfo') {
		let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
		let region = {
			"brazil": "Brazil",
			"eu-central": "Central Europe",
			"singapore": "Singapore",
			"us-central": "U.S. Central",
			"sydney": "Sydney",
			"us-east": "U.S. East",
			"us-south": "U.S. South",
			"us-west": "U.S. West",
			"eu-west": "Western Europe",
			"vip-us-east": "VIP U.S. East",
			"london": "London",
			"amsterdam": "Amsterdam",
			"hongkong": "Hong Kong"
		};
		
		var emojis;
		if (message.guild.emojis.cache.size === 0) {
			emojis = 'None';
		} else {
			emojis = message.guild.emojis.cache.size;
		}

		const embed = new Discord.MessageEmbed()
		.setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
		.setThumbnail(message.guild.iconURL())
		.setTimestamp()
		.addField("Created", `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`, true)
		.addField("ID", message.guild.id, true)
		.addField("Region", region[message.guild.region], true)
		.addField("User Count", message.guild.memberCount, true)
		.addField("Member Count", message.guild.members.cache.filter(m => !m.user.bot).size, true)
		.addField("Bot Count", message.guild.members.cache.filter(m => m.user.bot).size, true)
		.addField("AFK Timeout", message.guild.afkTimeout / 60 + ' minutes', true)
		.addField("Roles", message.guild.roles.cache.size, true)
		.addField("Channels", message.guild.channels.cache.size, true)
		.addField("Emojis", `${emojis}/100`, true)
		.addField("Verification Level", message.guild.verificationLevel, true)
		.setColor(Math.floor(Math.random()*16777215))
		.setFooter(`Mente-de-cipolla`);
		message.channel.send({embed});
	}

	else if (command === 'advice') {
		const request = require('superagent')
		request
            .get('http://api.adviceslip.com/advice')
            .end((err, res) => {
                if (!err && res.status === 200) {
                    try {
                        JSON.parse(res.text)
                    } catch (e) {
                        return message.channel.send('An api error occurred.');
                    }
                    const advice = JSON.parse(res.text)
                    message.channel.send(advice.slip.advice)
                } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`)
                }
            });
	}
	else if (command === 'invbot') {
		const embed = new Discord.MessageEmbed()
		.setTitle("Invite me ")
		.addField("For inviting me", "[click here.](https://discord.com/api/oauth2/authorize?client_id=728462325027176480&permissions=8&scope=bot)")
		.setThumbnail(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
		.setColor(Math.floor(Math.random()*16777215))
		.setFooter(`Mente-De-Cipolla | Created by: daemon`)
		message.channel.send({embed});
	}
	

	
	

});

  
 
  client.on('message', async message => {
	if (!message.guild) return;
	if (message.content.startsWith(prefix + 'feet')) {
	if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
	
	if (message.content.includes("feetgif")) return undefined;
	const GIF = await neko.nsfw.feet();
	const embed = new Discord.MessageEmbed()
	.setColor('#202225')
	.setTitle(`${message.author.tag} here's a random feet image`)
	.setImage(GIF.url)
	message.channel.send(embed);
	}
	else if (message.content.startsWith(prefix + 'feetgif')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.feetGif();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random feet gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'gasm')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.gasm();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random orgasm image`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'keta')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.keta();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random keta image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'futanari')) {
			if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
			
			const GIF = await neko.nsfw.futanari();
			const embed = new Discord.MessageEmbed()
			.setColor('#202225')
			.setTitle(`${message.author.tag} here's a random futanari image/gif`)
			.setImage(GIF.url)
			message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'pussyart')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.pussyArt();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random pussyart image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'pussywank')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.pussyWankGif();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random pussy wank gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'girlsologif')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.girlSoloGif();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random solo girl gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'girlsolo')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		  if (message.content.includes("girlsologif")) return undefined;
		const GIF = await neko.nsfw.girlSolo();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random solo girl image`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'kuni')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.kuni();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random kuni image`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'nsfwavatar')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.avatar();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random nsfw avatar`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'yuri')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.yuri();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random yuri image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'femdom')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.femdom();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random femdom image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'cumart')) {
		if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		
		const GIF = await neko.nsfw.cumArts();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random cumart image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
	}else if (message.content.startsWith(prefix + 'pussy')) {
		  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  if (message.content.includes("pussywankgif")) return undefined;
		  if (message.content.includes("pussyart")) return undefined;
		const GIF = await neko.nsfw.pussy();
		const embed = new Discord.MessageEmbed()
		.setColor('#202225')
		.setTitle(`${message.author.tag} here's a random pussy image/gif`)
		.setImage(GIF.url)
		message.channel.send(embed);
		}
	  
		else if (message.content.startsWith(prefix + 'lesbian')) {
		  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  const GIF = await neko.nsfw.lesbian();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random lesbian image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		  
		else if (message.content.startsWith(prefix + 'cumsluts')) {
			  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  const GIF = await neko.nsfw.cumsluts();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random cumsluts image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		else if (message.content.startsWith(prefix + 'boobs')) {
			  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  const GIF = await neko.nsfw.boobs();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random boobs image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		else if (message.content.startsWith(prefix + 'blowjob')) {
			  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  const GIF = await neko.nsfw.bJ();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random blowjob image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		else if (message.content.startsWith(prefix + 'anal')) {
		  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  
		  const GIF = await neko.nsfw.anal();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random anal image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		
		
		else if (message.content.startsWith(prefix + 'trap')) {
		  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  
		  const GIF = await neko.nsfw.trap();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random trap image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
		
		else if (message.content.startsWith(prefix + 'tits')) {
		  if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
		  
		  const GIF = await neko.nsfw.tits();
		  const embed = new Discord.MessageEmbed()
		  .setColor('#202225')
		  .setTitle(`${message.author.tag} here's a random tits image/gif`)
		  .setImage(GIF.url)
		  message.channel.send(embed);
		  }
	
	

  });
	
client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.toLowerCase() === 'hello mdc') {
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
	}
	if (message.content.toLowerCase() === 'helo mdc') {
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
	}
	if (message.content.toLowerCase() === 'hey mdc') {
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
	}
	if (message.content.toLowerCase() === 'sup mdc') {
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
	}
	
	if (message.content.toLowerCase() === 'goodnight') {
		message.reply(`goodnight sweetheart <3`)
	}
	if (message.content.toLowerCase() === 'wassup') {
		let s = ['nothing much wbu?', 'ehhh', 'brrrr', 'stfu', "nothing just fucking yo mama's ass"];
		let ss = s[Math.floor(Math.random() * s.length)];
		message.channe.send(ss);

	}
	
	if (message.content.toLowerCase() === 'thank you naman') {
		
		message.channel.send(`thank you so much sir <@!481518334509187089>`); 
	}
	if (message.content.toLowerCase() === 'react') {
		message.react('😄');
	}
	
	if (message.content.toLowerCase() === 'skid') {
		message.channel.send(`I hate skids lets troll them`)
	}
	if (message.content.toLowerCase() === 'mdc cry with me') {
		message.react('😭');
		message.channel.send(`I can understand you bud dont cry 😭
		`)
	}
	if (message.content.toLowerCase() === 'why u crying then?') {
		message.channel.send(`-_-`);
	}
		
	



	if (message.content.toLowerCase() === 'simp') {
		message.channel.send(`added your name to the simp library`)
		var simp = ["<@!338264952722948107>", `adding...succesfully added`, `${message.author}`]
		message.channel.send(simp)
		message.channel.send(`removing your name as you are innocent.....successfully removed. :)`)
	}
	if (message.content.toLowerCase() === 'sorry') {
		message.channel.send(`I am really sorry dude!`)
	}
	if (message.content.toLowerCase() === 'ctf') {
		message.channel.send(`https://picoctf.org/`)
	}
	
	if (message.content.toLowerCase() === 'ded') {
		message.channel.send ('die ()')
	}
	if (message.content.toLowerCase() === 'ic') {
		message.channel.send ('sokka')
	}
	
	
	if (message.content.toLowerCase() === 'xxx') {
		message.channel.send(`https://tenor.com/view/xxx-tentacion-gif-18368554`)
	}
	if (message.content.toLowerCase() === 'mdc') {
		const mdc = new Discord.MessageEmbed()
		.setTimestamp()
		.setTitle(`**Mente-De-Cipolla**`)
		.setDescription(`**I am bot assholes**`)
		.setFooter(`Created by Daemon`)
		.setImage(`https://cdn.discordapp.com/avatars/728462325027176480/3be9de436c53514317f2574c804f8dd8.png?size=2048`)
  		message.channel.send({embed: mdc});
		 
		  }
	if (message.content.toLowerCase() === 'networking') {
		message.author.send (`basic: https://www.cisco.com/c/en_in/solutions/small-business/resource-center/networking/networking-basics.html#~routers
		https://www.geeksforgeeks.org/basics-computer-networking/
		Books you should read: https://www.networkstraining.com/best-computer-networks-textbooks/`)
		message.react ('☑️')
	
	}
	if (message.content.toLowerCase() === 'spam') {
		const taggedUser = message.mentions.users.first();
		for (var i = 1; i<=50; i++) {
			message.taggedUser.send(`Never block pr0bot`)
		}
	
	}
	if (message.content.toLowerCase() === 'bad teacher') {
		message.channel.send ('true dat. i agree +1')
	}
	
if (message.content.toLowerCase() === 'iphone') {
	message.channel.send ('Iphone sucks android best 👍')
}
if (message.content.toLowerCase() === 'gn') {
	message.channel.send ('Goodnight dude 💤')
}
if (message.content.toLowerCase() === 'bye') {
	message.channel.send ('bye mate')
	message.react('👋')
}
if (message.content.toLowerCase() === 'f') {
	const args = message.content.split(' ');
	if(args && args.length > 1){
        message.channel.send(`${message.author} has paid their respect for **${args.join(' ')}** `)
    }else{
        message.channel.send(`${message.author} has paid their respect `)
    }
}
if (message.content.toLowerCase() === 'bruh bot') {
	message.channel.send (`${message.author} yeah he good. i am a $@!nT, I wont say bad.`)
}
if (message.content.toLowerCase() === 'rip') {
	message.channel.send (`may his soul rest in peace`)
}
if (message.content.toLowerCase() === 'mdc what u streaming?') {
	message.channel.send (`none of your buisness`)
}
if (message.content.toLowerCase() === '<@!728462325027176480> hello') {
	message.channel.send (`hello ${message.author.username}`)
}
if (message.content.toLowerCase() === 'die ()') {
	message.channel.send (`message terminated by ${message.author}`)
}
	
});
client.on('message', message => {
	if (message.content.toLowerCase() === 'sad') {
		message.react('😦');
	}
	else if (message.content.toLowerCase() === 'bot') {
		message.react('🤖')
	}
	
  });
  client.on('message', message =>{
	if (message.content.toLowerCase() === 'anycast') {
		message.author.send (`**What is Anycast?**

		Anycast is a network addressing and routing method in which incoming requests can be routed to a variety of different locations or “nodes.” In the context of a CDN, Anycast typically routes incoming traffic to the nearest data center with the capacity to process the request efficiently. Selective routing allows an Anycast network to be resilient in the face of high traffic volume, network congestion, and DDoS attacks.`)
		message.author.send('https://www.cloudflare.com/img/learning/cdn/glossary/anycast/anycast-cdn.png')
		message.author.send (`
		**How does Anycast Work?**

		Anycast network routing is able to route incoming connection requests across multiple data centers. When requests come into a single IP address associated with the Anycast network, the network distributes the data based on some prioritization methodology. The selection process behind choosing a particular data center will typically be optimized to reduce latency by selecting the data center with the shortest distance from the requester. Anycast is characterized by a 1-to-1 of many association, and is one of the 5 main network protocol methods used in the Internet protocol.
		**Why Use an Anycast Network?**

		If many requests are made simultaneously to the same origin server, the server may become overwhelmed with traffic and be unable to respond efficiently to additional incoming requests. With an Anycast network, instead of one origin server taking the brunt of the traffic, the load can also be spread across other available data centers, each of which will have servers capable of processing and responding to the incoming request. This routing method can prevent an origin server from extending capacity and avoids service interruptions to clients requesting content from the origin server.
		What is the Difference between Anycast and Unicast?

		Most of the Internet works via a routing scheme called Unicast. Under Unicast, every node on the network gets a unique IP address. Home and office networks use Unicast; when a computer is connected to a wireless network and gets a message saying the IP address is already in use, an IP address conflict has occurred because another computer on the same Unicast network is already using the same IP. In most cases, that isn't allowed.`)
		message.author.send ('https://www.cloudflare.com/img/learning/cdn/glossary/anycast/unicast-cdn.png')
		message.author.send (`When a CDN is using a unicast address, traffic is routed directly to the specific node. This creates a vulnerability when the network experiences extraordinary traffic such as during a DDoS attack. Because the traffic is routed directly to a particular data center, the location or its surrounding infrastructure may become overwhelmed with traffic, potentially resulting in denial-of-service to legitimate requests.

		Using Anycast means the network can be extremely resilient. Because traffic will find the best path, an entire data center can be taken offline and traffic will automatically flow to a proximal data center.`)
		message.author.send (`How does an Anycast network mitigate a DDoS attack?

		After other DDoS mitigation tools filter out some of the attack traffic, Anycast distributes the remaining attack traffic across multiple data centers, preventing any one location from becoming overwhelmed with requests. If the capacity of the Anycast network is greater than the attack traffic, the attack is effectively mitigated. In most DDoS attacks, many compromised "zombie" or “bot” computers are used to form what is known as a botnet. These machines can be scattered around the web and generate so much traffic that they can overwhelm a typical Unicast-connected machine.`)
		message.author.send ('https://www.cloudflare.com/img/learning/cdn/glossary/anycast/anycast-unicast-botnet-attack.png')
		message.author.send (`A properly Anycasted CDN increases the surface area of the receiving network so that the unfiltered denial-of-service traffic from a distributed botnet will be absorbed by each of the CDN’s data centers. As a result, as a network continues to grow in size and capacity it becomes harder and harder to launch an effective DDoS against anyone using the CDN.`)
		}
	
	else if (message.content.toLowerCase() === 'ddos') {
		message.author.send(`Coming soon!`)
	}
	else if (message.content.toLowerCase() === 'bengali') {
		for (var i = 1; i<=5; i++) {
			message.channel.send(`https://tenor.com/view/kyu-be-bengali-bengali-gif-17973197`)
		}
	}

  });
client.on("message", message => {
let channel = message.channel;
if(!message.content.startsWith(`.invite`)) return;
channel.createInvite({unique: true})
.then(invite => {
message.reply("Hey! I've created you an invite: https://discord.gg/" + invite.code)
})
});
client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	
	const kickLog = fetchedLogs.entries.first();

	
	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	
	const { executor, target } = kickLog;

	
	if (target.id === member.id) {
		console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});
client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	
	const banLog = fetchedLogs.entries.first();

	
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	
	const { executor, target } = banLog;

	
	if (target.id === user.id) {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
	}
});
client.on('messageDelete', async message => {
	
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	
	const deletionLog = fetchedLogs.entries.first();

	
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	
	const { executor, target } = deletionLog;


	
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	}	else {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
client.on('message', async message => {
	if (message.content === 'nigga') {
		await sleep(1000);
		message.channel.send(`wtf bro`);
		await sleep(10000);
		message.channel.send(`cmon shut the fuck up`);
		await sleep(10000);
		message.channel.send(`you really wanna die today nig`);
	}else if (message.content.toLowerCase() === 'vuln discord') {
		message.channel.send(`Scanning Discord Vulnerabilities.....`);
		await sleep(10);
		message.channel.send(`Start Manipulation...........`);
		await sleep(10);
		message.channel.send(`Processing ...:   7%|██████|41/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/admin.php   Mainframe Infiltrated........`);
		await sleep(10);
		message.channel.send(`Processing ...:  34%|█████████████████████████████|193/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/login.php   Counting Vulnerable Users........`);
		await sleep(10);
		message.channel.send(`Processing ...:  39%|██████████████████████████████████|226/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/dashboard/. 14.11.654 Vulnerable users found..........`);
		await sleep(10);
		message.channel.send(`Processing ...:  92%|██████████████████████████████████████████████████████████████████████████████████|531/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/Mainframe.Acces Generating Ransomware:Black-Screen-Off-Death-Image......`);
		await sleep(10);
		message.channel.send(`Processing ...:  93%|██████████████████████████████████████████████████████████████████████████████████|537/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/Database.sql Done Generating,Start Spreading To Users........`);
		await sleep(10);
		message.channel.send(`Processing ...:  95%|████████████████████████████████████████████████████████████████████████████████████|549/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/Logs.Users Recieving Damaged User Logs And Sensitive Data.........`);
		await sleep(10);
		message.channel.send(`Processing ...:  96%|█████████████████████████████████████████████████████████████████████████████████████▏|551/576`);
		await sleep(5);
		message.channel.send(`[:heavy_check_mark:] http://www.discord.com/logout.php Done With This Session,Press R For Respreading, Press Q For Quit.........`);
		await sleep(10);
		message.channel.send(`Processing ...: 100%|█████████████████████████████████████████████████████████████████████████████████████████|576/576`);
		await sleep (5);
		message.channel.send(`https://cdn.discordapp.com/attachments/774643668253671444/779602678401335336/AdoredBossyAstrangiacoral-size_restricted.gif`);
	}
	else if (message.content.toLowerCase() === 'https://cdn.discordapp.com/attachments/695590735977906199/786448887514136626/unknown.png') {
		var status = [
						"BRUH",
						"i cum while looking at the curtains",
						"cooked a meal but it got roasted instead",
						"if your ego barks then my attitude roars",
						"I am as useless as 'ueue' in 'queue'",
						"Mirrors can't talk lucky for me they can't laugh either",
						"My only chance of getting laid is to crawl up a chicken's butt and wait",
						"Eating your mum's nuts"

		]
		const statuss = status[Math.floor(Math.random() * status.length)];
		const embed = new Discord.MessageEmbed()
			.setColor(0x00A2E8)
			.setDescription("**your costum staus**: " + statuss);
		message.channel.send({embed})
	}
});
client.on("message", async message=> {
	
	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command === 'vote') {
		const agree    = "✅";
		const disagree = "❎";
		if(!args || args[0] === 'help') return message.reply("Usage: vote <question>")
		// Number.isInteger(itime)
		//  if (e) return message.reply('please supply a valid time number in seconds')
		let question = message.content.split(" ").splice(1).join(" ")
		if(question.length < 1){
			let msg = await message.channel.send(`Vote now! (Vote time: 2min)`);
			await msg.react(agree);
			await msg.react(disagree);

			const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
			msg.delete();

			var NO_Count = reactions.get(disagree).count;
			var YES_Count = reactions.get(agree);

			if(YES_Count == undefined){
			var YES_Count = 1;
			}else{
			var YES_Count = reactions.get(agree).count;
			}

			var sumsum = new Discord.MessageEmbed()
			.addField("Voting Finished:", "----------------------------------------\n" +
                                            "Total votes (Yes): " + `${YES_Count-1}\n` +
                                            "Total votes (NO): " + `${NO_Count-1}\n` +
                                            "----------------------------------------", true)

              .setColor("0x#FF0000")
              .setFooter(`Mente-de-cipolla`);
			await message.channel.send({embed: sumsum});
		}else if(question.length > 1){
			let msg = await message.channel.send(`Question: ${question} \nVote now! (Vote time: 2min)`);
			await msg.react(agree);
			await msg.react(disagree);
			
			const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
			msg.delete();
			
			var NO_Count = reactions.get(disagree).count;
			var YES_Count = reactions.get(agree);
			
			if(YES_Count == undefined){
			var YES_Count = 1;
			}else{
			var YES_Count = reactions.get(agree).count;
			}
		
			var sumsum = new Discord.MessageEmbed()
			
					.addField("Voting Finished:", "----------------------------------------\n" +
													"Question: " + question + "\n" +
													"Total votes (Yes): " + `${YES_Count-1}\n` +
													"Total votes (NO): " + `${NO_Count-1}\n` +
													"----------------------------------------", true)
		
					.setColor("0x#FF0000")
					.setFooter(`Mente-de-cipolla`);
			await message.channel.send({embed: sumsum});
		}

	}
	else if (command === 'feed') {
		const superagent = require('superagent');
		if (!message.mentions.users.first()) return message.reply("You need to mention someone to feed them!");
		if (message.mentions.users.first().id == client.user.id && message.author.id !== "242263403001937920") return message.channel.send("I don't eat tho")
		if (message.mentions.users.first().id == client.user.id && message.author.id == "242263403001937920") return message.reply("Baka Dev-san you know bots don't eat >///< Now give me more RAM :3")
		const { body } = await superagent
		.get("https://nekos.life/api/v2/img/feed");
		
		const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(`${message.mentions.users.first().username}, you got fed by ${message.author.username} OwO`)
		.setImage(body.url) 
		.setFooter(`Mente-de-cipolla`);
		message.channel.send({embed})
		}
	else if (command === "kitsune") {
		const superagent = require('superagent');
		const { body } = await superagent
		.get("https://nekos.life/api/v2/img/fox_girl");
			
		const embed = new Discord.MessageEmbed()
		.setColor(Math.floor(Math.random()*16777215))
		.setTitle(`OwO, Here's your Fox Girl`)
		.setImage(body.url) 
		.setFooter(`Mente-de-cipolla`);
		message.channel.send({embed})
	}
	else if (command === "reminder") {
		var time = args[0];
		var reminder = args.splice(1).join(' ');

		if (!time) return message.reply('Can\'t remind you if I don\'t know when to do so...');
		if (!reminder) return message.reply('You forgot the reminder');

		// This will not work if the bot is restarted or stopped

		time = await time.toString();

		if (time.indexOf('s') !== -1) { // Seconds
			var timesec = await time.replace(/s.*/, '');
			var timems = await timesec * 1000;
		} else if (time.indexOf('m') !== -1) { // Minutes
			var timemin = await time.replace(/m.*/, '');
			timems = await timemin * 60 * 1000;
		} else if (time.indexOf('h') !== -1) { // Hours
			var timehour = await time.replace(/h.*/, '');
			timems = await timehour * 60 * 60 * 1000;
		} else if (time.indexOf('d') !== -1) { // Days
			var timeday = await time.replace(/d.*/, '');
			timems = await timeday * 60 * 60 * 24 * 1000;
		}	else {
			return message.reply('The time must be in the format of <number>[s/m/h/d]');
		}

		message.reply(`I will remind you in \`${time}\` about \`${reminder}\``);

		setTimeout(function () {
			message.reply(`You asked me \`${time}\` ago to remind you about \`${reminder}\``);
		}, parseInt(timems));

	}
	else if (command === 'ascii') {
		const figlet = require('figlet');
		if(!args[0]) return message.channel.send('Please provide some text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
	}
	else if (command === 'cuddles') {
		const superagent = require('superagent');
		if (!message.mentions.users.first()) return message.reply("You need to mention someone to cuddle them");
		if (message.mentions.users.first().id == client.user.id && message.author.id !== "728462325027176480") return message.channel.send("Aww! *cuddles you* ")
		if (message.mentions.users.first().id == client.user.id && message.author.id == "702412371209224232") return message.reply(">///< *cuddles dev-san*")
		const { body } = await superagent
		.get("https://nekos.life/api/v2/img/cuddle");
		
		const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(`${message.author.username} cuddled ${message.mentions.users.first().username} OwO`)
		.setImage(body.url) 
		.setFooter(`Message sent by: your dad`);
		message.channel.send({embed})
	}
	else if (command === 'funnynsfw') {
		const snekfetch = require('snekfetch');
		const { promisifyAll } = require('tsubaki');
		const xml = promisifyAll(require('xml2js'));
		if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.")
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/NSFWfunny.json?sort=top&t=week')
            .query({ limit: 800 });
		const allowed = !message.channel.nsfw ? body.data.children : body.data.children.filter(post => post.data.over_18);
		if (!allowed.length) return message.channel.send('It seems we are out of fresh images for you!, Try again later.');
		const randomnumber = Math.floor(Math.random() * allowed.length)
		const embed = new Discord.MessageEmbed()
			.setColor(0x00A2E8)
			.setTitle(allowed[randomnumber].data.title)
			.setImage(allowed[randomnumber].data.url)
		message.channel.send(embed)
	}
	
	
});
		


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'cat') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		message.channel.send(file);
	} 
	
	else if (command === 'animefliptable') {
		const frames = [
			'(-°□°)-  ┬─┬',
			'(╯°□°)╯    ]',
			'(╯°□°)╯  ︵  ┻━┻',
			'(╯°□°)╯       [',
			'(╯°□°)╯           ┬─┬'
		];
		const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
		for (const frame of frames) {
			setTimeout(() => {}, 4000);
			await msg.edit(frame);
		}
		return message;
	}
	
	
	else if (command === 'compliment') {
		let user = message.mentions.users.first();
		if (message.mentions.users === message.author.username) return message.reply('You can not compliment yourself');
		if (message.mentions.users.size < 1) return message.reply('You must mention someone to compliment them.')
		var roast = [
			"Your smile is contagious.",
			"You look great today.",
			"You're a smart cookie.",
			"I bet you make babies smile.",
			"You have impeccable manners.",
			"I like your style.",
			"You have the best laugh.",
			"I appreciate you.",
			"You are the most perfect you there is.",
			"You are enough.",
			"You're strong.",
			"Your perspective is refreshing.",
			"You're an awesome friend.",
			"You light up the room.",
			"You shine brighter than a shooting star.",
			"You deserve a hug right now.",
			"You should be proud of yourself.",
			"You're more helpful than you realize.",
			"You have a great sense of humor.",
			"You've got all the right moves!",
			"Is that your picture next to 'charming' in the dictionary?",
			"Your kindness is a balm to all who encounter it.",
			"You're all that and a super-size bag of chips.",
			"On a scale from 1 to 10, you're an 11.",
			"You are brave.",
			"You're even more beautiful on the inside than you are on the outside.",
			"You have the courage of your convictions.",
			"Your eyes are breathtaking.",
			"If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.",
			"You are making a difference.",
			"You're like sunshine on a rainy day.",
			"You bring out the best in other people.",
			"Your ability to recall random factoids at just the right time is impressive.",
			"You're a great listener.",
			"How is it that you always look great, even in sweatpants?",
			"Everything would be better if more people were like you!",
			"I bet you sweat glitter.",
			"You were cool way before hipsters were cool.",
			"That color is perfect on you.",
			"Hanging out with you is always a blast.",
			"You always know -- and say -- exactly what I need to hear when I need to hear it.",
			"You smell really good.",
			"You may dance like no one's watching, but everyone's watching because you're an amazing dancer!",
			"Being around you makes everything better!",
			"When you say, 'I meant to do that,' I totally believe you.",
			"When you're not afraid to be yourself is when you're most incredible.",
			"Colors seem brighter when you're around.",
			"You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
			"That thing you don't like about yourself is what makes you so interesting.",
			"You're wonderful.",
			"You have cute elbows. For reals!",
			"Jokes are funnier when you tell them.",
			"You're better than a triple-scoop ice cream cone. With sprinkles.",
			"Your bellybutton is kind of adorable.",
			"Your hair looks stunning.",
			"You're one of a kind!",
			"You're inspiring.",
			"If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener.",
			"You should be thanked more often. So thank you!!",
			"Our community is better because you're in it.",
			"Someone is getting through something hard right now because you've got their back.",
			"You have the best ideas.",
			"You always know how to find that silver lining.",
			"Everyone gets knocked down sometimes, but you always get back up and keep going.",
			"You're a candle in the darkness.",
			"You're a great example to others.",
			"Being around you is like being on a happy little vacation.",
			"You always know just what to say.",
			"You're always learning new things and trying to better yourself, which is awesome.",
			"If someone based an Internet meme on you, it would have impeccable grammar.",
			"You could survive a Zombie apocalypse.",
			"You're more fun than bubble wrap.",
			"When you make a mistake, you fix it.",
			"Who raised you? They deserve a medal for a job well done.",
			"You're great at figuring stuff out.",
			"Your voice is magnificent.",
			"The people you love are lucky to have you in their lives.",
			"You're like a breath of fresh air.",
			"You're gorgeous -- and that's the least interesting thing about you, too.",
			"You're so thoughtful.",
			"Your creative potential seems limitless.",
			"Your name suits you to a T.",
			"You're irresistible when you blush.",
			"Actions speak louder than words, and yours tell an incredible story.",
			"Somehow you make time stop and fly at the same time.",
			"When you make up your mind about something, nothing stands in your way.",
			"You seem to really know who you are.",
			"Any team would be lucky to have you on it.",
			"In high school I bet you were voted 'most likely to keep being awesome.'",
			"I bet you do the crossword puzzle in ink.",
			"Babies and small animals probably love you.",
			"If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).",
			"There's ordinary, and then there's you.",
			"You're someone's reason to smile.",
			"You're even better than a unicorn, because you're real.",
			"How do you keep being so funny and making everyone laugh?",
			"You have a good head on your shoulders.",
			"Has anyone ever told you that you have great posture?",
			"The way you treasure your loved ones is incredible.",
			"You're really something special.",
			"You're a gift to those around you.",
			"You don't deserve it."
		]
		const roasts = roast[Math.floor(Math.random() * roast.length)];
		const embed = new Discord.MessageEmbed()
			.setColor(0x00A2E8)
			.setDescription(user.username + ", " + roasts);
		message.channel.send({embed})
	
	}
	
	else if (command === 'pat') {
		if (!message.mentions.users.size) {
                        return message.reply('you need to tag a user in order to pat them!');
                }

                const { link } = await fetch('https://some-random-api.ml/animu/pat').then(response => response.json());
		const taggedUser = message.mentions.users.first();


                message.channel.send(link);
		message.channel.send(`${author.username} patted ${taggedUser}`)
        }

	else if (command === 'pandafacts') {
		const { fact } = await fetch('https://some-random-api.ml/facts/panda').then(response => response.json());

		message.channel.send(fact);
	}else if(command === 'hug') {
		if (!message.mentions.users.size) {
                        return message.reply('you need to tag a user in order to hug them!');
                }


		const { link } = await fetch('https://some-random-api.ml/animu/hug').then(response => response.json());
		const taggedUser = message.mentions.users.first();
		
		message.channel.send(link);
	}else if(command === 'wink') {
                if (!message.mentions.users.size) {
                        return message.reply('you need to tag a user in order to wink them!');
                }


                const { link } = await fetch('https://some-random-api.ml/animu/wink').then(response => response.json());
                const taggedUser = message.mentions.users.first();

                message.channel.send(link);
        }
	else if (command === 'panda') {
		const { link } = await fetch('https://some-random-api.ml/img/panda').then(response => response.json());

		message.channel.send(link);
	}else if (command === 'dog') {
		const { link } = await fetch('https://some-random-api.ml/img/dog').then(response => response.json());
		
		message.channel.send(link);
	}else if (command === 'pikachu') {
		const {link} = await fetch('https://some-random-api.ml/img/pikachu').then(response => response.json());
	
		message.channel.send(link);
	}else if (command === 'redpanda') {
                const {link} = await fetch('https://some-random-api.ml/img/red_panda').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'koala') {
                const {link} = await fetch('https://some-random-api.ml/img/koala').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'whale') {
                const {link} = await fetch('https://some-random-api.ml/img/whale').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'kangroo') {
                const {link} = await fetch('https://some-random-api.ml/img/kangroo').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'fox') {
                const {link} = await fetch('https://some-random-api.ml/img/fox').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'bird') {
                const {link} = await fetch('https://some-random-api.ml/img/bird').then(response => response.json());

                message.channel.send(link);
        }else if (command === 'racoon') {
                const {link} = await fetch('https://some-random-api.ml/img/racoon').then(response => response.json());

                message.channel.send(link);
        }
	else if (command === 'gay') {
		let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                let mention = message.mentions.users.first();
                if(!mention) return;

                

		message.channel.send(`https://some-random-api.ml/canvas/gay?avatar=${avatar}`);
        }
	else if (command === 'glass') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                    

                message.channel.send(`https://some-random-api.ml/canvas/glass?avatar=${avatar}`);
        }else if (command === 'wasted') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                    

                message.channel.send(`https://some-random-api.ml/canvas/wasted?avatar=${avatar}`);
        }else if (command === 'greyscale') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                    

                message.channel.send(`https://some-random-api.ml/canvas/greyscale?avatar=${avatar}`);
        }else if (command === 'invert') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                    

                message.channel.send(`https://some-random-api.ml/canvas/invert?avatar=${avatar}`);
        }else if (command === 'invertgreyscale') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                    

                message.channel.send(`https://some-random-api.ml/canvas/invertgreyscale?avatar=${avatar}`);
        }else if (command === 'brightness') {
                let mention = message.mentions.users.first();
				if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

                    

                message.channel.send(`https://some-random-api.ml/canvas/brightness?avatar=${avatar}`);
        }else if (command === 'threshold') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });


                message.channel.send(`https://some-random-api.ml/canvas/threshold?avatar=${avatar}`);
        }else if (command === 'sepia') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });


                message.channel.send(`https://some-random-api.ml/canvas/sepia?avatar=${avatar}`);
        }else if (command === 'red') {
                let mention = message.mentions.users.first();
                if(!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });


                message.channel.send(`https://some-random-api.ml/canvas/red?avatar=${avatar}`);
		}else if (command === 'blue') {
				let mention = message.mentions.users.first();
				if (!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

				message.channel.send(`https://some-random-api.ml/canvas/blue?avatar=${avatar}`);
		}else if (command === 'green') {
				let mention = message.mentions.users.first();
				if (!mention) return;
				let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

				message.channel.send(`https://some-random-api.ml/canvas/green?avatar=${avatar}`)
		} 




	else if (command === 'memes') {
		const { image } = await fetch('https://some-random-api.ml/meme').then(response => response.json());
		const { caption } = await fetch('https://some-random-api.ml/meme').then(response => response.json());
		
		const meme = new Discord.MessageEmbed()
                        .setColor('#EFFF00')
                        .setTitle('meme')
                        .setImage(image)
                        .setDescription(caption)
                message.channel.send(meme);

	}else if (command === 'encode01') {
		if (!args.length) {
                        return message.channel.send('You need to supply a text!');
                }

                const txt = querystring.stringify({ term: args.join(' ') });


		const { binary } = await fetch(`https://some-random-api.ml/binary?text=${txt}`).then(response => response.json());
		

		message.channel.send(binary);
	}else if (command === 'hack') {
		const msg = await message.channel.send("hacking you");
		msg.edit ("https://media.giphy.com/media/3og0ILLVvPp8d64Jd6/giphy.gif");
		msg.edit (`doxxing ${message.author}`);
		msg.edit (`found your instagram profile`);
		msg.edit (`bruteforcing it ../..`);
		msg.edit (`bruteforcing it ..\..`);
		msg.edit (`found your password suckmydick`);
		msg.edit (`found your phone number *********`);
		msg.edit (`using OSINT framework to dig in more .`);
		msg.edit (`using OSINT framework to dig in more ..`);
		msg.edit (`using OSINT framework to dig in more ...`);
		msg.edit (`Found your real name ${message.author}`);
		msg.edit (`backdooring your device`);
		msg.edit (`INSTALLING TROJAN IN YOUR POWER MANAGEMENT`);
		msg.edit (`installation successful`);
		msg.edit (`shutting down.......`);
		msg.edit (`Hack Successful 
		https://media.giphy.com/media/3og0ILLVvPp8d64Jd6/giphy.gif`);
	}
		else if (command === "ban") {

			let reason = args.slice(1).join(' ');
			let user = message.mentions.users.first();
			if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them.').catch(console.error);
			if (message.mentions.users.first().id === message.author.id) return message.channel.send('I can\'t let you do that, self-harm is bad:facepalm:');
			if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
			if (message.mentions.users.first().id === "242263403001937920") return message.channel.send("You can't ban my Developer:wink:");
			if (reason.length < 1) reason = 'No reason supplied.';
			let botRolePossition = message.guild.member(client.user).roles.highest.position;
			let rolePosition = message.guild.member(user).roles.highest.position;
			let userRolePossition = message.member.roles.highest.position;
			if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Cannor ban that member because they have roles that is higher or equal to you.")
			if (botRolePossition <= rolePosition) return message.channel.send("❌**Error:** Cannor ban that member because they have roles that is higher or equal to me.")
			if (!message.guild.member(user).bannable) {
				message.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
				return
			}else{
				const embed = new Discord.MessageEmbed()
				.setColor(0xFF0000)
				.setTimestamp()
				.addField('Action:', 'Ban')
				.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
				.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
				.addField('Reason', reason)
				.setFooter(`mdc`);
				//let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
				if(user.bot) return;
				message.mentions.users.first().send({embed}).catch(e =>{
				if(e) return
				});
				message.guild.members.ban(user.id, {days:7, reason: reason})
				let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
				if  (!logchannel){
				message.channel.send({embed})
				}else{
				client.channels.cache.get(logchannel.id).send({embed});
				message.channel.send({embed})
				} 
				if(user.bot) return;
				message.mentions.users.first().send({embed}).catch(e =>{
				if(e) return 
				});
			}
		} else if(command === "lockdown") {
			if (!client.lockit) client.lockit = [];
			if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("❌**Error:** You don't have the permission to do that!");

			message.channel.createOverwrite(message.guild.id, {
				SEND_MESSAGES: false
				})
				message.channel.send(`Damnn, **${message.author.username}** just locked the channel down. Don't worry, Admins will soon open the chat again so be patient.`);
		} 
		else if (command === "unlockdown") {
			if (!client.lockit) client.lockit = [];
			if (!message.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("❌**Error:** You don't have the permission to do that!");

			message.channel.createOverwrite(message.guild.id, {
			SEND_MESSAGES: null
			}).then(() => {
			message.channel.send('Lockdown lifted <a:balancecheck:556017659419033653> WEEEEEEEEEEEEEEEEEEEEEE, enjoy talking while you still can:wink:');
			delete client.lockit[message.channel.id];
			}).catch(error => {
			console.log(error);
    })
		}
		else if (command === "spank") {
			const superagent = require('superagent');
			if (!message.mentions.users.first()) return message.reply("You need to mention someone to spank them");
			if(!message.channel.nsfw) return message.reply("NSFW is not enabled in this channel");
			if(message.mentions.users.first().id === "702412371209224232") return message.reply('You can\'t spank my Dev baka.:facepalm: He will spank your ass off >:3');
			const { body } = await superagent
			.get("https://nekos.life/api/v2/img/spank");
			
			const embed = new Discord.MessageEmbed()
			.setColor("#ff9900")
			.setTitle(`${message.mentions.users.first().username}, you got spanked in da butt by ${message.author.username} >:3`)
			.setImage(body.url) 
			.setFooter(`mente-de-cipolla`);
			message.channel.send({embed})
		}
		else if (command === 'slap') {
			const superagent = require('superagent');
			if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them");
			if(message.mentions.users.first().id === "702412371209224232") return message.reply('You can\'t hurt him you pleblord.');
			if (message.mentions.users.first().id == client.user.id && message.author.id === "702412371209224232"){
			const { body } = await superagent
			.get("https://nekos.life/api/v2/img/slap");
			
			const embed = new Discord.MessageEmbed()
			.setColor("#ff9900")
			.setTitle(`No u! *slaps*${message.mentions.users.first().username}`)
			.setImage(body.url) 
			.setFooter(`Mente-de-cipolla`);
			return message.channel.send({embed})
			}else if (message.mentions.users.first().id == client.user.id && message.author.id !== "702412371209224232"){
			return message.channel.send("NUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU **owwie**")
			}
			const { body } = await superagent
			.get("https://nekos.life/api/v2/img/slap");
			
			const embed = new Discord.MessageEmbed()
			.setColor("#ff9900")
			.setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
			.setImage(body.url) 
			.setFooter(`mente-de-cipolla`);
			message.channel.send({embed})
		}
		else if(command === 'gayness') {
			if(message.mentions.users.first().id === "702412371209224232") return message.reply('he is not gay');
			gay = Math.floor(Math.random()*100)
			if (message.mentions.users.size > 0) {
				const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`Gayness of ${message.mentions.users.first().username}: `)
				.setDescription(`${gay}% :rainbow_flag: `)
				message.channel.send({embed});
			}
			else {
				const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`Gayness of ${message.author.username}: `)
				.setDescription(`${gay}% :rainbow_flag: `)
				message.channel.send({embed});
			}
		}
		else if (command === 'hentai') {
			const { body } = await snekfetch
            .get('https://nekos.life/api/lewd/neko')
       
			if (!message.channel.nsfw) return message.channel.send("Cannot send NSFW content in a SFW channel.")
			const embed = new Discord.MessageEmbed()
			.setImage(body.neko)
			message.channel.send(embed).catch(console.error);
		}
		else if (command === 'lyrics') {
			const lyricsFinder = require("lyrics-finder");
			const queue = message.client.queue.get(message.guild.id);
			if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

			let lyrics = null;

			try {
			lyrics = await lyricsFinder(queue.songs[0].title, "");
			if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
			} catch (error) {
			lyrics = `No lyrics found for ${queue.songs[0].title}.`;
			}

			let lyricsEmbed = new MessageEmbed()
			.setTitle(`${queue.songs[0].title} — Lyrics`)
			.setDescription(lyrics)
			.setColor("#F8AA2A")
			.setTimestamp();

			if (lyricsEmbed.description.length >= 2048)
			lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
			return message.channel.send(lyricsEmbed).catch(console.error);
		}
		else if (command === 'mute') {
			let reason = args.slice(1).join(' ');
			if(!message.mentions.users.first())return message.reply("Please mention someone to mute them")
			let user = message.mentions.users.first();
			let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
			if(message.mentions.users.first().id === "702412371209224232") return message.reply('You can\'t mute him you pleblord.:facepalm:')
			if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
			if (!muteRole) {
				try {
					muteRole = await message.guild.roles.create({ data: {
						name:"Muted",
						color: "#000000",
						permissions:[]
					}});

					message.guild.channels.cache.forEach(async (channel, id) => {
						await channel.createOverwrite(muteRole, {
							SEND_MESSAGES: false,
							MANAGE_MESSAGES: false,
							READ_MESSAGES: false,
							ADD_REACTIONS: false
						});
					});
				} catch(e) {
					console.log(e.stack);
				}
			}
			if (reason.length < 1) reason = 'No reason Supplied';
			if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);

			if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
			if (message.guild.member(user).roles.cache.has(muteRole.id)) {
				if(message.content.includes("/mute")) return message.reply("that user has already been muted")
				message.guild.member(user).roles.remove(muteRole).then(() => {
				const embed = new Discord.MessageEmbed()
				.setColor(0x00FFFF)
				.setTimestamp()
				.addField('Action:', 'Unmute')
				.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
				.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
				.addField('Reason', reason)
				.setFooter(`Mente-De-Cipolla`);
				let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
				if  (!logchannel){
				message.channel.send({embed})
				}else{
					client.channels.cache.get(logchannel.id).send({embed});
					message.channel.send({embed})
				} 
				if(user.bot) return;
				message.mentions.users.first().send({embed}).catch(e =>{
					if(e) return 
				});
				});
			} else {
				if(message.content.includes("/unmute")) return message.reply("that user has not been muted **yet**")
				message.guild.member(user).roles.add(muteRole).then(() => {
				const embed = new Discord.MessageEmbed()
				.setColor(0x00FFFF)
				.setTimestamp()
				.addField('Action:', 'Mute')
				.addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
				.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
				.addField('Reason', reason)
				.setFooter(`Mente-De-Cipolla`);
				let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
				if  (!logchannel){
				message.channel.send({embed})
				}else{
					client.channels.cache.get(logchannel.id).send({embed});
					message.channel.send({embed})
				} 
				if(user.bot) return;
				message.mentions.users.first().send({embed}).catch(e =>{
					if(e) return 
				});
				});
			}
		}
		
		
		else if (command === "calculate") {
			const math = require('mathjs');
			if(!args[0]) return message.channel.send('Please provide a question');

			let resp;

			try {
				resp = math.evaluate(args.join(" "))
			} catch (e) {
				return message.channel.send('Please provide a **valid** question')
			}

			const embed = new Discord.MessageEmbed()
			.setColor(0x808080)
			.setTitle('Calculator')
			.addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
			.addField('Answer', `\`\`\`css\n${resp}\`\`\``)

			message.channel.send(embed);

		}
		else if (command === "warn") {
			const db = require('quick.db');

			if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that');

			const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

			if(!user) return message.channel.send('Please specify a user, via mention or ID');

			if(user.bot) return message.channel.send('You can\'t warn bots');

			if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

			

			let reason = args.slice(1).join(" ");

			if(!reason) reason = 'Unspecified';

			let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

			if(warnings === 3) return message.channel.send(`${user} has already reached three warnings`);


			if(warnings === null) {
				db.set(`warnings_${message.guild.id}_${user.id}`, 1);
				user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
				await message.channel.send(`**${user.username}** has been warned`)
			}

			if(warnings !== null){
				db.add(`warnings_${message.guild.id}_${user.id}`, 1)
				user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
				await message.channel.send(`**${user.username}** has been warned`)
			}
		}
		else if (command === 'deletewarn') {
			const db = require('quick.db');
			const warnings = require('./commands/warnings');	
			if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that.');

			const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

			if(!user) return message.channel.send('Please specify a user, via mention or ID');

			if(user.bot) return message.channel.send('You can\'t warn bots');

			if(user.id === message.author.id) return message.channel.send('You can\'t clear your own warnings');

			if(warnings === null) return message.channel.send(`**${user.username} has no warnings**`);


			db.delete(`warnings_${message.guild.id}_${user.id}`);

			message.channel.send('Success!')
		}
		

});
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log' || ch.name === 'new-usher' || ch.name === 'welcome-goodbye' || ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./grid.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
	
});
client.on("guildMemberRemove", async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log' || ch.name === 'new-usher' || ch.name === 'welcome-goodbye' || ch.name === 'goodbye');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./grid.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Left The Server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Left the server, ${member}!`, attachment);
});
client.on('message', message => {
	if (message.content === '!join') {
		client.emit('guildMemberRemove', message.member);
	}
	
});


const { ReactionRoleManager } = require('discord.js-collector')

const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, // Enable reaction role store in a Json file
    path: __dirname + '/roles.json', // Where will save the roles if store is enabled
    mongoDbLink: 'mongodb+srv://daemon:sardana888@cluster0.h3w3w.mongodb.net/ReactionRoles' // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md
});



// When user react and win role, will trigger this event
reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(member.displayName + ' won the role' + role.name)
});

// When user remove reaction and lose role, will trigger this event
reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lose the role' + role.name)
});

// When someone removed all reactions from message
reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`All reactions from message ${message.id} was removed, all roles was taken and reactions roles deleted.`)
});

// If member doesn't have all requirements, this event is triggered.
reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Member '${member.id}' will not win role '${reactionRole.role}', because him hasn't requirement ${type}`);
});

// Triggered when the bot doesn't have permissions to manage this role.
reactionRoleManager.on('missingPermissions', (action, member, roles, reactionRole) => {
    console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
});

client.on("message", async (message) => {
    const client = message.client;
    const args = message.content.split(' ').slice(1);
    // Example
    // >createReactionRole @role :emoji: MessageId
    if (message.content.startsWith('.createReactionRole')) {
        const role = message.mentions.roles.first();
        if (!role)
            return message.reply('You need mention a role').then(m => m.delete({ timeout: 1000 }));

        const emoji = args[1];
        if (!emoji)
            return message.reply('You need use a valid emoji.').then(m => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!role)
            return message.reply('Message not found! Wtf...').then(m => m.delete({ timeout: 1000 }));

        reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type:3
        });
/**
 * Reaction Role Type
 * NORMAL [1] - This role works like basic reaction role.
 * TOGGLE [2] - You can win only one role of all toggle roles in this message (like colors system)
 * JUST_WIN [3] - This role you'll only win, not lose.
 * JUST_LOSE [4] - This role you'll only lose, not win.
 * REVERSED [5] - This is reversed role. When react, you'll lose it, when you take off reaction you'll win it.
 */


        message.reply('Done').then(m => m.delete({ timeout: 500 }));
    }
    else if (message.content.startsWith('.deleteReactionRole')){
        const emoji = args[0];
        if (!emoji)
            return message.reply('You need use a valid emoji.').then(m => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[1]);
        if (!msg)
            return message.reply('Message not found! Wtf...').then(m => m.delete({ timeout: 1000 }));

        await reactionRoleManager.deleteReactionRole({message: msg, emoji});
    }
});
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});
fs.readdir("./player-events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});



fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});


client.login(token);

