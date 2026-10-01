const input = document.querySelector("#search-word");
const searchBtn = document.querySelector("form button[type=submit]");
const errorMessage = document.querySelector(".form-error");
let viewList = [];


function loadResources(value){
    let windList = [];
    /* btw this should be irrelevant since user should always type only one raw word */
    const searchWord = encodeURIComponent(value);

    const URLs = [
        /* audio pronunciation */
        `https://www.forvo.com/word/${searchWord}/#en`,
        /* images (using Bing instead of Google images so I can close this window later. With Google it is not possible) */
        `https://www.bing.com/images/search?q=${searchWord}`, 
        /* sentences */
        `https://sentence.yourdictionary.com/${searchWord}`,
        /* word reference */
        `https://www.wordreference.com/enit/${searchWord}`
    ]

    for(const url of URLs){
        const wind = window.open(url);
        windList.push(wind);
    }

    return windList;
}

function freeResources(){
    for(const view of viewList){
        if(view && !view.closed){
            try{
                view.close();
            }catch(e){
                console.log("Couldn't close the window: " + e);
            }
        }
    }
}

input.addEventListener("keydown", (event) => {
    if(!errorMessage.hidden)
        errorMessage.hidden = true;
})

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if(input.value === ""){
        errorMessage.hidden = false;
        return;
    }

    const btn = event.target;

    if(btn.innerText === "Search"){
        viewList = loadResources(input.value);
        btn.innerText = "Close windows";
    }else if(btn.innerText === "Close windows"){
        freeResources();
        viewList = [];
        btn.innerText = "Search";
    }
});