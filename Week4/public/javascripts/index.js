let ingredientList = []
let instructionList = []

document.addEventListener("DOMContentLoaded", () => {
    const recipeName = document.getElementById("recipe-name")
    const recipeIngredients = document.getElementById("recipe-ingredients")
    const recipeInstructions = document.getElementById("recipe-instructions")
    
    fetch("http://localhost:3000/recipe/pasta", { method: "GET" })
    .then((res) => res.json())
    .then((json) => {
        recipeName.innerText = json.name;
        recipeIngredients.innerText = json.ingredients
        recipeInstructions.innerText = json.instructions
    })
})

const ingredientBtn = document.getElementById("add-ingredient")
const instructionBtn = document.getElementById("add-instruction")
const imageInput = document.getElementById("image-input")
const submitBtn = document.getElementById("submit")

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

    fetch("http://localhost:3000/recipe/", {
        method: "POST",
        body: JSON.stringify({
            name: nameInput.value,
            ingredients: ingredientList,
            instructions: instructionList
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
