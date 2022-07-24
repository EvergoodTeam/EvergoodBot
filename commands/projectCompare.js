const axios = require('axios').default;

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('projectcompare')
		.setDescription('Compares dependencies between 2 project manifests')
        .addAttachmentOption(option => option.setName('manifest1').setDescription('First manifest').setRequired(true))
        .addAttachmentOption(option => option.setName('manifest2').setDescription('Second manifest').setRequired(true)),

	async execute(interaction) {

        const manifest1 = interaction.options.getAttachment('manifest1');
        var files1;
        var manifest1array = [];

        const manifest2 = interaction.options.getAttachment('manifest2');
        var files2;
        var manifest2array = [];

        await axios.get(manifest1.attachment)
            .then(function (response) {
                //console.log(response.data.files);
                files1 = response.data.files;

                files1.forEach(element => manifest1array.push(element.projectID));
            })
            .catch(function (error) {
                console.log(error);
            });
        
        await axios.get(manifest2.attachment)
            .then(function (response) {
                //console.log(response.data.files);
                files2 = response.data.files;

                files2.forEach(element => manifest2array.push(element.projectID));
            })
            .catch(function (error) {
                console.log(error);
            });
        
        let missingInOne = manifest2array.filter(x => !manifest1array.includes(x));
        let missingInTwo = manifest1array.filter(x => !manifest2array.includes(x));

        const embed1 = new MessageEmbed()
            .setTitle('Projects missing from the first manifest:')
            .setDescription(missingInOne.join(', '))
            .setColor('#5865F2')

        const embed2 = new MessageEmbed()
            .setTitle('Projects missing from the second manifest:')
            .setDescription(missingInTwo.join(', '))
            .setColor('#5865F2')

		await interaction.reply({ embeds: [embed1, embed2], ephemeral: true});
	},
};