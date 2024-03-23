const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`purge`)
    .setDescription(`Deletes specified channel messages`)
    .addIntegerOption(option => option.setName(`amount`).setDescription(`Number of messages to purge.`).setMinValue(10).setMaxValue(100).setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: "Uh oh. Looks like you dont have permissions to run this command.", ephemral: true})

        let number = interaction.options.getInteger('amount');

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`:white_check_mark: Deleted ${number} messages.`)

        await interaction.channel.bulkDelete(number)

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('purge')
            .setEmoji('🗑')
            .setStyle(ButtonStyle.Primary),
        ) 

        const message = await interaction.reply({ embeds: [embed], components: [button] });

        const collector = message.createMessageComponentCollector();

        collector.on("collect", async i => {
            if (i.CustomId === 'purge') {
                if (!i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;


                interaction.deleteReply();
            }
         })
    }
}