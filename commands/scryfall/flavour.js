const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flavor')
        .setDescription('Retrieve the flavor text of a Magic: The Gathering card.')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Card Name')
                .setRequired(true)
        ),

    async execute(interaction) {
        const cardName = interaction.options.getString('name');
        // Update the API URL with the new endpoint
        const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;

        try {
            // Fetch data from the API
            const response = await axios.get(apiUrl);
            const data = response.data;

            // Check if the card was found
            if (data) {
                const flavorText = data.flavor_text || 'No flavor text available for this card.';

                // Create the embed
                const embed = new EmbedBuilder()
                    .setColor(0x2e2d2d)
                    .setTitle(`${data.name}`)
                    .setThumbnail(data.image_uris.art_crop)
                    .setDescription(flavorText)
                    .setFooter({ text: 'Source: Scryfall' });

                // Send the embed
                await interaction.reply({ embeds: [embed] });

            } else {
                await interaction.reply('No card found matching your query.');
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.reply('There was an error fetching card flavor text.');
        }
    },
};
