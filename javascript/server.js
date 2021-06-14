const express = require('express');
const app = express();
const anime = require('./scrapeanime');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/animeSearch/:name', async (request, response) => {
    console.log('Fetching all anime.')
    const keyword = request.params.name;
    //console.log(keyword)

    let data = await anime.animeList(keyword);
    console.log(data)
    response.send(data) //send 2 arrays to the caller
});


app.get('/animeInfo/:info', async (request, response) => {
    console.log('Fetching information.')
    const url = "https://www7.animeseries.io/anime/" + request.params.info;
    //console.log(url)

    let data = await anime.animeInfo(url)
    console.log(data)

    response.send(data)
});

app.get('/animeEpisodes/:url', async (request, response) => {
    console.log('Fetching episodes.')
    const url = "https://www7.animeseries.io/anime/" + request.params.url;
    //console.log(url)

    let data = await anime.animeEpisodes(url);
    console.log(data)
    response.send(data)
});

app.get('/animeVideo/:episode', async (request, response) => {
    console.log('Fetching video.')
    var episode = "https://www7.animeseries.io/watch/" + request.params.episode;
    //console.log(episode)

    let data = await anime.animeVideo(episode)
    console.log(data)

    response.send(data)
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});