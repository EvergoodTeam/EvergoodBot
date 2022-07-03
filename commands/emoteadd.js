const { MessageEmbed, DiscordAPIError } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emoteadd')
		.setDescription('Adds an emote to the current server')
        .addStringOption(option => option.setName('link').setDescription('Link to the emote').setRequired(true))
        .addStringOption(option => option.setName('name').setDescription('Name for the emote').setRequired(true)),

	async execute(interaction) {

        const url = interaction.options.getString('link');
        const name = interaction.options.getString('name');

        try{
            await interaction.guild.emojis.create(url, name);
        }
        catch(e){
            if(e instanceof DiscordAPIError){
                return await interaction.reply({content: 'File is too big to be an emote!', ephemeral: true})
            }
            else{
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
        
        const emote = interaction.guild.emojis.cache.find(emoji => emoji.name == name)
        const response = new MessageEmbed()

        if(url.includes(".gif")) response.setDescription(`Added ${url} as \`${name}\` <a:${name}:${emote.id}>`)
        else response.setDescription(`Added ${url} as \`${name}\` <:${name}:${emote.id}>`)

        await interaction.reply({ embeds: [response] });
	},
};