const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function hypergeometric(k, N, K, n) {
    const factorial = (num) => (num <= 1 ? 1 : num * factorial(num - 1));
    const combination = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));
    const probability =
        (combination(K, k) * combination(N - K, n - k)) / combination(N, n);
    return probability;
}

function cumulativeProbability(maxK, N, K, n) {
    let cumulativeProb = 0;
    for (let i = 0; i <= maxK; i++) {
        cumulativeProb += hypergeometric(i, N, K, n);
    }
    return cumulativeProb;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .setDescription('Calculate the probability of drawing specific cards in Magic: The Gathering.')
        .addIntegerOption(option =>
            option
                .setName('population_size')
                .setDescription('Cards in your deck/library you are drawing from')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('sample_size')
                .setDescription('Number of cards you are drawing, e.g., cards in opening hand')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('successes_in_population')
                .setDescription('Number of cards you want that is in the deck/library')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('successes_in_sample')
                .setDescription('Number of wanted cards you want to draw')
                .setRequired(true)
        ),

    async execute(interaction) {
        const N = interaction.options.getInteger('population_size');
        const K = interaction.options.getInteger('successes_in_population');
        const n = interaction.options.getInteger('sample_size');
        const k = interaction.options.getInteger('successes_in_sample');

        const exactK = hypergeometric(k, N, K, n) * 100;
        const atLeastK = (1 - cumulativeProbability(k - 1, N, K, n)) * 100;
        const atMostK = cumulativeProbability(k, N, K, n) * 100;
        const zeroK = hypergeometric(0, N, K, n) * 100;

        const embed = new EmbedBuilder()
            .setColor(0x2e2d2d)
            .setTitle('Hypergeometric Calculator')
            .addFields(
                { name: 'Input', value: `\n----\nPopulation Size (Cards in your deck/library you are drawing from): **${N}**\nSample Size (Number of cards you are drawing, e.g., cards in opening hand): **${n}**\nSuccesses in Population (Number of cards you want that is in the deck/library): **${K}**\nSuccesses in Sample (Number of wanted cards you want to draw): **${k}**`, inline: false },
                { name: 'Results', value: `\n----\nChance to draw ${k} or more of the wanted card: **${atLeastK.toFixed(2)}%**\nChance to draw exactly ${k} of the wanted card: **${exactK.toFixed(2)}%**\nChance to draw ${k} or less of the wanted card: **${atMostK.toFixed(2)}%**\nChance to draw 0 of the wanted card: **${zeroK.toFixed(2)}%**`, inline: false }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
