const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('legality')
        .setDescription('Retrieve the legality of a Magic: The Gathering card in selected formats.')
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

        // Define the formats you are interested in
        const interestedFormats = ['standard', 'pioneer', 'modern', 'legacy', 'pauper', 'vintage'];

        try {
            // Fetch data from the API
            const response = await axios.get(apiUrl);
            const data = response.data;

            // Check if the card was found
            if (data) {
                const legalities = data.legalities; // Extract legalities info

                // Construct the legality text
                const legalityText = interestedFormats
                    .map(format => {
                        if (legalities[format]) {
                            return `**${format.charAt(0).toUpperCase() + format.slice(1)}:** ${legalities[format].charAt(0).toUpperCase() + legalities[format].slice(1)}`;
                        }
                        return null;
                    })
                    .filter(Boolean) // Remove null values
                    .join('\n');

                // Create the embed
                const embed = new EmbedBuilder()
                    .setColor(0x2e2d2d)
                    .setTitle(`${data.name}`)
                    .setThumbnail(data.image_uris.art_crop)
                    .setDescription(legalityText)
                    .setFooter({ text: 'Source: Scryfall' });

                // Send the embed
                await interaction.reply({ embeds: [embed] });

            } else {
                await interaction.reply('No card found matching your query.');
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.reply('There was an error fetching card legality data.');
        }
    },
};
