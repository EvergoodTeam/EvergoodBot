const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ms')
		.setDescription('Checks ping'),

	async execute(interaction) {

        var ping1 = Date.now() - interaction.createdTimestamp;
        var ping2 = Math.round(interaction.client.ws.ping);

        if ((ping1 > 70 & ping1 < 100) || (ping2 > 70 & ping2 < 100)) var color = "#ffdb00";
        else if (ping1 >= 100 || ping2 >= 100) var color = "#ff4000";
        else var color = "#00CD00";

        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Latency is ${ping1}ms. 🏓 \nAPI Latency is ${ping2} ms.`)
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};