const Curseforge = require("node-curseforge")

let cf = new Curseforge.default(process.env.API_KEY);

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('project')
		.setDescription('Fetches information on a Curseforge Project')
        .addIntegerOption(option => option.setName('id').setDescription('Project ID').setRequired(true)),

	async execute(interaction) {

        let mod = await cf.get_mod(interaction.options.getInteger('id'));

        var date = mod.dateModified.toString()
        var split = date.split(" ")
        var last = `${split[1]} ${split[2]} ${split[3]} ${split[4]}`

        const argsEmbed = new MessageEmbed()
            .setTitle(mod.name)
            .setDescription(mod.summary)
            .setThumbnail(mod.logo.thumbnailUrl)
            .setColor('RANDOM')
            .addFields(
                { name: 'Link', value: `${mod.links.websiteUrl}`},
                { name: `Downloads`, value: `\`${mod.downloadCount.toLocaleString()}\``, inline: true},
                { name: `Last Update`, value: `\`${last}\``, inline: true})

		await interaction.reply({ embeds: [argsEmbed], ephemeral: true});
	},
};