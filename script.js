const input = document.querySelector("#search-word");
const searchBtn = document.querySelector("form button[type=submit]");
let viewList = [];


function loadResources(value){
    /* btw this should be irrelevant since user should always type only one raw word */
    const searchWord = encodeURIComponent(value);

    /* word reference */
    const wordRefView = window.open(`https://www.wordreference.com/enit/${searchWord}`);
    /* images (using Bing instead of Google images so I can close this window later. With Google it is not possible) */
    const imgView = window.open(`https://www.bing.com/images/search?q=${searchWord}`);
    /* sentences */
    const sentenceView = window.open(`https://sentence.yourdictionary.com/${searchWord}`);
    /* audio pronunciation */
    const pronView = window.open(`https://www.forvo.com/word/${searchWord}/#en`);
    
    return [wordRefView, imgView, sentenceView, pronView];
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

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
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