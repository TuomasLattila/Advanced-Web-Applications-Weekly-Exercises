document.addEventListener("DOMContentLoaded", function () {
    generateWikiItems(5);
});

function generateWikiItems(number) {
    let container = document.getElementsByClassName("container")
    for (let index = 0; index < number; index++) {
        let wikiItem = document.createElement("div");
        wikiItem.className = "wiki-item";

        let wikiHeader = document.createElement("H1");
        wikiHeader.className = "wiki-header";
        wikiHeader.textContent = "Breed X"

        let wikiContent = document.createElement("div");
        wikiContent.className = "wiki-content";

        let wikiText = document.createElement("p");
        wikiText.className = "wiki-text"
        wikiText.textContent = "Some text about this breed."

        let imgContainer = document.createElement("div");
        imgContainer.className = "img-container"

        let wikiImg = document.createElement("img");
        wikiImg.className = "wiki-img";
        
        wikiItem.appendChild(wikiHeader)
        wikiItem.appendChild(wikiContent)

        wikiContent.appendChild(wikiText)
        wikiContent.appendChild(imgContainer)

        imgContainer.appendChild(wikiImg)

        container[0].appendChild(wikiItem);
    }
}