const request = require('request-promise');
const cheerio = require('cheerio');

async function animeList(search_term) {

    let url = 'https://www7.animeseries.io/search?keyword=' + search_term;

    const response = await request(url);

    let $ = cheerio.load(response);

    let length = $('#wrapper_bg > div > div.content_left > div > div > ul').find("li").length //animes in the list
    //console.log(length)

    let anime_names = [];
    for(var i = 0; i < length; i++){
        anime_names.push($('#wrapper_bg > div > div.content_left > div > div > ul > li:nth-child('+ i +') > a > div > div > div').text()) //scrape anime names
    }
    anime_names.shift() //remove first element
    //console.log(anime_names)

    let anime_list = $('ul.items').find('a').get().map(x => $(x).attr('href')); //scrape all anime urls
    anime_list.pop() //remove last element
    //console.log(anime_list)

    return [anime_names, anime_list]; //return both arrays an an array
}

async function animeEpisodes(anime_url){
    const response2 = await request(anime_url);

    $ = cheerio.load(response2);

    //let episodes = $('div.list_episode').find('ul').find('li').find('a').get().map(x => "https://www7.animeseries.io" + $(x).attr('href')); //scrape episodes and put them in a map
    let episodes = $('div.list_episode').find('ul').find('li').find('a').get().map(x => $(x).attr('href')); //scrape episodes and put them in a map
    //console.log(episodes);

    return episodes
}

async function animeInfo(anime_url) {
    const response2 = await request(anime_url); //request anime url

    const $ = cheerio.load(response2)

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

    let embed_link = $("#wrapper_bg > div.content > div.video_watch > div > div.watch_player > div.ver > div.watch_video.watch-iframe > iframe").attr("src")

    return embed_link
}

module.exports = {
    animeList,
    animeEpisodes,
    animeVideo,
    animeInfo
}