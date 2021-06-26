$(document).ready(() => {
    //sets all the saved elements back on the page from the local storage.
    $("#videoPlayer").attr("src", localStorage.getItem("last_played_video"))
    window.location.replace("#" + localStorage.getItem("last_clicked_url"))
    $(".animeinfo").html(localStorage.getItem("last_anime_info"))
    $("#header").text("Episode List")
    $("#episodeList").html(localStorage.getItem("last_viewed_anime_episodes"))
    $("#footerID").text(localStorage.getItem("current_episode"))

    $("a").on("click", handleHrefClick) //add eventlistener to all the a elements

    $("#searchBtnID").on("click", () => {
        fetch('https://anime-library-web.herokuapp.com/animeSearch/' + $("input").val()) //fetch animelist
        .then(response => {
            return response.json();
        })
        .then(data => {
            createAnimeList(data)
        })
    });

    function createAnimeList(data) {
        $("#header").text("Anime List");
        $("#episodeList").html("") //empty list before adding new animes
        for(i in data[0]){
            $("#episodeList").append("<li> <a href=" + "#" + data[1][i] + ">" + data[0][i] + "</li"); //create li and a elements and add them to the ul
        }
        $("a").on("click", handleAnimeClick) //add eventlistener to the "a" element.
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
         $("#animeImageID").attr("src", data[0])
         $("#animeTitleID").text("Title: " + data[1])
         $("#animeDescriptionID").text(data[2])
         $("#animeAltNameID").text("Other names: " + data[3])
         $("#animeCountryID").text("Country: " + data[4])
         $("#animeStatusID").text("Status: " + data[5])
         $("#animeReleasedID").text("Released: " + data[6])
         $("#animeGenreID").text("Genre: " + data[7])
         localStorage.setItem("last_anime_info", $(".animeinfo").html())
    }

    function createEpList(data){
        $("#header").text("Episode List")
        $("#episodeList").html("") //empty list before adding new episodes
        let counter = data.length;
        for(i in data){
            $("#episodeList").append("<li> <a href=" + "#" + data[i] + ">" + "Episode: " + counter-- + "</li"); //create li and a elements and add them to the ul
        }
        $("a").on("click", handleHrefClick) //add eventlistener to the "a" element.

        localStorage.setItem("last_viewed_anime_episodes", $("#episodeList").html())
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
        $("#videoPlayer").attr("src", data)
        localStorage.setItem("last_played_video", data)
        $("#videoPlayer")[0].autoplay = true;
    }
    
    function setCurrentEpisode(current_episode) {
        $("#footerID").text("You are currently watching: " + current_episode)
        localStorage.setItem("current_episode", $("#footerID").text())
    }

})