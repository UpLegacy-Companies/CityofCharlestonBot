const { SlashCommandBuilder, EmbedAssertions } = require(`@discordjs/builders`);
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const warningSchema = require(`../../Schemas.js/warnSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`checkwarns`)
    .setDescription(`Gets a members warnings.`)
    .addUserOption(option => option.setName('user').setDescription(`The user you want to check the warns of.`).setRequired(true)),
    async execute(interaction) {

        const { options, guildId, user } = interaction;
        
        const target = options.getUser('user');

        const embed = new EmbedBuilder()
        const noWarns = new EmbedBuilder

        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag }, async (err, data) => {

            if (err) throw err;

            if (data) {
                embed.setColor("Yellow")
                .setDescription(`:shield: ${target.tag}'s warnings. \n${data.Content.map(
                    (w, i) => 
                        `
                            **Warning**: ${i + 1}
                            **Moderator**: ${w.ExecutorTag}
                            **Reason**: ${w.Reason}
                        `
                    ).join(`-`)}`)

                interaction.reply({ embeds: [embed ]});
            } else { 
                noWarns.setColor("Green")
                .setDescription(`:white_check_mark: ${target} has **no** warnings!`)

                interaction.reply({ embeds: [noWarns]})
         
            }
        });


    }
}