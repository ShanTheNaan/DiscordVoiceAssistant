const Discord = require('discord.js')
var streamBuffers = require('stream-buffers');
const client = new Discord.Client()
const {prefix, bot_token} = require("./config.json")

var replayData = []

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})


client.on ('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log (command)

    if (command === "hi") {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
        } else {
            message.reply('You need to join a voice channel first!')
        }
    } else if (command === "record") {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
            .then (conn => {
                const dispatcher = conn.playFile(__dirname + "/audio/sigDia.mp3")
                let recv = conn.createReceiver()
                
                dispatcher.on("end", () => {
                    conn.on ("speaking", (user, speaking) => {
                        if (speaking) {
                            let stream = recv.createPCMStream(user)
                            stream.on ("data", data => {
                                replayData.push(data)
                            })
                        } else {
                            recv.destroy()
                        }
                    })
                })
            })
            .catch(console.error);
        } else {
            message.reply('You need to join a voice channel first!')
        }  
    } else if (command === "replay") {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
            .then (conn => {
                console.log("conntd")
                if (replayData) {
                    let rbuff = new streamBuffers.ReadableStreamBuffer()
                    rbuff.put(Buffer.concat(replayData))
                    const dispatcher = conn.playConvertedStream(rbuff)
                }
            })
        }
    } else if (command === "flex") {
        playAudioFile (msg, "weirdFlex.mp3")
	} else if (command === "sadru") {
        playAudioFile (msg, "sadru.mp3")
    } else if (command === "twice") {
        playAudioFile (msg, "twice.mp3")
    } else if (command === "nick") {
        playAudioFile (msg, "supNick.mp3")
    } else if (command === "bye") {
        if (msg.guild.me.voiceChannel){
            msg.guild.me.voiceChannel.leave();
        }
    }
})

client.login (bot_token)

/*********************************************/
/************ Helper Functions ***************/
/*********************************************/

/**** Play Audio file ****/
function playAudioFile (msg, file) {
    // let conn = joinChannel (msg)
    // if (conn != null) {
    //     const disp = conn.playFile(__dirname + "/audio/" + file)
    // } else {
    //     console.log("connection is null")
    // }
    
    if (msg.guild.me.voiceChannel == msg.member.voiceChannel) {
        for (let [guildId, conn] of client.voiceConnections) {
            if (msg.guild.id == guildId) {
                const dispatcher = conn.playFile(__dirname + "/audio/" +file)
                break
            }
        }
    } else {
        msg.member.voiceChannel.join()
        .then (conn => {
            const dispatcher = conn.playFile(__dirname + "/audio/"+ file)
        })
    }
}

/**** Join Channel by message ****/
function joinChannel(msg) {
    if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
        .then (conn => {
            return conn
        })
    } else {
        message.reply('You need to join a voice channel first!')
        return null
    }
}