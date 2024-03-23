const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('The help command for Charleston.'),
    async execute (interaction, client) {

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Help Center')
        .setDescription('Help Page Guide')
        .addFields({ name: "Page 1", value: "Help & Community Resources Page"})
        .addFields({ name: "Page 2", value: "Community Commands"})
        .addFields({ name: "Page 3", value: "Moderation"})

        const embed2 = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Community Commands')
        .addFields({ name: "/help", value: "Do help for support."})
        .addFields({ name: "/invites", value: "View invites"})
        .addFields({ name: "/help", value: "Do help for support."}) 
        .addFields({ name: "/test", value: "Do /test to check if the bot is online."})
        .setFooter({ text: "Community Commands"})
        

        const embed3 = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Moderation')
        .addFields({ name: "/kick", value: "Do help for support."})
        .addFields({ name: "/warn", value: "View invites"})
        .addFields({ name: "/clearwarns", value: "Do help for support."}) 
        .addFields({ name: "/delwarns", value: "Do /test to check if the bot is online."})
        .setFooter({ text: "Moderation Commands"})


        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('page 1')
            .setLabel('Page 1')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page 2')
            .setLabel('Page 2')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page 3')
            .setLabel('Page 3')
            .setStyle(ButtonStyle.Success)

        )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page 1') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use the buttons. Run /help for your own menu.`, ephemeral: true})
                 }
                await i.update({ embeds: [embed], components: [button] })
                }

                if (i.customId === 'page 2') {
                    if (i.user.id !== interaction.user.id) {
                        return await i.reply({ content: `Only ${interaction.user.tag} can use the buttons. Run /help for your own menu.`, ephemeral: true})
                     }
                    await i.update({ embeds: [embed2], components: [button] })
                    }

                if (i.customId === 'page 3') {
                    if (i.user.id !== interaction.user.id) {
                        return await i.reply({ content: `Only ${interaction.user.tag} can use the buttons. Run /help for your own menu.`, ephemeral: true})
                    }
                    await i.update({ embeds: [embed3], components: [button] })
                }
          
        })
    }
}