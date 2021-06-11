const express = require('express');
const app = express();
const anime = require('./scrapeanime');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //enable cors
    next();
});

app.get('/api/:keyword', async (request, response) => {
    console.log('Fetching episodes.')
    const keyword = request.params.keyword;
    //console.log(keyword)

    let data = await anime.animeEpisodes(keyword);
    //console.log(data)
    response.send(data)
});

app.get('/apiVideo/:episode', async (request, response) => {
    console.log('Fetching video.')
    var episode = "https://www7.animeseries.io/watch/" + request.params.episode;
    await delay(1500)
    console.log(episode)

    let data = await anime.animeVideo(episode)
    console.log(data)

    response.send(data)
});



app.listen(3001, () => {
    console.log('Listening on port 3001')
});

function delay(timeout) { //method to issue a delay
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }