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
        const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;

        try {
            await interaction.deferReply(); // Defer the initial reply

            //API call
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (data.card_faces && data.card_faces.length > 0) {
                // Double-faced card
                for (const face of data.card_faces) {
                    const flavorText = face.flavor_text || 'No flavor text available for this face.';
                    
                    const embed = new EmbedBuilder()
                        .setColor(0x2e2d2d)
                        .setTitle(`${face.name}`)
                        .setThumbnail(face.image_uris.art_crop)
                        .setDescription(flavorText)
                        .setFooter({ text: 'Source: Scryfall' });
                    
                    await interaction.followUp({ embeds: [embed] });
                }
            } else {
                // Single-faced card
                const flavorText = data.flavor_text || 'No flavor text available for this card.';
                
                const embed = new EmbedBuilder()
                    .setColor(0x2e2d2d)
                    .setTitle(`${data.name}`)
                    .setThumbnail(data.image_uris.art_crop)
                    .setDescription(flavorText)
                    .setFooter({ text: 'Source: Scryfall' });

                await interaction.followUp({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error fetching data from Scryfall API:', error);
            await interaction.followUp('There was an error fetching card flavor text.');
        }
    },
};
