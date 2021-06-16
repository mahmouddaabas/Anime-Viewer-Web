let searchBtn = document.getElementById("searchBtnID");
let input = document.getElementById("inputID");
let epList = document.getElementById("episodeList");
let videoplayer = document.getElementById("videoPlayer");
let header = document.getElementById("header");
let footer = document.getElementById("footerID")

let animeInfoDiv = document.getElementById("animeInfoID");
let animeImage = document.getElementById('animeImageID');
let animeDescription = document.getElementById('animeDescriptionID');
let animeTitle = document.getElementById('animeTitleID');
let animeAltName = document.getElementById('animeAltNameID');
let animeCountry = document.getElementById('animeCountryID');
let animeStatus = document.getElementById('animeStatusID');
let animeReleased = document.getElementById('animeReleasedID');
let animeGenre = document.getElementById('animeGenreID');

//sets all the saved elements back on the page from the local storage.
videoplayer.setAttribute("src", localStorage.getItem("last_played_video"))
window.location.replace("#" + localStorage.getItem("last_clicked_url"))
animeInfoDiv.outerHTML = localStorage.getItem("last_anime_info")
header.textContent = "Episode List"
epList.innerHTML = localStorage.getItem("last_viewed_anime_episodes")
footer.textContent = localStorage.getItem("current_episode")

for (var item of document.querySelectorAll("#episodeList li a")) { //add eventlistener to all the a elements in the list (if there is any).
    item.addEventListener("click", handleHrefClick)
   }

searchBtn.addEventListener("click",  () => {
    fetch('https://anime-library-web.herokuapp.com/animeSearch/' + input.value) //fetch animelist
    .then(response => {
        return response.json();
    })
    .then(data => {
        createAnimeList(data)
    })
});

function createAnimeList(data) {
    header.textContent = "Anime List"
    epList.innerHTML = ""; //empty list before adding new animes
    for(i in data[0]){
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.text = data[0][i]
        a.href = "#"+data[1][i]
        li.appendChild(a)
        epList.appendChild(li)

        a.addEventListener("click", handleAnimeClick) //add eventlistener to all a elements
}
}

async function handleAnimeClick(){
    let link = this.href
    link = link.split("/")
    for(var i = 0; i < 7; i++){ //adjust the number of loops depending how many / the url has
        link.shift() //remove everything except last part of url
    }

    fetch('https://anime-library-web.herokuapp.com/animeInfo/' + link) //fetch info
    .then(response => {
        return response.json();
    })
    .then(data => {
        addAnimeInfo(data)
    })

    return fetch('https://anime-library-web.herokuapp.com/animeEpisodes/' + link) //fetch episodes
    .then(response => {
        return response.json();
    })
    .then(data => {
        createEpList(data)
    })
}

function addAnimeInfo(data) {
    animeImage.setAttribute("src", data[0]);
    animeTitle.textContent = "Title: " + data[1];
    animeDescription.textContent = data[2];
    animeAltName.textContent = "Other names: " + data[3];
    animeCountry.textContent = "Country: " + data[4];
    animeStatus.textContent = "Status: " + data[5];
    animeReleased.textContent = "Released: " + data[6];
    animeGenre.textContent = "Genre: " + data[7];
    localStorage.setItem("last_anime_info", animeInfoDiv.outerHTML)
}

function createEpList(data){
    header.textContent = "Episode List"
    epList.innerHTML = ""; //empty list before adding new episodes
    let counter = data.length;
    for(i in data){
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.text = "Episode: " + counter--;
        a.href = "#"+data[i]
        a.id = "Nmbr" + i
        li.appendChild(a)
        epList.appendChild(li)

        a.addEventListener("click", handleHrefClick)
}
    localStorage.setItem("last_viewed_anime_episodes", epList.innerHTML)
    window.location.reload() //reloads the page
}

async function handleHrefClick() {
    let link = this.href //gets the clicked link href
    let current_episode = this.text //gets the clicked link text
    setCurrentEpisode(current_episode)

    link = link.split("/")
    for(var i = 0; i < 7; i++){ //adjust the number of loops depending how many / the url has
        link.shift() //remove everything except last part of url
    }
    localStorage.setItem("last_clicked_url", link)
    //alert(link)

    fetch("https://anime-library-web.herokuapp.com/animeVideo/" + link) //fetch video for anime
    .then(response => {
        return response.text();
    })
    .then(data => {
        insertVideo(data)
    });
}

function insertVideo(data) {
    videoplayer.setAttribute("src", data)
    localStorage.setItem("last_played_video", data)
    videoplayer.autoplay = true;
}

function setCurrentEpisode(current_episode) {
    footer.textContent = "You are currently watching: " + current_episode
    localStorage.setItem("current_episode", footer.textContent)
}