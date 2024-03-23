const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const warningSchema = require(`../../Schemas.js/warnSchema`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`warn`)
    .setDescription(`Warns a server memeber`)
    .addUserOption(option => option.setName('user').setDescription(`The user you want to warn.`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for warning a user.`).setRequired(false)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You dont have permissions to warn people.", ephermal: true})

        const { options, guildId, user } = interaction;
        
        const target = options.getUser('user');
        const reason = options.getString('reason') || "No reason provided."

        const userTag = `${target.username}#${target.discriminator}`

        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {

            if (err) throw err;

            if (!data) {
                data = new warningSchema({
                    GuildID: guildId,
                    UserID: target.id,
                    UserTag: userTag,
                    Content: [
                        {
                        }
                    ],
                });

            } else {
                const warnContent = {
                    ExecuterId: user.id,
                    ExecuterTag: user.tag,
                    Reason: reason
                }
                data.Content.push(warnContent);
            }
            data.save()
        });

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:shield: You have recived a **warning** in ${interaction.guild.name} | ${reason}`)

        const embed2 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`:white_check_mark: ${target.tag} has been **warned** || ${reason}`)

        target.send({ embeds: [embed] }).catch(err => {
            return
        })

        interaction.reply({ embeds: [embed2] });
    }
}