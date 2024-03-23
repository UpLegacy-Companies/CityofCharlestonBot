const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const warningSchema = require(`../../Schemas.js/warnSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`clearwarns`)
    .setDescription(`Clears a server memeber warnings.`)
    .addUserOption(option => option.setName('user').setDescription(`The user you want to clearwarns from.`).setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You dont have permissions to clearwarns people.", ephermal: true})

        const { options, guildId, user } = interaction;
        
        const target = options.getUser('user');

        const embed = new EmbedBuilder()
 
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag }, async (err, data) => {

            if (err) throw err;

            if (data) {
                await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: target.tag })

                embed.setColor("Green")
                .setDescription(`:white_check_mark: Sucess, ${target.tag}'s warnings have been reset.`)

                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ content: `${target.tag} has no warnings.`, ephermal: true})

            }
         
        });

      
    }
}