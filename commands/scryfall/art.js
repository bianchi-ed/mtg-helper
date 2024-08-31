const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('art')
        .setDescription('Fetches the full art of a Magic: The Gathering card.')
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
            // Log the API URL
            console.log(`Fetching card data from URL: ${apiUrl}`);

            // Fetch data from the API
            const response = await axios.get(apiUrl);

            // Log the raw response body
            console.log('API response body:', response.data);

            const data = response.data;

            // Check if the card was found
            if (data) {
                // Prepare the reply
                const replyContent = `**${data.name}** by ${data.artist}`;
                const replyFiles = [data.image_uris.art_crop];

                // Log the content that will be sent
                console.log('Reply content:', replyContent);
                console.log('Reply files:', replyFiles);

                // Send the reply with both content and image
                await interaction.reply({ content: replyContent, files: replyFiles });
            } else {
                console.log('No card found matching the query.');
                await interaction.reply('No card found matching your query.');
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.reply('There was an error fetching card data.');
        }
    },
};
