const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('hug the user.')
    .addUserOption((option) => 
    option.setName('user')
    .setDescription('the user you want to hug.')
    .setRequired(true)
    ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')

        let lista1 = [
            "https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif",
            "https://i.gifer.com/2QEa.gif",
            "https://gifdb.com/images/high/anime-hug-date-a-live-z8yqrk7wlwo3v8ql.gif",
            "https://media.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif",
            "https://i.pinimg.com/originals/b6/2f/04/b62f047f8ed11b832cb6c0d8ec30687b.gif",
            "https://media.tenor.com/iyztKN68avcAAAAM/aharen-san-aharen-san-anime.gif",
            "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-55.gif"
        ];

        let lista2 = [
            "https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif",
            "https://i.gifer.com/2QEa.gif",
            "https://gifdb.com/images/high/anime-hug-date-a-live-z8yqrk7wlwo3v8ql.gif",
            "https://media.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif",
            "https://i.pinimg.com/originals/b6/2f/04/b62f047f8ed11b832cb6c0d8ec30687b.gif",
            "https://media.tenor.com/iyztKN68avcAAAAM/aharen-san-aharen-san-anime.gif",
            "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-55.gif"
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new EmbedBuilder()
        .setTitle("| INFORMATION")
            .setDescription(`> **${interaction.user} he huged ${user}.**`)
            .setImage(`${random1}`)
            .setColor('#d1d7ea')

        let button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('abracar')
                    .setLabel('Hug back')
                    .setEmoji("1083183779318874165")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        let embed1 = new EmbedBuilder()
        .setTitle("| INFORMATION")
            .setDescription(`> **${user} he huged back ${interaction.user}.**`)
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