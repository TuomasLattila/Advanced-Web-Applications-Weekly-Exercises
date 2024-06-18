const { json } = require("express")

const submitBtn = document.getElementById("submit-data")
const displayRes = document.getElementById("display-res")
const searchBtn = document.getElementById("search")

submitBtn.addEventListener("click", () => {
    let newName = document.getElementById("input-name").value
    let newTask = document.getElementById("input-task").value

    fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
            name: newName,
            task: newTask
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res) => res.text())
    .then((text) => {
        displayRes.innerText = text.toString()
    })
})

searchBtn.addEventListener("click", () => {
    let searchName = document.getElementById("search-name").value

    fetch("http://localhost:3000/user/"+searchName)
        .then((res) => res.json())
        .then((json) => console.log(json))
        //here it gets the response and the data should 
        //be dislayed correctly 
})