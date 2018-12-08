const Discord = require("discord.js");
const BotSettings = require("./botsettings.json") // Hier zeigst du dem Bot, wo seine Items zum interagieren sind.
                                                  // Prefix ist das, worauf der Bot reagiert, also alles was mit prefix startet ist ein Befehl
                                                  // Das was dann in den `` sind ist das was er ausliest. bedeutet nachdem du ihm gesagt hast, er soll den prefix nutzen, kannst du allesmögliche als Befehlsname verwenden.

const bot = new Discord.Client(); //Hier erstellst du den Bot

bot.on("ready", async () => {
    console.log(`Bot ist eingeloggt als ${bot.user.tag}.`)

})

bot.on("message", async message => {

    if(message.content == `${BotSettings.prefix}ping`) { //So machst du jeden deiner Befehle, ein if gibt aus "wenn", heißt wenn der Inhalt der Nachricht prefix ist,
        message.channel.send()                           // Führt er das aus, was in den {} Klammern ist.
    }
})

bot.login(BotSettings.token)