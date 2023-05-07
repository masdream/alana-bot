const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Untuk melihat tentang bot dan pemilik bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    async execute(interaction) {

        const { client, user } = interaction;

        const aboutmeEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.avatarURL()})
        .setColor("#00ffff")
        .setImage('https://share.creavite.co/mUL3IG0aY9ZTcSkY.gif')
        .setDescription(`**Alana** is a multiple functional bot that developed by **Natz** from **WARGA +62** server. This bot is created since 10th June 2023. This bot have many rich commands such as Stable Music, Global Economy, Leveling, Fun, Reaction, and lots more!\n❯ **Main Developer**\n\`[•]\`**[Natz](https://github.com/venusally)**`)
        .setFooter({ text: `💖💖💖` })
        .addFields(
          { name: 'Links', value: `[Support Server](https://discord.gg/AJsMAPQnrR) 🔹 [Donation](https://discord.gg/AJsMAPQnrR)`, inline: true },
        )

      interaction.reply({ embeds: [aboutmeEmbed] });
    },
};