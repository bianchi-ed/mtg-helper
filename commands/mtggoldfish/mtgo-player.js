const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mtgo-player')
        .setDescription('Search for a Magic: The Gathering Online player recent events.')
        .addStringOption(option =>
            option
                .setName('nickname')
                .setDescription('MTGO Nickname')
                .setRequired(true)
        ),

    async execute(interaction) {
        const nickname = interaction.options.getString('nickname');
        const playerUrl = `https://www.mtggoldfish.com/player/${encodeURIComponent(nickname)}`;

        try {
            // Fetch the player's page
            const response = await axios.get(playerUrl);
            const html = response.data;
            const $ = cheerio.load(html);

            // Find the table with class "table table-sm table-striped table-bordered"
            const events = [];
            $('table.table.table-sm.table-striped.table-bordered tbody tr').each((index, element) => {
                const date = $(element).find('td:nth-child(1)').text().trim();
                const position = $(element).find('td.text-right').first().text().trim();
                const eventAnchor = $(element).find('td:nth-child(2) a');
                const eventName = eventAnchor.text().trim();
                const eventLink = eventAnchor.attr('href');
                const deckAnchor = $(element).find('td:nth-child(4) a');
                const deckName = deckAnchor.text().trim();
                const deckLink = deckAnchor.attr('href');
                const price = $(element).find('td.text-right').eq(2).text().trim();

                if (eventName && eventLink && date && position && deckName && deckLink && price) {
                    events.push(`**Event:** [${eventName}](https://www.mtggoldfish.com${eventLink})\n**Deck:** [${deckName}](https://www.mtggoldfish.com${deckLink})\n**Date:** ${date}\n**Position:** ${position}\n**Price:** ${price}`);
                }
            });

            // Limit to the first 5 events
            const limitedEvents = events.slice(0, 5);

            // Create embed
            const embed = new EmbedBuilder()
                .setColor(0x2e2d2d)
                .setTitle(`Recent Events Played by ${nickname}`)
                .setDescription(limitedEvents.length > 0 ? limitedEvents.join('\n\n') : 'No events found.')
                .setThumbnail('https://i.imgur.com/tUPkc2s.png')
                .setFooter({ text: 'Source: MTGGoldfish' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error scraping data from MTGGoldfish:', error);
            await interaction.reply('There was an error fetching player data.');
        }
    },
};
