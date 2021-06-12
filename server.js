const express = require('express');
const app = express();
const anime = require('./scrapeanime');
const cors = require('cors')
const port = process.env.PORT || 3001;

app.use(cors());

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
    console.log(episode)

    let data = await anime.animeVideo(episode)
    console.log(data)

    response.send(data)
});



app.listen(port, () => {
    console.log('Listening on port: ' + port)
});

function delay(timeout) { //method to issue a delay
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }