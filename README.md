# Discord Voice Assistant

A Discord voice assistant bot that will listen and execute commands

## Requirements

Node v8.0

## Setup 

### Setup application on Discord ###

* Setup [new application][1] on Discord's develop portal
* Access the OAuth2 under the settings menu
* Under scopes, check the box labeled **bot**
* Copy the url provide and change **&permissions=0** to **&permissions=8** and visit the URL
* Copy the token listed in the bot settings

### Setup files ###
* Create a config.json file as such
```
{
    "prefix": <prefix of you choice>
    "bot_token": <your bot token>
}
```
* Install all dependencies `npm install`


### Start Bot
``` node index.js ```


## Usage

With default prefix as `*`
* Type *join in a channel to have the bot join the room

- - - - 

## License
[MIT](https://choosealicense.com/licenses/mit/)

[1]: https://discordapp.com/developers/applications/

