const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('slap the user.')
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
            "https://media.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif",
            "https://media.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif",
            "https://gifdb.com/images/high/mad-anime-female-character-slap-0zljynqqf0gopfhg.gif",
            "https://i.pinimg.com/originals/68/d3/cd/68d3cd90baa448b24aebd79f40efad6c.gif",
            "https://gifdb.com/images/high/anime-fight-cute-slap-hacpf3xrbfj6vafv.gif",
            "https://media.tenor.com/AhfmR2RZrl0AAAAd/asuna-slap.gif",
            "https://media.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif",
            "https://media.tenor.com/FJsjk_9b_XgAAAAM/anime-hit.gif"
        ];

        let lista2 = [
            "https://media.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif",
            "https://media.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif",
            "https://gifdb.com/images/high/mad-anime-female-character-slap-0zljynqqf0gopfhg.gif",
            "https://i.pinimg.com/originals/68/d3/cd/68d3cd90baa448b24aebd79f40efad6c.gif",
            "https://gifdb.com/images/high/anime-fight-cute-slap-hacpf3xrbfj6vafv.gif",
            "https://media.tenor.com/AhfmR2RZrl0AAAAd/asuna-slap.gif",
            "https://media.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif",
            "https://media.tenor.com/FJsjk_9b_XgAAAAM/anime-hit.gif"
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new EmbedBuilder()
        .setTitle("| INFORMATION")
            .setDescription(`> **${interaction.user} he Slaped ${user}.**`)
            .setImage(`${random1}`)
            .setColor('#d1d7ea')

        let button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('abracar')
                    .setLabel('Slap back')
                    .setEmoji("1083183779318874165")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        let embed1 = new EmbedBuilder()
        .setTitle("<:krugneki:1083095742228471808> | INFORMATION")
            .setDescription(`> <:srce2:1083095715842109501> **${user} he Slaped back ${interaction.user}.**`)
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