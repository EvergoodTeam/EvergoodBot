const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Sends an customized Embed')
        .addStringOption(option => option.setName('title').setDescription('Title of the embed message').setRequired(true))
        .addStringOption(option => option.setName('desc').setDescription('Description of the embed message').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('Hex color of the embed message').setRequired(true))
        .addStringOption(option => option.setName('img').setDescription('Image displayed with the embed message'))
        .addBooleanOption(option => option.setName('ping').setDescription('Ping everyone'))
        .addRoleOption(option => option.setName('role').setDescription('Ping a specific role')),

    async execute(interaction) {
        if (interaction.memberPermissions.has('MANAGE_MESSAGES')) {
            const title = interaction.options.getString('title');
            const desc = interaction.options.getString('desc');
            const color = interaction.options.getString('color');
            const img = interaction.options.getString('img');
            const ping = interaction.options.getBoolean('ping');
            const role = interaction.options.getRole('role');

            const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(desc)
                .setColor(color)

            if (img != null) if (img.startsWith('http')) embed.setThumbnail(img);

            await interaction.deferReply();
            await interaction.deleteReply();

            await interaction.channel.send({ embeds: [embed] });

            if (ping) await interaction.channel.send({ content: '@everyone' });

            if (role != null) await interaction.channel.send({ content: `<@&${role.id}>` });

            //return;
        }
        else {
            await interaction.reply({ content: 'You do not have permission to execute this command', ephemeral: true });
        }
    },
};