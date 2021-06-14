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

async function animeInfo(search_term) {
    let url = 'https://www7.animeseries.io/search?keyword=' + search_term;

    const response = await request(url);

    let $ = cheerio.load(response); //request search page url

    let halfurl = $('ul.items').find('a').attr('href'); //scrape anime url

    let animeurl = 'https://www7.animeseries.io' + halfurl;

    const response2 = await request(animeurl); //request anime url

    $ = cheerio.load(response2)

    let infolist = [];

    let image = $('div.left').find('img.img-responsive').attr("src");
    infolist.push(image)

    let title = $('div.right').find('h1').text();
    infolist.push(title)

    let description = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(5)').text() //gets text by selector
    infolist.push(description)

    let other_name = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(6)').text()
    infolist.push(other_name.split(":").pop())

    let country = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(7)').text()
    infolist.push(country.split(":").pop())

    let status = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(8)').text()
    infolist.push(status.split(":").pop().trim())

    let released = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(9)').text()
    infolist.push(released.split(" ").pop().trim())

    let genre = $('#wrapper_bg > div > div.content_left > div > div > div.right > p:nth-child(10)').text()
    let fixgenre = genre.split(":").pop().trim();
    infolist.push(fixgenre.replace(/\s/g, '').replace(/([A-Z])/g, ' $1').trim()) //removes all spaces then adds one space before every capital letter

    return infolist
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
    animeVideo,
    animeInfo
}