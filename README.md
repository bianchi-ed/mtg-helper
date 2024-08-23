# MTG Discord Bot

## Introduction

MTG Helper is a Discord bot built with Node.js and uses the `discord.js` v14 library, along with `axios` and `cheerio` to fetch and compile Magic: The Gathering information from various sources into the Discord environment.

The bot is designed to enhance the MTG experience by providing card information, tournament results, top archetypes, and more directly within your Discord server.

## Scryfall

The commands in this section fetch information from the Scryfall API, a comprehensive database of Magic: The Gathering cards.

<details>
<summary>/card</summary>
<br>

**Description** 

Search for a Magic: The Gathering card by name.

**Parameters**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example**

```shell
/card name:Black Lotus
```

**Discord Input Example**

![card](https://github.com/user-attachments/assets/c3078470-f7e8-4d2d-90f3-c41f14501510)

**Output Example**

![card output](https://github.com/user-attachments/assets/2801d37c-7abb-4386-9ffd-65381b0e4ac5)

</details>

<details>
<summary>/card-text-only</summary>
 
<br>
 
**Description** 

Search for a Magic: The Gathering card information (Text Only).

**Parameters:**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example :**

```shell
/card-text-only name: Black Lotus
```

**Discord Input Example :**

![card-text](https://github.com/user-attachments/assets/09df6146-f287-4d79-aaa0-c9edfde57b73)

**Output Example:**

![card-text-out](https://github.com/user-attachments/assets/7c1028be-73c7-467d-b9c2-b5bda2cbe872)

</details>

<details>
<summary>/art</summary>
<br>

**Description:** 

Fetches the full art of a Magic: The Gathering card.

**Parameters:**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example :**

```shell
/art name:Black Lotus
```

**Discord Input Example :**

![11111](https://github.com/user-attachments/assets/aad585b4-9904-4097-8254-2c64f343765d)

**Output Example:**

![art](https://github.com/user-attachments/assets/e1f2af4b-5369-4d2f-b535-642ee5a9d7fb)

</details>

<details>
<summary>/flavour</summary>
<br>
 
**Description** 

Retrieves the flavor text of a Magic: The Gathering card.

**Parameters**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example :**

```shell
/flavour name:Glorybringer
```

**Discord Input Example :**

![flavour-disc](https://github.com/user-attachments/assets/e5ed00dd-8b56-49b0-b3ba-afc03113c47a)

**Output Example:**

![flavour-out](https://github.com/user-attachments/assets/9acd5cb4-0a8d-4019-8851-7f520d06c985)

</details>

<details>
<summary>/legality</summary>
<br>

**Description** 

Retrieves the legality of a Magic: The Gathering card in various formats.

**Parameters**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example :**

```shell
/legality name:Black Lotus
```

**Discord Input Example :**

![legality-in](https://github.com/user-attachments/assets/74d89ae4-1565-4070-a15e-a6f26f19578b)

**Output Example:**

![legality-out](https://github.com/user-attachments/assets/40ece5a4-1b26-4398-9fa2-652527d044d5)

</details>

<details>
<summary>/legality-text-only</summary>
<br>

**Description** 

Retrieves the legality of a Magic: The Gathering card in various formats, displaying the information as plain text.

**Parameters**

`name` -> The name of the Magic: The Gathering card.

**Raw SlashCommand Input Example :**

```shell
/legality-text-only name:Black Lotus
```

**Discord Input Example :**

![legality-text-in](https://github.com/user-attachments/assets/5c93649d-669e-403e-8489-8e49d3c2ef0b)

**Output Example:**

![legality-text-out](https://github.com/user-attachments/assets/7be2c56b-8f5c-4107-9b2c-d158ce1217be)


</details>

## MTGGoldfish

The commands in this section fetch information from MTGGoldfish, a platform for Magic: The Gathering tournament data and decklists.

<details>
<summary>/mtgo-player</summary>
<br>
 
**Description:** 

Retrieves recent Magic: The Gathering Online events for a specified player.

**Parameters:**

`nickname` -> The MTGO nickname of the player whose events you want to retrieve.

**Raw SlashCommand Input Example :**

```shell
/mtgo-player nickname: lsv
```

**Discord Input Example :**

![mtgo-player in](https://github.com/user-attachments/assets/74b031f2-59d0-441a-8a18-eb664196112f)

**Output Example:**

![mtgo-player out](https://github.com/user-attachments/assets/b1df6ae0-08d4-47b9-a52a-a3915c8542a9)


</details>

<details>
<summary>/tournaments</summary>
<br>
 
**Description:** 

Fetches recent tournament data for a specified Magic: The Gathering format from MTGGoldfish.

**Parameters:**

`format` -> The MTG format to fetch data for. Options include Modern, Pioneer, Pauper, Standard, Legacy, and Vintage.

**Raw SlashCommand Input Example :**

```shell
/tournaments format:Modern
```

**Discord Input Example :**

![tournaments-in](https://github.com/user-attachments/assets/6b1e0eb7-a093-4110-9a21-79c36e5b5084)


**Output Example:**

![tournaments-out](https://github.com/user-attachments/assets/605661ce-2cf9-4d11-94f0-c1fb01790c54)


</details>

<details>
<summary>/metagame</summary>
<br>
 
**Description:** 

Retrieves the top 20 metagame archetypes for a specified Magic: The Gathering format from MTGGoldfish.

**Parameters:**

`format` -> The MTG format to fetch archetypes for. Options include Modern, Pioneer, Pauper, Standard, Legacy, and Vintage.

**Raw SlashCommand Input Example :**

```shell
/metagame format:Modern
```

**Discord Input Example :**

![meta-in](https://github.com/user-attachments/assets/2f919065-baf1-411b-adcd-c29bfc63552f)

**Output Example:**

![meta-out](https://github.com/user-attachments/assets/1b3b1736-ba22-46f9-8b84-ba7a4da870bf)


</details>
