let searchBtn = document.getElementById("searchBtnID");
let input = document.getElementById("inputID");
let epList = document.getElementById("episodeList");
let videoplayer = document.getElementById("videoPlayer");

searchBtn.addEventListener("click",  () => {
    fetch("http://127.0.0.1:3001/api/" + input.value)
    .then(response => {
        return response.json();
    })
    .then(data => {
        createEpList(data)
    });
});

function createEpList(data){
    let counter;
    if(Array.from(data).indexOf("conan")){ //if contains conan counter + 2 because 2 episodes are missing.
        counter = data.length + 2;
    }
    else {
        counter = data.length;
    }

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
    let link = [];
    link = this.href //gets clicked link href
    link = link.split("/")
    for(var i = 0; i < 5; i++){
        link.shift() //remove everything except last part of url
    }
    delay(1000)
    //alert(link)

    fetch("http://127.0.0.1:3001/apiVideo/" + link)
    .then(response => {
        return response.text();
    })
    .then(data => {
        insertVideo(data)
    });
}

function insertVideo(data) {
    videoplayer.setAttribute("src", data)
    videoplayer.onplay();
}

function delay(timeout) { //method to issue a delay
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }