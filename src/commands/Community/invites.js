const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, InteractionCollector } = require(`discord.js`);

module.exports = {

    data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Get the number of server invites a user has.')
    .addUserOption(option => option.setName('user').setDescription('The user you want to get the invites of.').setRequired(true)),
    async execute(interaction, message) {
        const user = interaction.options.getUser('user');
        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new EmbedBuilder ()
        .setColor("Purple")
        .setDescription(`:white_check_mark:  ${user.tag} has **${i}** invites.`)

        await interaction.reply({ embeds: [embed] });

    }

}