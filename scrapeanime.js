const request = require('request-promise');
const cheerio = require('cheerio');

async function animeEpisodes(search_term){
    let url = 'https://www7.animeseries.io/search?keyword=' + search_term;

    const response = await request(url);

    let $ = cheerio.load(response);

    let items = $('ul.items').find('a').attr('href'); //scrape anime url

    let animeurl = 'https://www7.animeseries.io' + items;
    //console.log(animeurl);

    const response2 = await request(animeurl);

    $ = cheerio.load(response2);

    //let episodes = $('div.list_episode').find('ul').find('li').find('a').get().map(x => "https://www7.animeseries.io" + $(x).attr('href')); //scrape episodes and put them in a map
    let episodes = $('div.list_episode').find('ul').find('li').find('a').get().map(x => $(x).attr('href')); //scrape episodes and put them in a map
    //console.log(episodes);

    return episodes
}

async function animeVideo(url) {
    const response = await request(url);

    let $ = cheerio.load(response);

    let dlpageurl = $('div.plugins').find('ul').find('li').find('a').get().map(x => "https:" + $(x).attr('href')); //scrape dl page link
    //console.log(dlpageurl)

    dlpageurl = dlpageurl.filter(s => ~s.indexOf("streamani")) //removes anything that doesnt match "streamani"

    const response2 = await request(dlpageurl[0]);

    dlpageurl = [];

    $ = cheerio.load(response2)

    let dlurl = $('div.dowload').find('a').attr("href") //get mp4 url
    //console.log(dlurl)

    return dlurl
}

module.exports = {
    animeEpisodes,
    animeVideo
}