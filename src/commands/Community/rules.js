const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`rules`)
    .setDescription('Posts server rules.'),
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle('City of Charleston Rules')
        .setDescription('Please read below to learn the rules of the City of Charleston Associated Game, Servers, and Communities.')
        .setThumbnail('https://imgs.search.brave.com/2h1T-rC7XjYceO_WbbSyGFfLm1Fdgk4RbBdrMMrOApg/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/bXV6NkdzbHlCRnlC/bjhlbHF3bVlBSGFI/YSZwaWQ9QXBp')
        .addFields({ name: "Community Rules", value: "1. No racism, or hate towards any other memeber. | 2. Be kind, and have fun. | 3. Use Common Sense.", inline: true})
        .addFields({ name: "Discord Rules", value: "1. No hacking, or cheating. | 2. No abusing roles, or attempting to glitch into unauthorized areas. | 3. Follow all Discord TOS. | 4. No harrasment.", inline: true})
        .addFields({ name: "Appealing Moderation Action", value: "Please follow the Chain of Command to appeal an action, or use the support command.", inline: true})
        .setTimestamp()
        .setFooter({ text: "City of Charleston Munipal Government" })

        await interaction.reply({ embeds: [embed]})
    }

}