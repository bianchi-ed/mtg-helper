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
        const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;

        try {
            // Fetch data from the API
            const response = await axios.get(apiUrl);
            const data = response.data;

            // Check if the card has multiple faces
            if (data.card_faces && data.card_faces.length > 0) {
                // Construct the message for each face of the card
                const faceMessages = data.card_faces.map((face, index) => {
                    return [
                        `**Face ${index + 1}: ${face.name}**`,
                        face.mana_cost ? `Mana Cost: ${face.mana_cost}` : null,
                        face.type_line ? `Type: ${face.type_line}` : null,
                        (face.power && face.toughness) ? `Power/Toughness: ${face.power}/${face.toughness}` : null,
                        face.loyalty && face.loyalty !== 'N/A' ? `Loyalty: ${face.loyalty}` : null,
                        face.oracle_text ? `Text:\n${face.oracle_text}` : null
                    ]
                    .filter(Boolean)
                    .join('\n');
                }).join('\n\n'); // Separate each face's message with a double line break

                await interaction.reply(faceMessages);
            } else {
                // Single-faced card handling
                const message = [
                    `Card Name: ${data.name}`,
                    data.mana_cost ? `Mana Cost: ${data.mana_cost}` : null,
                    data.rarity ? `Rarity: ${data.rarity.charAt(0).toUpperCase() + data.rarity.slice(1)}` : null,
                    data.type_line ? `Type: ${data.type_line}` : null,
                    (data.power && data.toughness) ? `Power/Toughness: ${data.power}/${data.toughness}` : null,
                    data.loyalty && data.loyalty !== 'N/A' ? `Loyalty: ${data.loyalty}` : null,
                    data.oracle_text ? `Text:\n${data.oracle_text}` : null
                ]
                .filter(Boolean)
                .join('\n');

                await interaction.reply(message);
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.reply('There was an error fetching card data.');
        }
    },
};
