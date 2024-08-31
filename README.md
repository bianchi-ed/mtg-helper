# MTG Helper

MTG Helper is a Discord bot built with Node.js and uses the `discord.js` v14 library, along with `axios` and `cheerio` to fetch and compile Magic: The Gathering information from various sources into the Discord environment.

## Hypergeometric Calculator

A hypergeometric calculator is a tool used to calculate probabilities in scenarios where you are drawing samples from a finite population without replacement. It helps determine the likelihood of specific outcomes based on the number of successes and failures in the population.

For example, in a deck of cards, it can calculate the probability of drawing a certain number of desired cards (successes) when drawing a set number of cards from the deck. The hypergeometric distribution is particularly useful in scenarios like card games, lottery draws, and quality control where items are not replaced after selection.
<details>
<summary>/calculator</summary>

### Description 

This command calculates the probability of drawing specific cards in a game of Magic: The Gathering using the hypergeometric distribution. It provides the chances of drawing a specified number of wanted cards from your deck.

### Parameters
`population_size <Integer>` -> The total number of cards in your deck/library from which you are drawing.

`sample_size <Integer>` -> The number of cards you are drawing, such as the number of cards in your opening hand.

`successes_in_population <Integer>` -> The number of specific cards you want from your deck/library.

`successes_in_sample <Integer>` -> The exact number of the wanted cards you want to draw.

### Raw SlashCommand Input Example

```shell
/calculator population_size:60 sample_size:7 successes_in_population:4 successes_in_sample:2
```

### Discord Input Example

![hypcalcin](https://github.com/user-attachments/assets/f222d1a9-6fc8-47a5-abb4-8e0696a31a3c)

### Output Example

![hypcalcout](https://github.com/user-attachments/assets/71f73f1d-dfc1-4ba8-a2e0-7cb822d3c7a0)

</details>

## Scryfall

The commands in this section fetch information from the Scryfall API, a comprehensive database of Magic: The Gathering cards.

<details>
<summary>/card</summary>

### Description 

Search for a Magic: The Gathering card by name.

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example

```shell
/card name:Black Lotus
```

### Discord Input Example

![card](https://github.com/user-attachments/assets/c3078470-f7e8-4d2d-90f3-c41f14501510)

### Output Example

![card output](https://github.com/user-attachments/assets/2801d37c-7abb-4386-9ffd-65381b0e4ac5)

</details>

<details>
<summary>/card-text-only</summary>
 
### Description 

Search for a Magic: The Gathering card information (Text Only).

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example 

```shell
/card-text-only name: Black Lotus
```

### Discord Input Example 

![card-text](https://github.com/user-attachments/assets/09df6146-f287-4d79-aaa0-c9edfde57b73)

### Output Example

![card-text-out](https://github.com/user-attachments/assets/7c1028be-73c7-467d-b9c2-b5bda2cbe872)

</details>

<details>
<summary>/art</summary>

### Description 

Fetches the full art of a Magic: The Gathering card.

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example 

```shell
/art name:Black Lotus
```

### Discord Input Example 

![11111](https://github.com/user-attachments/assets/aad585b4-9904-4097-8254-2c64f343765d)

### Output Example

![art](https://github.com/user-attachments/assets/e1f2af4b-5369-4d2f-b535-642ee5a9d7fb)

</details>

<details>
<summary>/flavour</summary>
 
### Description 

Retrieves the flavor text of a Magic: The Gathering card.

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example 

```shell
/flavour name:Glorybringer
```

### Discord Input Example 

![flavour-disc](https://github.com/user-attachments/assets/e5ed00dd-8b56-49b0-b3ba-afc03113c47a)

### Output Example

![flavour-out](https://github.com/user-attachments/assets/9acd5cb4-0a8d-4019-8851-7f520d06c985)

</details>

<details>
<summary>/legality</summary>

### Description 

Retrieves the legality of a Magic: The Gathering card in various formats.

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example 

```shell
/legality name:Black Lotus
```

### Discord Input Example 

![legality-in](https://github.com/user-attachments/assets/74d89ae4-1565-4070-a15e-a6f26f19578b)

### Output Example

![legality-out](https://github.com/user-attachments/assets/40ece5a4-1b26-4398-9fa2-652527d044d5)

</details>

<details>
<summary>/legality-text-only</summary>

### Description 

Retrieves the legality of a Magic: The Gathering card in various formats, displaying the information as plain text.

### Parameters

`name <String>` -> The name of the Magic: The Gathering card.

### Raw SlashCommand Input Example 

```shell
/legality-text-only name:Black Lotus
```

### Discord Input Example 

![legality-text-in](https://github.com/user-attachments/assets/5c93649d-669e-403e-8489-8e49d3c2ef0b)

### Output Example

![legality-text-out](https://github.com/user-attachments/assets/7be2c56b-8f5c-4107-9b2c-d158ce1217be)


</details>

## MTGGoldfish

The commands in this section fetch information from MTGGoldfish, a platform for Magic: The Gathering tournament data and decklists.

<details>
<summary>/mtgo-player</summary>
 
### Description 

Retrieves recent Magic: The Gathering Online events for a specified player.

### Parameters

`nickname <String>` -> The MTGO nickname of the player whose events you want to retrieve.

### Raw SlashCommand Input Example 

```shell
/mtgo-player nickname:lsv
```

### Discord Input Example 

![mtgo-player in](https://github.com/user-attachments/assets/74b031f2-59d0-441a-8a18-eb664196112f)

### Output Example

![mtgo-player out](https://github.com/user-attachments/assets/b1df6ae0-08d4-47b9-a52a-a3915c8542a9)


</details>

<details>
<summary>/tournaments</summary>
 
### Description 

Fetches recent tournament data for a specified Magic: The Gathering format from MTGGoldfish.

### Parameters

`format <StringChoice>` -> The MTG format to fetch data for. Options include Modern, Pioneer, Pauper, Standard, Legacy, and Vintage.

### Raw SlashCommand Input Example 

```shell
/tournaments format:Modern
```

### Discord Input Example 

![tournaments-in](https://github.com/user-attachments/assets/6b1e0eb7-a093-4110-9a21-79c36e5b5084)


### Output Example:

![tournaments-out](https://github.com/user-attachments/assets/605661ce-2cf9-4d11-94f0-c1fb01790c54)


</details>

<details>
<summary>/metagame</summary>
 
### Description 

Retrieves the top 20 metagame archetypes for a specified Magic: The Gathering format from MTGGoldfish.

### Parameters

`format <StringChoice>` -> The MTG format to fetch archetypes for. Options include Modern, Pioneer, Pauper, Standard, Legacy, and Vintage.

### Raw SlashCommand Input Example

```shell
/metagame format:Modern
```

### Discord Input Example

![meta-in](https://github.com/user-attachments/assets/2f919065-baf1-411b-adcd-c29bfc63552f)

### Output Example

![meta-out](https://github.com/user-attachments/assets/1b3b1736-ba22-46f9-8b84-ba7a4da870bf)


</details>

<details>
<summary>/mtggoldfish-articles </summary>
 
### Description 

Retrieves random 3 recent articles from MTGGoldfish.

### Raw SlashCommand Input Example

```shell
/mtggoldfish-articles 
```

### Discord Input Example

![Captura de tela 2024-08-25 100211](https://github.com/user-attachments/assets/5981944b-64fb-4ffa-8043-f5f739a8c880)

### Output Example

![articles out](https://github.com/user-attachments/assets/54f2ae32-0c73-4467-95de-f5d86e5c5a6e)

</details>
