const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournaments')
        .setDescription('Fetch tournament data from mtggoldfish')
        .addStringOption(option =>
            option.setName('format')
                .setDescription('Choose the format to fetch data for')
                .setRequired(true)
                .addChoices(
                    { name: 'Modern', value: 'modern' },
                    { name: 'Pioneer', value: 'pioneer' },
                    { name: 'Pauper', value: 'pauper' },
                    { name: 'Standard', value: 'standard' },
                    { name: 'Legacy', value: 'legacy' },
                    { name: 'Vintage', value: 'vintage' }
                )),

    async execute(interaction) {
        const format = interaction.options.getString('format');
        const url = `https://www.mtggoldfish.com/tournaments/${format}#paper`;

        try {
            // Fetch HTML of the page
            const { data } = await axios.get(url);

            // Load HTML into cheerio
            const $ = cheerio.load(data);

            // Select all <h4> tags and extract <a> tags inside them
            const results = [];
            $('h4 a').each((_, a) => {
                const href = $(a).attr('href');
                const text = $(a).text().trim(); // Get text inside the <a> tag
                if (href && text) {
                    // Format event name with the URL as a clickable link
                    results.push(`[${text}](https://www.mtggoldfish.com${href})`);
                }
            });

            // Create embed
            const embed = new EmbedBuilder()
                .setColor(0x2e2d2d)
                .setTitle(`Recent ${format.charAt(0).toUpperCase() + format.slice(1)} Events`)
                .setDescription(results.length > 0 ? results.join('\n') : 'No links or information found.')
                .setThumbnail('https://i.imgur.com/tUPkc2s.png')
                .setFooter({ text: 'Source: MTGGoldfish' });

            // Send embed
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('An error occurred while scraping the page:', error);
            await interaction.reply('There was an error trying to scrape the links.');
        }
    },
};
