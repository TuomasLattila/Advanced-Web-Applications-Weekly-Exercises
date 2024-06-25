document.addEventListener("DOMContentLoaded", () => {
    const recipeName = document.getElementById("recipe-name")
    const recipeIngredients = document.getElementById("recipe-ingredients")
    const recipeInstructions = document.getElementById("recipe-instructions")
    
    fetch("http://localhost:3000/recipe/pasta")
    .then((res) => res.json())
    .then((json) => {
        recipeName.innerText = json.name;
        recipeIngredients.innerText = json.ingredients
        recipeInstructions.innerText = json.instructions
    })
})