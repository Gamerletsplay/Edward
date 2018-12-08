const Discord = require("discord.js");
const BotSettings = require("./botsettings.json") // Hier zeigst du dem Bot, wo seine Items zum interagieren sind.
                                                  // Prefix ist das, worauf der Bot reagiert, also alles was mit prefix startet ist ein Befehl
                                                  // Das was dann in den `` sind ist das was er ausliest. bedeutet nachdem du ihm gesagt hast, er soll den prefix nutzen, kannst du allesmögliche als Befehlsname verwenden.

const bot = new Discord.Client(); //Hier erstellst du den Bot

bot.on("ready", async () => {
    console.log(`Bot ist eingeloggt als ${bot.user.tag}.`)
    bot.user.setStatus("online") //online, idle, dnd, invisible
    bot.user.setActivity(`${BotSettings.prefix}help`, {
        type: "PLAYING" //PLAYING, STREAMING, LISTENING, WATCHING
    }) 

})

bot.on("message", async message => {


    
        var BotIcon = bot.user.avatarURL
        var EntwicklerName = `**${bot.users.get(BotSettings.OwnerID).username}**#${bot.users.get(BotSettings.OwnerID).discriminator}`
        var args = message.content.slice(BotSettings.prefix.length).trim().split(" ")
        var mention = message.mentions.members.first()
        var command = args.shift()

    


    //Help
    if(message.content == `${BotSettings.prefix}help`) {
        var help = new Discord.RichEmbed()
        .setColor("#5ac054")
        .setTitle("Hier seht ihr alle Befehle")
        .setThumbnail(BotIcon)
        .addField(`${BotSettings.prefix}info`,`Zeigt dir Infos zum Bot`)
        .addField(`${BotSettings.prefix}userinfo`,`Gibt dir ein paar Infos zu deinem Account. \nUm dies bei wem anders sehen zu können, einfach den Nutzer markieren. **[${BotSettings.prefix}userinfo @User]**`)
        .addField(`${BotSettings.prefix}kick`,`Kickt einen bestimmten User`)
        .addField(`${BotSettings.prefix}ban`,`Bannt einen bestimmten User`)
        .addField(`${BotSettings.prefix}say`,`Lass den Bot für dich sprechen.`)
        .setTimestamp()
        message.channel.send(help)
    }


    //Info Comamnd
    if(message.content == `${BotSettings.prefix}info`) {
        var info = new Discord.RichEmbed()

        .setColor("#5ac054")
        .setTitle(`Informationen über ${bot.user.username}`)
        .setDescription("[Entwickler Server](https://discord.gg/yu8FjhJ)")
        .setThumbnail(BotIcon)
        .addField(`Name + Tag`,`**${bot.user.username}**#${bot.user.discriminator}`,true)
        .addField(`Bot ID`, `${bot.user.id}`,true)
        .addField(`Entwickler`,`${EntwicklerName}`,true)
        .addField(`Bot einladen`,"[Klick hier](https://discordapp.com/api/oauth2/authorize?client_id=520604535887233024&permissions=8&scope=bot)",true)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()

        message.channel.send(info)
    }

    //Userinfo
    if(message.content == `${BotSettings.prefix}userinfo`) {
        var userinfo = new Discord.RichEmbed()

        .setColor(message.member.highestRole.color || "#000000")
        .setTitle(`Userinfo über ${message.member.user.username}`)
        .addField(`Name + Tag`,`**${message.author.username}**#${message.author.discriminator}`)
        .addField(`ID`,`${message.author.id}`)
        .addField(`Status`,`${BotSettings.StatusTypen[message.member.user.presence.status]}`)
        .setTimestamp()

        if(message.author.presence.game) {
            userinfo.addField(`Aktivität`,`${BotSettings.SpielTypen[message.member.user.presence.game.type]} **${message.member.user.presence.game.name}**`)
        } else {
            userinfo.addField(`Aktivität`,`~`)
        }

            userinfo.setThumbnail(message.author.avatarURL)

        message.channel.send(userinfo)
    }

    //Userinfo
    if(message.content == `${BotSettings.prefix}userinfo ${mention}`) {
        var userinfo = new Discord.RichEmbed()

        .setColor(mention.highestRole.color || "#000000")
        .setTitle(`Userinfo über ${mention.user.username}`)
        .addField(`Name + Tag`,`**${mention.user.username}**#${mention.user.discriminator}`)
        .addField(`ID`,`${mention.id}`)
        .addField(`Status`,`${BotSettings.StatusTypen[mention.user.presence.status]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()

        if(mention.presence.game) {
            userinfo.addField(`Aktivität`,`${BotSettings.SpielTypen[mention.user.presence.game.type]} **${mention.user.presence.game.name}**`)
        } else {
            userinfo.addField(`Aktivität`,`~`)
        }  
            userinfo.setThumbnail(mention.user.avatarURL)

        message.channel.send(userinfo)
    }
 

    //Kick
    if(message.content.startsWith(`${BotSettings.prefix}kick`)) {
        if(message.author.id == BotSettings.OwnerID ||  message.member.hasPermission("KICK_MEMBERS"))  {
    
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    
            if(!member)
    
              return message.reply(`Bitte gib ein Mitglied an, das sich auf dem Server befindet!`);
    
            if(!member.kickable) 
    
              return message.reply("Dieses Mitglied kann ich nicht kicken.");
        
    
            let reason = args.slice(2).join(' ');
    
    
            if(!reason) return message.reply(`Bitte gib einen Grund an!`)
    
            if(member.user.id == BotSettings.OwnerID) return message.reply(`Der Entwickler kann nicht gekickt werden!`)
    
            await member.kick(reason)
        
            return message.reply(`**${member.user.username}**#${member.user.discriminator} wurde für **${reason}** vom Server gekickt.`);
    
            } else {
                message.channel.send(`Für diesen Befehl brauchst du **Mitglieder-Kicken** Rechte. ${message.author}`)
            } 
            message.delete();
    }

     //Ban
     if(message.content.startsWith(`${BotSettings.prefix}ban`)) {
        if(message.author.id == BotSettings.OwnerID ||  message.member.hasPermission("BAN_MEMBERS"))  {
    
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    
            if(!member)
    
              return message.reply(`Bitte gib ein Mitglied an, das sich auf dem Server befindet!`);
    
            if(!member.bannable) 
    
              return message.reply("Dieses Mitglied kann ich nicht bannen.");
        
    
            let reason = args.slice(2).join(' ');
    
    
            if(!reason) return message.reply(`Bitte gib einen Grund an!`)
    
            if(member.user.id == BotSettings.OwnerID) return message.reply(`Der Entwickler kann nicht gekickt werden!`)
    
            await member.ban(reason)
        
            return message.reply(`**${member.user.username}**#${member.user.discriminator} wurde für **${reason}** vom Server gebannt.`);
    
            } else {
                message.channel.send(`Für diesen Befehl brauchst du **Mitglieder-Bannen** Rechte. ${message.author}`)
            } 
            message.delete();
    }


    //Say
    if(message.content.startsWith(`${BotSettings.prefix}say`)) {
        if(message.author.id == BotSettings.OwnerID) { 
            var Say = args.join(" ") 
            if(Say) {
                message.channel.send(Say) 
            } else { 
                message.channel.send(`Was soll ich sagen? ${message.author}`)
            }
        } else { 
            let msgsay = await message.channel.send(`Nur der Entwickler kann das. ${message.author}`)
            setTimeout(async () => {msgsay.delete()}, 5000)

        }
        message.delete();
    }



    //Spam Command [Owner Only]
    if(message.content == `${BotSettings.prefix}spam`) {
        console.log(`Befehl wurde ausgeführt von ${message.author.tag}`)
       if(message.author.id == BotSettings.OwnerID) {
        setInterval(async function () {
            message.channel.send("lol")
        }, 1000);
       } else {
           message.reply("Nur der Entwickler kann das.")
       }
    }

})

bot.login(BotSettings.token)