const recipeName = document.getElementById("recipe-name")
const recipeIngredients = document.getElementById("recipe-ingredients")
const recipeInstructions = document.getElementById("recipe-instructions")
const ingredientBtn = document.getElementById("add-ingredient")
const instructionBtn = document.getElementById("add-instruction")
const imageInput = document.getElementById("image-input")
const submitBtn = document.getElementById("submit")
const searchInput = document.getElementById("search")
const checkboxContainer = document.getElementById("checkbox-container")

let ingredientList = []
let instructionList = []

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/recipe/pasta", { method: "GET" })
    .then((res) => res.json())
    .then((json) => {
        recipeName.innerText = json.name;
        recipeIngredients.innerText = json.ingredients
        recipeInstructions.innerText = json.instructions
    })
    fetch("http://localhost:3000/category/all", { method: "GET" })
    .then((res) => res.json())
    .then((json) => {
        json.categories.forEach(category => {
            checkboxContainer.innerHTML += `
                <p>
                    <label>
                        <input class="c-box" id="red" type="checkbox" data-id=${category._id}/>
                        <span>${category.name}</span>
                    </label>
                </p>
            `;
        });
    })
})

ingredientBtn.addEventListener("click", () => {
    const ingredientText = document.getElementById("ingredients-text")
    ingredientList.push(ingredientText.value)
    ingredientText.value = ""
})

instructionBtn.addEventListener("click", () => {
    const instructionText = document.getElementById("instructions-text")
    instructionList.push(instructionText.value)
    instructionText.value = ""
})

submitBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("name-text")
    let categoriesList = []
    let checkboxes = document.getElementsByClassName("c-box")
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            //console.log(checkboxes[i].dataset.id)
            categoriesList.push(checkboxes[i].dataset.id)
        }
    };

    fetch("http://localhost:3000/recipe/", {
        method: "POST",
        body: JSON.stringify({
            name: nameInput.value,
            ingredients: ingredientList,
            instructions: instructionList,
            categories: categoriesList
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res) => res.json())
    .then((json) => console.log(json))

    nameInput.value = ""
    ingredientList = []
    instructionList = []

    let images = imageInput.files
    let imagesList = []
    for (let i = 0; i<images.length; i++) {
        imagesList.push(images[i].name)
    }
    let data = new FormData()
    data.append("images", imagesList)

    fetch("http://localhost:3000/images", {
        method: "POST",
        body: data,
    })
    .then((res) => res.json())
    .then((json) => console.log(json.msg))
    imageInput.value = ""
})


searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        try {
            fetch("http://localhost:3000/recipe/"+searchInput.value, { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                recipeName.innerText = json.name;
                recipeIngredients.innerText = json.ingredients
                recipeInstructions.innerText = json.instructions
            })
        } catch {
            console.log("Failed fetching data!")
        }
        searchInput.value = ""
    }
})
