const Slackbot = require('slackbot');
const axios = require('axios');

const bot = new Slackbot({
    token: 'xoxb-.....',
    name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Get Ready To Laugh', params);
});

// Error Handler
bot.on('error', (err) +> console.log(err));

// Message handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.txt);
// To check data within message   console.log(data);
});

// Respons to Data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    } else if(message.includes(' yomama')) {
        yomamaJoke();
    }
}

// Provide CN Joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':lauging:'
            };
            bot.postMessageToChannel('general', `Joke: ${joke}`, params);
        });
}

// Provide YMM Joke
function yomamaJoke() {
    axios.get('http://api.yomomma.info')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ':lauging:'
            };
            bot.postMessageToChannel('general', `Joke: ${joke}`, params);
        });
}

  