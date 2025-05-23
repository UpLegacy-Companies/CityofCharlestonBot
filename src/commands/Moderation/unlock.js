const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription(`Unlocks a given channel.`)
    .addChannelOption(option => option.setName('channel').setDescription(`Channel to unlock.`).addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ contest: "Uhh you cant run this command.", ephemral: true})

        let channel = interaction.options.getChannel('channel');

       channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true})

       const embed = new EmbedBuilder()
       .setColor('Green')
       .setDescription(`:white_check_mark:  ${channel} has been **unlocked**.`)

       await interaction.reply({ embeds: [embed] })

    }
}