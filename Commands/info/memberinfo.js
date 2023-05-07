const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js')
const { profileImage } = require('discord-arts');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('memberinfo')
    .setDescription("View your or any member's information.")
    .setDMPermission(false)
    .addUserOption((option) => option
        .setName('member')
        .setDescription('View a member information. Leave empty to view your own.')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const member = interaction.options.getMember('member') || interaction.member;

        if(member.user.bot) return interaction.editReply({
            embeds:
            [
                new EmbedBuilder().setDescription('At this moment, bots are not supported for this command.')
            ],
            ephemeral: true
        });

        try {
            const fetchedMembers = await interaction.guild.members.fetch();

            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, { new: 'profile.png' });

            const joinPosition = Array.from(fetchedMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys())
            .indexOf(member.id) + 1;

            const topRoles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role)
            .slice(0, 3)

            const userBadges = member.user.flags.toArray()

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp/ 1000);

            const Booster = member.premiumSince ? "<:discordboost7:1098506412914647050>" : "✖";

            const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} | General Information`, iconURL: member.displayAvatarURL() })
            .setColor(member.displayColor)
            .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild`)
            .setImage('attachment://profile.png')
            .addFields([
                { name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true},
                { name: "Bosster", value: `${Booster}`, inline: true},
                { name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`, inline: false },
                { name: "Created", value: `<t:${createdTime}:R>`, inline: true },
                { name: "Joined", value: `<t:${joinTime}:R>`, inline: true },
                { name: "Identifiter", value: `${member.id}`, inline: false },
                { name: "Avatar", value: `[Link](${member.displayAvatarURL()})`, inline: true },
                { name: "Banner", value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true },
            ]);
        
            interaction.editReply({embeds: [embed], files: [imageAttachment]});
        } catch (error) {
            interaction.editReply({content: "An error occured: Contact The Developer"});
            throw error;
        }
    }
}

function addSuffix(number) {
    if(number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

    switch(number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
    }
    return number + "th";
}

function addBadges(badgeNames) {
    if(!badgeNames.length) return ["X"];
    const badgeMap = {
        "ActiveDeveloper": "<:activedeveloper:1098506410951716904>",
        "BugHunterLevel1": "<:discordbughunter1:1098506420229509171>",
        "BugHunterLevel2": "<:discordbughunter2:1098506428752347146>",
        "PremiumEarlySupporter": "<:discordearlysupporter:1098506432049074199>",
        "Partner": "<:discordpartner:1098506441209413634>",
        "Staff": "<:discordstaff:1098506443386269767>",
        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1098506450759843900>", // bravery
        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1098506452798279690>", // brilliance
        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1098506446909481112>", // balance
        "Hypesquad": "<:hypesquadevents:1098506456065642576>",
        "CertifiedModerator": "<:discordmod:1098506434519502938>",
        "VerifiedDeveloper": "<:discordbotdev:1098506416664367244>",
    };
  
    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
}