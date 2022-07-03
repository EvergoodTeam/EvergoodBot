const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomcolor')
		.setDescription('Sends a random color'),

	async execute(interaction) {

        const e1 = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription("h")
            
        const e2 = new MessageEmbed()
            .setColor(e1.color)
            .setTitle(`\`#${e1.color.toString(16).toUpperCase()}\``)
            
        await interaction.reply({ embeds: [e2], ephemeral: true });
	},
};