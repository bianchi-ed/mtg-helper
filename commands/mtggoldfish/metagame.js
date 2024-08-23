const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('metagame')
        .setDescription('Retrieve metagame archetypes from MTGGoldfish.')
        .addStringOption(option =>
            option.setName('format')
                .setDescription('Choose the format to fetch archetypes for')
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
        const url = `https://www.mtggoldfish.com/metagame/${format}/full#paper`;

        try {
            // Defer the reply to give more time for processing
            await interaction.deferReply();

            console.log(`Fetching the webpage for format: ${format}...`);
            const response = await axios.get(url);
            console.log('Webpage fetched successfully.');

            const $ = cheerio.load(response.data);
            const archetypes = [];

            // Remove unwanted elements before processing
            $('.subNav-menu-desktop').remove();

            // Process only the first 20 spans containing archetype information
            const archetypeLinks = $('span.deck-price-paper a').slice(0, 20).map((index, link) => {
                return {
                    archetypeName: $(link).text().trim(),
                    href: $(link).attr('href')
                };
            }).get();

            for (const archetype of archetypeLinks) {
                if (archetype.href && archetype.archetypeName) {
                    console.log(`Processing archetype: ${archetype.archetypeName} - ${archetype.href}`);
                    const archetypeUrl = `https://www.mtggoldfish.com${archetype.href}`;

                    // Fetch the archetype page to extract the link inside the "p.text-right"
                    const archetypePageResponse = await axios.get(archetypeUrl);
                    const archetypePage = cheerio.load(archetypePageResponse.data);

                    const archetypeLinkElement = archetypePage('p.text-right a');
                    const archetypeLink = archetypeLinkElement.attr('href');
                    
                    if (archetypeLink) {
                        const finalLink = `https://www.mtggoldfish.com${archetypeLink}`;
                        console.log(`Found final link for archetype ${archetype.archetypeName}: ${finalLink}`);
                        archetypes.push(`[${archetype.archetypeName}](${finalLink})`);
                    } else {
                        console.log(`No link found in p.text-right for archetype ${archetype.archetypeName}`);
                    }
                }
            }

            // Create Embed
            const initialEmbed = new EmbedBuilder()
                .setColor(0x2e2d2d)
                .setTitle(`${format.charAt(0).toUpperCase() + format.slice(1)} Top 20 Archetypes (Last 30 Days)`)
                .setDescription(archetypes.join('\n'))
                .setThumbnail('https://i.imgur.com/tUPkc2s.png')
                .setFooter({ text: `Source: MTGGoldfish` });

            // Send the initial embed
            await interaction.editReply({ embeds: [initialEmbed] });

        } catch (error) {
            console.error('Error scraping data from MTGGoldfish:', error);
            await interaction.editReply('There was an error fetching metagame archetypes.');
        }
    },
};
