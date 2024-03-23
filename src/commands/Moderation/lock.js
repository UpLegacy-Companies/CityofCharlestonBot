const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription(`Locks a given channel.`)
    .addChannelOption(option => option.setName('channel').setDescription(`Channel to lock.`).addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ contest: "Uhh you cant run this command.", ephemral: true})

        let channel = interaction.options.getChannel('channel');

       channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false})

       const embed = new EmbedBuilder()
       .setColor('Red')
       .setDescription(`:white_check_mark:  ${channel} has been **locked**.`)

       await interaction.reply({ embeds: [embed] })

    }
}