const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('fetch a servers icon'),
async execute(interaction, guild) {

    const servericon = interaction.guild.iconURL({ size: 1024})

    if (!servericon) return interaction.reply({ content: 'This server does not have an icon'});

    const icon= new EmbedBuilder()
    .setColor('Blue')
    .setTitle(`${interaction.guild.name}'s icon`)
    .setImage(servericon)

    await interaction.reply({ embeds: [icon] });
    }
};