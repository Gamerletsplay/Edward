const Discord = require("discord.js");
const BotSettings = require("./botsettings.json")
const ffmpeg = require('ffmpeg');
const ping = require("ping");
                                                  // Prefix ist das, worauf der Bot reagiert, also alles was mit prefix startet ist ein Befehl
                                                  // Das was dann in den `` sind ist das was er ausliest. bedeutet nachdem du ihm gesagt hast, er soll den prefix nutzen, kannst du allesmögliche als Befehlsname verwenden.

const bot = new Discord.Client(); //Hier erstellst du den Bot

//start up
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
        var mention = message.mentions.members.first() || message.guild.members.get(args[0])
        var command = args.shift()
        var spieler = user.avatarURL


    //Eval 
    if(message.content.startsWith(`${BotSettings.prefix}eval`)) {
        if(message.author.id == BotSettings.OwnerID || message.author.id == "402483602094555138") {
            let command = args.join(" ");
            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              } 
             try {
              let code = args.join(" ");
              let evaled = eval(command);
         
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
         
              message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
              message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }              
        } else {
            let msgeval = await message.channel.send(`Nur der Entwickler kann das. ${message.author}`)
            setTimeout(async () => {msgeval.delete()}, 5000)
        } 
    } 



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
        .addField(`${BotSettings.prefix}serverliste`,`Zeigt dir alle Server, auf denen der Bot drauf ist.`)
        .addField(`${BotSettings.prefix}say`,`Lass den Bot für dich sprechen.`)
        .addField(`${BotSettings.prefix}restart`,`Startet den Bot neu.`)
        .addField(`${BotSettings.prefix}eval`,`Führt Code aus.`)
        .addField(`${BotSettings.prefix}keks`,`Du bekommst ein keks`)
        .addField(`${BotSettings.prefix}event`,`Damit könnt ihr ein event ankündigen`)
        .addField(`${BotSettings.prefix}emoij`,`hier könnt ihr den bot emoijs schicken lassen`)
        .addField(`${BotSettings.prefix}userinfo`,`hier seht ihr was für ein rang und was er spielt`) 
        .addField       
        .setTimestamp()
        message.channel.send(help)
    }


    //Info Comamnd
    if(message.content == `${BotSettings.prefix}info`) {
        ping.promise.probe('discordapp.com').then(result => {
        var info = new Discord.RichEmbed()

        .setColor("#5ac054")
        .setTitle(`Informationen über ${bot.user.username}`)
        .setDescription("[Entwickler Server](https://discord.gg/yu8FjhJ)")
        .setThumbnail(BotIcon)
        .addField(`Name + Tag`,`**${bot.user.username}**#${bot.user.discriminator}`,true)
        .addField(`Bot ID`, `${bot.user.id}`,true)
        .addField(`Ping`,`**${result.time}**ms`)
        .addField(`Entwickler`,`${EntwicklerName}`,true)
        .addField(`Bot einladen`,"[Klick hier](https://discordapp.com/api/oauth2/authorize?client_id=520604535887233024&permissions=8&scope=bot)",true)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()

        message.channel.send(info)
        });
    }


    //Userinfo
    if(message.content == `${BotSettings.prefix}userinfo`) {
        var userinfo = new Discord.RichEmbed()

        .setColor(message.member.highestRole.color || "#000000")
        .setTitle(`Userinfo über ${message.member.user.username}`)
        .addField(`Name + Tag`,`**${message.author.username}**#${message.author.discriminator}`)

        if(message.member.user.username != message.member.displayName) {
            userinfo.addField(`Nickname`, `**${message.member.displayName}**`)
        } else {
            userinfo.addField(`Nickname`, `-`)
        }

        userinfo.addField(`ID`,`${message.author.id}`)
        userinfo.addField(`Status`,`${BotSettings.StatusTypen[message.member.user.presence.status]}`)
        .setTimestamp()

        userinfo.addField(`Rollen`,`${message.member.roles.map(role => role.name).splice(1).join(" | ") || `-`}`)

        if(message.author.presence.game) {
            userinfo.addField(`Aktivität`,`${BotSettings.SpielTypen[message.member.user.presence.game.type]} **${message.member.user.presence.game.name}**`)
        } else {
            userinfo.addField(`Aktivität`,`~`)
        }

            userinfo.setThumbnail(message.author.avatarURL)

        message.channel.send(userinfo)
    }

    //Serverliste
    if(message.content == `${BotSettings.prefix}serverliste`) {
        var embed = new Discord.RichEmbed()

        .setColor("")
        .setDescription(`Der Bot ist aktuell auf **${bot.guilds.size}** Servern: \n \n\`\`\`${bot.guilds.map(members => members).join(",\n")}\`\`\``)
        setTimeout(async () => {msgsay.delete()}, 5000)
    
        message.channel.send(embed)
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


    //Join
    if(message.content == `${BotSettings.prefix}join`) {
        message.member.voiceChannel.join()
        message.reply(`Ich bin dem Channel ${message.member.voiceChannel} beigetreten.`)
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
    
    //Restart
    if(message.content == `${BotSettings.prefix}restart`) {
        if(message.author.id == BotSettings.OwnerID) {
            let restartchannel = message.channel

            bot.destroy()
            .then(bot.login(BotSettings.token))
            message.channel.send("Restarting...")
            bot.on("ready", async () => restartchannel.send("Ich bin wieder da!"))
        } else {
            message.reply("Nur der Entwickler kann das.")
        }
    }

    //RollenAdd
    if(message.content == `${BotSettings.prefix}roleadd`) {
        if(message.author.id == BotSettings.OwnerID || message.member.hasPermission("ADMINISTRATOR")) { //Rechte Check
            let Rolle = args.join(" ") //Rolle wird angegeben
            if(message.guild.roles.find(rolle => rolle.name === Rolle)) { //Die Rolle mit dem Namen wird gesucht, also oben das args.join(" ") sucht die Rolle mit dem Namen den du angibst

                message.member.addRole(message.guild.roles.find(rolle => rolle.name === Rolle).id) //Hier fügt er dir die Rolle hinzu, insofern es sie gibt.
                .then(message.channel.send(`Dir wurde die Rolle **${Rolle}** hinzugefügt. ${message.author}`)).catch(error => { //Catch bedeutet, das falls es einen Error gibt, er aufgefangen wird, und er dir den Error zeigt. Wie in der Konsole.
                    if(error) message.channel.send(`Etwas ist schief gelaufen. ${error}`) //Hier zeigt er dir den Error
                });
            }
        } else {
            message.channel.send(`Für diesen Befehl brauchst du **Administrator** Rechte. ${message.author}`) //Falls die Rechte nicht da sind.
        } if(args.length < 1) { //Hier checkt er die length, length bedeutet die Länge der Argumente die du angibst, und wenn diese unter 1 sind, sagt er dir, das du etwas angeben musst.

            message.reply("Bitte gib eine Rolle an.")
    
       } else if(!message.guild.roles.find(role => role.name === Rolle)) { //Hier sucht er die Rolle, doch das ! gibt an falls er die Rolle NICHT finden kann.
    
           message.reply("Diese Rolle existiert nicht auf dem Server.")
    
       }
    }

     //keks
     if(message.content == `${BotSettings.prefix}keks`) {
        message.channel.send(`:cookie:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //Nachrichten 


    //Event
    if(message.content == `${BotSettings.prefix}event`){
        message.channel.send(`Hi Leute was geht ich hoffe ihr schaut mal in <#523888826125647901> und bekommt schöne Ränge @everyone`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }
     
    //emoijs senden
    if(message.content == `${BotSettings.prefix}emoije`){
        var emoijs = new Discord.RichEmbed()
        .setColor(`#000000`)
        .setTitle(`Hier seht ihr was für emoijs ihr mit den bot senden könnt`)
        .setThumbnail(BotIcon)
        .addField(`${BotSettings.prefix}cookie`,`hier sendet er ein keks`)
        .addField(`${BotSettings.prefix}thumpsup`,`hier sendet er euch ein daumen hoch`)
        .addField(`${BotSettings.prefix}thumpsdown`,`hier sendt er euch ein daumen runter`)
        .addField(`${BotSettings.prefix}ok hand`,`hier krieg ihr ein ok`)
        .addField(`${BotSettings.prefix}joy`,`hier bekommt ihr den lach emoji`)
        .addField(`${BotSettings.prefix}sunglasses`,`hier bekommt ihr denn cool emoij`)
        .addField(`${BotSettings.prefix}sob`,`hier sendet er euch den trauigen emoij`)
        .setTitle(`Es kommen noch mehr aber bis her reichen die schreibt einfach ein paar ideen mir über pn ich freue mich schon :joy:`)
        .setTimestamp()
        .setAuthor(`Nico haller hat den bot programmiert`)
    }
    //emoijs
    
    //cookie
    if(message.content == `${BotSettings.prefix}cookie`){
        message.channel.send(`Der ist für dich mein freund :cookie:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //thumpsup 
    if(message.content == `${BotSettings.prefix}thumpsup`){
        message.channel.send(`hast du super gemacht :thumpsup:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //thumpsdown
    if(message.content == `${BotSettings.prefix}thumpsdown`){
        message.channel.send(`das ist aber schlecht :thumpsdown:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //joy
    if(message.content == `${BotSettings.prefix}joy`){
        message.channel.send(`hahaha das ist ja lustig :joy:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }
    
    //sob
    if(message.content == `${BotSettings.prefix}sob`){
        message.channel.send(`ich muss heulen so trauig :sob:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //sunglasses
    if(message.content == `${BotSettings.prefix}sunglasses`){
        message.channel.send(`ich bin echt cool in gegensatz zu dir :sunglasses:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    //ok_hand
    if(message.content == `${BotSettings.prefix}okhand`){
        message.channel.send(`das sieht voll ok aus super gemacht:ok_hand:`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }

    
    //spam
    if(message.content == `${BotSettings.prefix}spam`){
        message.channel.send(`Bitte unterlasse das spammem sonst wirst du gekickt`)
        setTimeout(async () => {msgsay.delete()}, 5000)
    }


});
 
//eval bot.users.get("ID").send("Text")
//eval bot.channels.get("ID").send("Text")

bot.login(BotSettings.token)