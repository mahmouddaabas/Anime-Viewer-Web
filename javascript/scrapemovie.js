const request = require('request-promise');
const cheerio = require('cheerio');

async function moviesearch(search_term){

    url = "https://nyafilmer2.com/list/" + search_term
    //console.log(url)

    const response = await request(url);

    let $ = cheerio.load(response);

    let movie_names = $("#content > div > div.content-left > div.film-content.search > div").find("div.movie-details").find("a").get().map(x => $(x).attr("title")) //scrapes all movie names
    //console.log(movie_names)

    let movie_urls = $("#content > div > div.content-left > div.film-content.search > div").find("div.movie-details").find("a").get().map(x => $(x).attr("href")) //scrapes all movie link
    //console.log(movie_urls)

    return [movie_names, movie_urls]
}

moviesearch('agents of')

async function movieinfo(keyword) {
    url = "https://fmovies.to/film/" + keyword

    const response = await request(url);

    let $ = cheerio.load(response);

}

movieinfo("f9.v9kp4")

module.exports = {
    moviesearch
}