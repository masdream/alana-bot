const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Do a question')
        .addStringOption((option) => option.setName(`question`).setDescription(`Type de question`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {
        const question = interaction.options.getString(`question`);
        let responses = [
            "Yes",
            "No",
            "Maybe",
        ]
        const res = Math.floor(Math.random() * responses.length);

        const embed = new EmbedBuilder()
            .setTitle(`Question from ${interaction.user.username}`)
            .addFields(
                { name: `Question`, value: `${question}` },
                { name: `Response`, value: `${responses[res]}` }
            )
            .setColor('Blue')

        await interaction.reply({ embeds: [embed] })
    },
};