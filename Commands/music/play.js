const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, VoiceChannel, GuildEmoji, EmbedBuilder} = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption(option => 
            option.setName("query")
            .setDescription("Provide the name or URL of the song")
            .setRequired(true)
    ),
    async execute(interaction) {
        const {options, member, guild, channel} = interaction;

        const query = options.getString("query");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel) {
            embed.setColor("Red").setDescription("You must be in a voice channel to execute these commands");
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        if(!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`You cant use the player because it is active in another channel in <#${guild.members.me.voice.channelId}> `);
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        try {
            client.distube.play(voiceChannel, query, { textChannel: channel, member: member })
            await interaction.reply({ content: "Added song to the playlist! 🎶" })

        } catch(err) {
            console.log(err)
            embed.setColor("Red").setDescription(`⛔| Something went wrong`);

            return interaction.reply({embeds: [embed], ephemeral: true})
        }   
    }
}