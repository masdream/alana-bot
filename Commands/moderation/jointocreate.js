const { SlashCommandBuilder, Client, PermissionFlagsBits, ChannelType, GuildVoice } = require("discord.js");
const schema = require("../../Models/jointocreate")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setjointocreate")
    .setDescription("Setup the join to create system.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption(option =>
    option.setName("channel")
          .setDescription("Channel of the join to create system.")
          .addChannelTypes(ChannelType.GuildVoice)
          .setRequired(true)
    )
    .addNumberOption(option =>
    option.setName("userlimit")
          .setDescription("The userlimit of every join to create channel.")
          .setMinValue(1)
          .setMaxValue(99)
          .setRequired(true)
    ),
    
    async execute(interaction) {
    await interaction.deferReply();
        await wait(4000);
        const { guild, options } = interaction;
        const channel = options.getChannel("channel")
        const userlimit = options.getNumber("userlimit")

        let data = schema.findOne({ Guild: interaction.guild.id })
        if (!data) {
            data = new schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                UserLimit: userlimit
            })
            data.save();
		 await interaction.editReply({ content: `The join to create system was setted up successfully.`, ephemeral: true });
        } else {
           await interaction.editReply({ content: `Your system is aldready setup!`, ephermal: true});
        }
}
}