const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mtggoldfish-articles')
        .setDescription('Fetch recent articles from MTGGoldfish'),

    async execute(interaction) {
        const url = 'https://www.mtggoldfish.com/articles';

        try {
            // Fetch HTML of the page
            const { data } = await axios.get(url);

            // Load HTML into cheerio
            const $ = cheerio.load(data);

            // Collect article data
            const articles = [];
            $('.article-tile').each((_, element) => {
                const imageElement = $(element).find('.article-tile-image img').first();
                const titleElement = $(element).find('.article-tile-title a').first();
                const abstractElement = $(element).find('.article-tile-contents .article-tile-abstract').first();
                const authorElement = $(element).find('.article-tile-author');
                const authorLink = authorElement.find('a').first();
                const dateElement = authorElement.find('strong').first();

                const imageUrl = imageElement.attr('src');
                const articleUrl = titleElement.attr('href');
                const titleText = titleElement.text().trim();
                const abstractText = abstractElement.text().trim();
                const authorText = authorLink.text().trim();
                const authorUrl = authorLink.attr('href');
                const dateText = dateElement.text().trim();

                if (imageUrl && articleUrl && titleText) {
                    articles.push({
                        title: titleText,
                        url: `https://www.mtggoldfish.com${articleUrl}`,
                        imageUrl: imageUrl,
                        abstract: abstractText,
                        authorText: authorText,
                        authorUrl: `https://www.mtggoldfish.com${authorUrl}`,
                        dateText: dateText
                    });
                }
            });

            // Limit to the first 3 articles
            const limitedArticles = articles.slice(0, 3);

            // Create embed for each article
            const embeds = limitedArticles.map(article => 
                new EmbedBuilder()
                    .setColor(0x2e2d2d)
                    .setTitle(article.title)
                    .setURL(article.url)
                    .setThumbnail(article.imageUrl)
                    .setDescription(`${article.abstract || 'No abstract available.'}\n\n[See all articles by ${article.authorText}](${article.authorUrl})`)
                    .setFooter({ 
                        text: `${article.authorText} - ${article.dateText}` 
                    })
            );

            // Add message link to all articles
            const allArticlesMessage = `\n\nShowing the last 3 articles from MTGGoldFish.\n\n`;

            // Send embeds and message
            if (embeds.length > 0) {
                await interaction.reply({ 
                    embeds: embeds,
                    content: allArticlesMessage
                });
            } else {
                await interaction.reply('No articles found.');
            }

        } catch (error) {
            console.error('An error occurred while scraping the page:', error);
            await interaction.reply('There was an error trying to fetch the articles.');
        }
    },
};
