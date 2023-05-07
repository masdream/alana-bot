const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, VoiceChannel, GuildEmoji, EmbedBuilder} = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip a song"),
    async execute(interaction) {
        const {options, member, guild, channel} = interaction;

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

                const queue = await client.distube.getQueue(voiceChannel);

                if(!queue) {
                    embed.setColor("Red").setDescription(`No Songs in the Queue `);
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }

                await queue.skip(voiceChannel);
                embed.setColor("Green").setDescription("⏩ The song has been skipped.");
                return await interaction.reply({ embeds: [embed], ephemeral: false })
                
        } catch(err) {
            console.log(err)
            embed.setColor("Red").setDescription(`⛔| Something went wrong`);

            return interaction.reply({embeds: [embed], ephemeral: true})
        }   
    }
}