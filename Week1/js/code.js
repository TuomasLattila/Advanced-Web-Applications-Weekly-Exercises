document.addEventListener("DOMContentLoaded", function () {
    generateWikiItems(5, "hound");
});

function generateWikiItems(number) {
    let container = document.getElementsByClassName("container")
    let breedList = ["hound", "akita", "boxer", "shiba", "pug"]

    for (let index = 0; index < number; index++) {
        let wikiItem = document.createElement("div");
        wikiItem.className = "wiki-item";

        let wikiHeader = document.createElement("H1");
        wikiHeader.className = "wiki-header";
        wikiHeader.textContent = breedList[index].toUpperCase()

        let wikiContent = document.createElement("div");
        wikiContent.className = "wiki-content";

        let wikiText = document.createElement("p");
        wikiText.className = "wiki-text"
        fetchWikiTextByBreed(breedList[index]).then(res => {
            wikiText.textContent = res.extract
        })

        let imgContainer = document.createElement("div");
        imgContainer.className = "img-container"

        let wikiImg = document.createElement("img");
        wikiImg.className = "wiki-img";
        fetchRandomDogPictureByBreed(breedList[index]).then(res => {
            wikiImg.src = res.message
        })
        
        wikiItem.appendChild(wikiHeader)
        wikiItem.appendChild(wikiContent)

        wikiContent.appendChild(wikiText)
        wikiContent.appendChild(imgContainer)

        imgContainer.appendChild(wikiImg)

        container[0].appendChild(wikiItem);
    }
}

const fetchRandomDogPictureByBreed = async (breed) => {
    let url = "https://dog.ceo/api/breed/"+breed+"/images/random";
    try {
        const dataPromise = await fetch(url)
        return dataPromise.json()
    } catch (error) {
        console.log(error)
    }
}

const fetchWikiTextByBreed = async (breed) => {
    let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+breed;
    try {
        const dataPromise = await fetch(url)
        return dataPromise.json()
    } catch (error) {
        console.log(error)
    }
}