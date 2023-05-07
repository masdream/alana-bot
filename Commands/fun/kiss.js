const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('kiss the user.')
    .addUserOption((option) => 
    option.setName('user')
    .setDescription('the user you want to kiss.')
    .setRequired(true)
    ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')

        let lista1 = [
            'https://media.tenor.com/jnndDmOm5wMAAAAC/kiss.gif',
            'https://media.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif',
            'https://gifdb.com/images/high/surprising-anime-kiss-togashi-yuuta-q5960hphr79b0rwy.gif',
            'https://www.gifcen.com/wp-content/uploads/2022/03/anime-kiss-gif-5.gif',
            'https://thumbs.gfycat.com/AdeptHelpfulKitty-size_restricted.gif'
        ];

        let lista2 = [
            'https://media0.giphy.com/media/QGc8RgRvMonFm/giphy.gif',
            'https://www.gifcen.com/wp-content/uploads/2022/03/anime-kiss-gif-8.gif',
            'https://i.pinimg.com/originals/13/06/73/1306732d3351afe642c9a7f6d46f548e.gif',
            'https://steamuserimages-a.akamaihd.net/ugc/775102481299732831/2DC63FCFACDE35CEFB3C88B646110B54252489AC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            'https://animesher.com/orig/1/157/1572/15720/animesher.com_gif-anime-kiss-1572052.gif'
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new EmbedBuilder()
        .setTitle("| INFORMATION")
            .setDescription(`> **${interaction.user} he kissed ${user}.**`)
            .setImage(`${random1}`)
            .setColor('#d1d7ea')

        let button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('abracar')
                    .setLabel('Kiss back')
                    .setEmoji("1083183779318874165")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        let embed1 = new EmbedBuilder()
        .setTitle("<:krugneki:1083095742228471808> | INFORMATION")
            .setDescription(`> <:srce2:1083095715842109501> **${user} he kissed back ${interaction.user}.**`)
            .setColor('#d1d7ea')
            .setImage(`${random2}`);

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === 'abracar' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {

                if (i.customId === 'abracar') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })


    },
};