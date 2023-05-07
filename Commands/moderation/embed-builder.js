const { SlashCommandBuilder, EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed-builder")
        .setDescription("Membuat pesan embed")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {

        let Modal = new ModalBuilder()
            .setCustomId('report')
            .setTitle('Buat pesan embed')

        let question1 = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Judul pesan embed')
            .setRequired(false)
            .setPlaceholder('Ketik disini... (opsional)')
            .setStyle(TextInputStyle.Short)

        let question2 = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("Deskripsi pesan embed")
            .setRequired(true)
            .setPlaceholder('Ketik disini...')
            .setStyle(TextInputStyle.Paragraph)

        let question3 = new TextInputBuilder()
            .setCustomId('color')
            .setLabel('Warna pesan embed')
            .setRequired(false)
            .setPlaceholder('Gunakan format hex: #00FF00')
            .setStyle(TextInputStyle.Short)

        let question4 = new TextInputBuilder()
            .setCustomId('footer')
            .setLabel('Footer pesan embed')
            .setRequired(false)
            .setPlaceholder('Ketik disini... (opsional)')
            .setStyle(TextInputStyle.Short)

        let question5 = new TextInputBuilder()
            .setCustomId('imageUrl')
            .setLabel('URL Gambar pesan embed')
            .setRequired(false)
            .setPlaceholder('Ketik disini... (opsional)')
            .setStyle(TextInputStyle.Short)

        let ActionRow1 = new ActionRowBuilder().addComponents(question1);
        let ActionRow2 = new ActionRowBuilder().addComponents(question2);
        let ActionRow3 = new ActionRowBuilder().addComponents(question3);
        let ActionRow4 = new ActionRowBuilder().addComponents(question4);
        let ActionRow5 = new ActionRowBuilder().addComponents(question5);

        Modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5)

        await interaction.showModal(Modal)

        try {

            let reponse = await interaction.awaitModalSubmit({ time: 300000 })

            let title = reponse.fields.getTextInputValue('title')
            let description = reponse.fields.getTextInputValue('description')
            let color = reponse.fields.getTextInputValue('color')
            let footer = reponse.fields.getTextInputValue('footer')
            let imageUrl = reponse.fields.getTextInputValue('imageUrl')

            const Embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`:grey_exclamation: **Pesan embed berhasil dikirim**`)

            if (!color) color = "Blue"
            if (!footer) footer = ' '
            if (!title) title = ' '
            if (!description) description = ' '

            let Embed1 = new EmbedBuilder()
                .setColor(`${color}`)
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setFooter({ text: `${footer}` })

                if (imageUrl) {
                    Embed1.setImage(imageUrl)
                }
            
            await interaction.channel.send({ embeds: [Embed1] })

            await reponse.reply({ embeds: [Embed], ephemeral: true })

        } catch (err) { return; }
    }
}