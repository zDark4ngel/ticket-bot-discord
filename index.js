const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 32767
})

var _0x1799=["\x64\x69\x73\x63\x6F\x72\x64\x2D\x68\x74\x6D\x6C\x2D\x74\x72\x61\x6E\x73\x63\x72\x69\x70\x74\x73","\x2E\x2F\x63\x6F\x6E\x66\x69\x67\x2E\x6A\x73\x6F\x6E","\x74\x6F\x6B\x65\x6E","\x6C\x6F\x67\x69\x6E","\x72\x65\x61\x64\x79","\x42\x4F\x54\x20\x4F\x4E\x4C\x49\x4E\x45","\x6C\x6F\x67","\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D","\x57\x52\x49\x54\x54\x45\x4E\x20\x42\x59\x20\u2020\x53\x6F\x2E\u1D05\u0280\u1D00\u0262\u1D0F\u2020\x23\x32\x38\x31\x32","\x42\x55\x59\x45\x44\x20\x49\x4E\x20\x6D\x34\x6E\x75\x33\x4C\x20\x4D\x6F\x64\x65\x6C\x73\x20\x2D\x20\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x45\x72\x51\x44\x4E\x33\x38\x53\x4D\x32","\x6F\x6E"];const discordTranscripts=require(_0x1799[0]);const config=require(_0x1799[1]);client[_0x1799[3]](config[_0x1799[2]]);client[_0x1799[10]](_0x1799[4],()=>{console[_0x1799[6]](_0x1799[5]);console[_0x1799[6]](_0x1799[7]);console[_0x1799[6]](_0x1799[8]);console[_0x1799[6]](_0x1799[7]);console[_0x1799[6]](_0x1799[9])})

client.on("messageCreate", message => {
    if (message.content == config.comandomanda) {
        if (message.member.roles.cache.has(config.ruolostaff)) {

        var mandabottoni = new Discord.MessageActionRow()
            .addComponents(buttonsupporto)

            var creaticket = new Discord.MessageEmbed()
            .setTitle(config.nomeserver+" - Tickets")
            .setFooter({ text: config.nomeserver, iconURL: config.logoserver })
            .setColor(config.coloreserver)
            .setDescription("Clicca il bottone per aprire un ticket !")
            .setThumbnail(config.logoserver)
        message.channel.send({ embeds: [creaticket], components: [mandabottoni] })
    }
}
})

//APRIRE SUPPORTO
client.on("interactionCreate", async interaction => {
    if (interaction.customId == "apriSupporto") {
        interaction.deferUpdate()
        if (interaction.guild.channels.cache.find(canale => canale.topic == `${interaction.user.id}`)) {
            interaction.user.send("**Hai gia un ticket aperto.**").catch(() => { })
            return
        }
        interaction.guild.channels.create("ticket "+interaction.user.username, {
            type: "text",
            topic: `${interaction.user.id}`,
            parent: config.categoriaidsupporto,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                {
                    id: config.ruolostaff,
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(ticket => {
            ticket.send({ embeds: [ticketopen], components: [chiudi] })
        })
    }
})



//CHIUDI TICKET
client.on("interactionCreate", async interaction => {
    if (interaction.customId == "chiudiTicket") {
        if (interaction.member.roles.cache.has(config.ruolostaff)) {
        await interaction.reply({ content: '**Il ticket verrà chiuso ed eliminato tra pochi secondi.**', ephemeral: true });
        const ticketto = interaction.channel;
        const transcript =  await discordTranscripts.createTranscript(ticketto, {fileName: interaction.channel.name+'.html'});
        setTimeout(function(){
        const logtranscript = client.channels.cache.get(config.canaletranscript)

        logtranscript.send({
            content: "**----- TRASCRIZIONE DEL TICKET `"+interaction.channel.name+"` -----**",
            files: [transcript]
        });

        interaction.channel.delete();
        return
    }, 3000);
   }
   if (!interaction.member.roles.cache.has(config.ruolostaff)) {
    await interaction.reply({ content: '**I ticket possono chiuderli sono gli staffer.**', ephemeral: true });
   }
  }
})


//FACIMM STI BOTTON
var bottonechiudi = new Discord.MessageButton()
.setLabel("Chiudi")
.setCustomId("chiudiTicket")
.setStyle("PRIMARY")
.setEmoji("🔒")


var buttonsupporto = new Discord.MessageButton()
.setLabel("Supporto")
.setCustomId("apriSupporto")
.setStyle("DANGER")
.setEmoji("💻")


var chiudi = new Discord.MessageActionRow()
.addComponents(bottonechiudi)

var ticketopen = new Discord.MessageEmbed()
.setTitle(config.nomeserver+" - Tickets")
.setFooter({ text: config.nomeserver, iconURL: config.logoserver })
.setColor(config.coloreserver)
.setDescription("**Hai aperto un ticket supporto !**")
.setThumbnail(config.logoserver)


