const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('card-text-only')
        .setDescription('Search for a Magic: The Gathering card information (Text Only).')
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
                // Construct the text message conditionally
                const message = [
                    `Card Name: ${data.name}`,
                    data.mana_cost ? `Mana Cost: ${data.mana_cost}` : null,
                    data.rarity ? `Rarity: ${data.rarity.charAt(0).toUpperCase() + data.rarity.slice(1)}` : null,
                    data.type_line ? `Type: ${data.type_line}` : null,
                    (data.power && data.toughness) ? `Power/Toughness: ${data.power}/${data.toughness}` : null,
                    data.loyalty && data.loyalty !== 'N/A' ? `Loyalty: ${data.loyalty}` : null,
                    data.oracle_text ? `Text:\n${data.oracle_text}` : null
                ]
                .filter(Boolean) // Remove null or undefined entries
                .join('\n');

                // Send the text message
                await interaction.reply(message);

            } else {
                await interaction.reply('No card found matching your query.');
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.reply('There was an error fetching card data.');
        }
    },
};
