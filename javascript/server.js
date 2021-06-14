const express = require('express');
const app = express();
const anime = require('./scrapeanime');
const cors = require('cors');
const { data } = require('cheerio/lib/api/attributes');
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/animeSearch/:keyword', async (request, response) => {
    console.log('Fetching episodes.')
    const keyword = request.params.keyword;
    //console.log(keyword)

    let data = await anime.animeEpisodes(keyword);
    //console.log(data)
    response.send(data)
});

app.get('/animeInfo/:info', async (request, response) => {
    console.log('Fetching information.')
    var keyword = request.params.info;

    let data = await anime.animeInfo(keyword)
    console.log(data)

    response.send(data)
});

app.get('/animeVideo/:episode', async (request, response) => {
    console.log('Fetching video.')
    var episode = "https://www7.animeseries.io/watch/" + request.params.episode;
    console.log(episode)

    let data = await anime.animeVideo(episode)
    console.log(data)

    response.send(data)
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});