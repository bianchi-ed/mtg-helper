const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
    	.setName('delete-messages')
    	.setDescription('delete up to 99 messages.')
    	.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune'))
    	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
    	const amount = interaction.options.getInteger('amount')

    	if (amount < 1 || amount > 99) {
      		return interaction.reply({ content: 'You need to input a number between 1 and 99.' })
    	}

    	try {
      		await interaction.channel.bulkDelete(amount, true);
      		return interaction.reply({ content: `Successfully deleted \`${amount}\` messages.` })

    	} catch (error) {
      		console.error('An error occurred:', error);
      		return interaction.reply({ content: 'There was an error trying to delete the messages' })
		}
	},
};