const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('card')
        .setDescription('Search for a Magic: The Gathering card.')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Card Name')
                .setRequired(true)
        ),

    async execute(interaction) {
        const cardName = interaction.options.getString('name');
        const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;

        try {
            // Fetch data from the API
            const response = await axios.get(apiUrl);
            const data = response.data;

            // Check if the card has multiple faces
            if (data.card_faces && data.card_faces.length > 0) {
                // Construct an array of image URLs for each face
                const imageUrls = data.card_faces.map(face => face.image_uris.border_crop);

                // Send the first face image as a reply
                await interaction.reply({ files: [imageUrls[0]] });

                // Send the rest of the images as follow-ups
                for (let i = 1; i < imageUrls.length; i++) {
                    await interaction.followUp({ files: [imageUrls[i]] });
                }
            } else if (data.image_uris && data.image_uris.border_crop) {
                // Single-faced card: reply with the card image
                await interaction.reply({ files: [data.image_uris.border_crop] });
            } else {
                await interaction.reply('No card image found matching your query.');
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            if (!interaction.replied) {
                await interaction.reply('There was an error fetching card data.');
            } else {
                await interaction.followUp('There was an error fetching card data.');
            }
        }
    },
};
