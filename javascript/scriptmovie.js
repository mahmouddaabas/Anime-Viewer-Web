$(document).ready(() => {
    
    $(".searchBtn").on("click", () =>{
        fetch("http://127.0.0.1:3001/movieSearch/" + $(".input").val())
        .then(response => {
           return response.json()
        })
        .then(data => {
            createMovieList(data)
        })
    })

    function createMovieList(data){
            $("#header").text("Movie List");
            //epList.innerHTML = ""; //empty list before adding new movies
            for(i in data[0]){
                $("#episodeList").append("<li> <a href=" + "#" + data[1][i] + ">" + data[0][i] + "</li"); //create li and a elements and add them to the ul
            }
            $("a").on("click", handleMovieClick) //add eventlistener to the "a" element.
    }

    function handleMovieClick(){
        let link = this.href
        link = link.split("/")
        for(var i = 0; i < 7; i++){ //adjust the number of loops depending how many / the url has
            link.shift() //remove everything except last part of url
        }
        alert(link)
    }

});