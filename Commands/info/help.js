const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of all the commands form the discord bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    async execute(interaction) {

        const { client, user } = interaction;

        const helpcommandEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.avatarURL()})
        .setColor("#00ffff")
        .setImage('https://share.creavite.co/mUL3IG0aY9ZTcSkY.gif')
        .setDescription(`Welcome Back${user}!\nBerikut adalah daftar command yang tersedia.\nUntuk info lebih lanjut, gunakan \`/help [command]\`\n\n❯ **MODERATION**\n\`clear\` \`setup-welcome\` \`ban\` \`unban\` \`kick\` \`mute\` \`unmute\` \`createverify\` \`embed-builder\` \`send-changelogs\` \`dm\`\n\n❯ **FUNNY**\n\`8ball\` \`avatar\` \`coin-flip\` \`confess\` \`hug\` \`kiss\` \`quotes\` \`slap\` \`tweet\`\n\n❯ **INFORMATION**\n\`botinfo\` \`help\` \`memberinfo\` \`serverinfo\` \`report-bug\` \`ping\` \`changelogs\`\n\n❯ **MUSIC**\n\`play\` \`pause\` \`queue\` \`resume\` \`skip\` \`stop\` \`volume\` \`forward\` \`loop\` \`nowplaying\` \`rewind\` \`shuffle\`\n\n❯ **ECONOMY**\n\`economy-deposit\` \`economy-withdraw\` \`economy-create\` \`economy-delete\` \`economy-balance\`\n\n❯ **GIVEAWAY**\n\`giveaway-start\` \`giveaway-edit\` \`giveaway-end\` \`giveaway-reroll\``)
        .setFooter({ text: `⭐⭐⭐` })
        .addFields(
          { name: 'Links', value: `[Support Server](https://discord.gg/AJsMAPQnrR) 🔹 [Donation](https://discord.gg/AJsMAPQnrR)`, inline: true },
        )

      interaction.reply({ embeds: [helpcommandEmbed] });
    },
};