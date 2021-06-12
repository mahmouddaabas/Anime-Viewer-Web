let searchBtn = document.getElementById("searchBtnID");
let input = document.getElementById("inputID");
let epList = document.getElementById("episodeList");
let videoplayer = document.getElementById("videoPlayer");

searchBtn.addEventListener("click",  () => {
    fetch("https://anime-library-web.herokuapp.com/api/" + input.value)
    .then(response => {
        return response.json();
    })
    .then(data => {
        createEpList(data)
    });
});

function createEpList(data){
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
}

async function handleHrefClick() {
    let link = this.href //gets clicked link href
    link = link.split("/")
    for(var i = 0; i < 6; i++){
        link.shift() //remove everything except last part of url
    }
    //alert(link)

    fetch("https://anime-library-web.herokuapp.com/apiVideo/" + link)
    .then(response => {
        return response.text();
    })
    .then(data => {
        insertVideo(data)
    });
}

function insertVideo(data) {
    videoplayer.setAttribute("src", data)
}

function delay(timeout) { //method to issue a delay
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }