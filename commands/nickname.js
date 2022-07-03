const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Sets a nickname for the specified user')
        .addStringOption(option => option.setName('nickname').setDescription('Nickname to set').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('User to which set the nickname').setRequired(true)),

    async execute(interaction) {
        if (interaction.memberPermissions.has('MANAGE_NICKNAMES')) {
            const nickname = interaction.options.getString('nickname')
            const user = interaction.options.getUser('user')

            interaction.guild.members.cache.get(user.id).setNickname(nickname)

            await interaction.reply({ content: `Set \`${nickname}\` as the nickname for ${user}`, ephemeral: true})
        }
        else {
            await interaction.reply({ content: 'You do not have permission to execute this command', ephemeral: true });
        }
    },
};