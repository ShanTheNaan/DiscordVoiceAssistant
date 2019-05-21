const Discord = require('discord.js')
const client = new Discord.Client()
const {prefix, bot_token} = require("./config.json")


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})


client.on ('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log (command)

    if (command === "join") {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
            .then (conn => {
                const dispatcher = conn.playFile(__dirname + "audio/weirdFlex.mp3")
                dispatcher.on("end", () => {
                    let recv = conn.createReceiver()
                    recv.on('opus', (user, data) => {
                        let hexString = data.toString('hex');

                        if (hexString === 'f8fffe') {
                            return;
                        }
                        console.log(hexString)
                    })
                })
            })
            .catch(console.error);


        } else {
            message.reply('You need to join a voice channel first!');
        }  
    }
})



client.login (bot_token)
