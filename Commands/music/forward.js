const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Forward seconds in a song.")
    .addIntegerOption(option => 
        option.setName('seconds')
        .setDescription('Account of seconds to forward. (10 = 10s)')
        .setMinValue(0)
        .setRequired(true)    
    ),
    async execute(interaction) {
        const {options, member, guild} = interaction;
        const seconds = options.getInteger('seconds');
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

                await queue.seek(queue.currentTime + seconds);
                embed.setColor("Green").setDescription(`⏩ Forwarded the song for \`${seconds}s\`.`);
                return interaction.reply({ embeds: [embed], ephemeral: false })
                
        } catch(err) {
            console.log(err)
            embed.setColor("Red").setDescription(`⛔| Something went wrong`);

            return interaction.reply({embeds: [embed], ephemeral: true})
        }   
    }
}