const deleteBtn = document.getElementById("delete-user")
const btnContainer = document.getElementById("button-container")
btnContainer.style.visibility = "hidden" //button-container button only visible when user is searched
deleteBtn.style.visibility = "hidden" //delete-user button only visible when user is searched

const submitBtn = document.getElementById("submit-data")
const postRes = document.getElementById("post-res")
const searchBtn = document.getElementById("search")
const container = document.getElementById("container")
const namePara = document.getElementById("name-para")
const todosPara = document.getElementById("todos-para")
const deleteRes = document.getElementById("delete-res")
const putRes = document.getElementById("put-res")

//Send post request to server to save new todos
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
        postRes.innerText = text.toString()
    })
})

//Request the server for a specific todos
searchBtn.addEventListener("click", () => {
    deleteRes.innerText = ""
    putRes.innerText = ""
    let searchName = document.getElementById("search-name").value

    fetch("http://localhost:3000/user/"+searchName, {method: "GET"})
        .then((res) => res.json())
        .then((json) => {
            namePara.innerText = json.name
            container.appendChild(namePara)
            if (json.todos) {
                let todosString = json.todos[0]
                for (let i = 1; i < json.todos.length; i++) {
                    todosString += (", "+json.todos[i])
                }
                todosPara.innerText = todosString
                setButtonContainer(json.name, json.todos)
                deleteBtn.style.visibility = "visible"
                btnContainer.style.visibility = "visible"
            } else {
                todosPara.innerText = json.msg
                deleteBtn.style.visibility = "hidden"
                btnContainer.style.visibility = "hidden"
            }
            container.appendChild(todosPara)
        })
    
})

//Send delete request to server to delete the searched todos
deleteBtn.addEventListener("click", () => {
    let deleteName = document.getElementById("name-para").innerText
    fetch("http://localhost:3000/user/"+deleteName, {method: "DELETE"})
        .then((res) => res.json())
        .then((json) => {
            if (json.msg = "User deleted") {
                deleteBtn.style.visibility = "hidden"
                btnContainer.style.visibility = "hidden"
                namePara.innerText = ""
                todosPara.innerText = ""
            }
            deleteRes.innerText = json.msg
        })
})


function setButtonContainer(userName, list) {
    btnContainer.innerHTML = ""
    for (let i = 0; i < list.length; i++) {
        let newBtn = document.createElement("button")
        newBtn.type = "button"
        newBtn.className = "delete-task"
        newBtn.innerText = list[i]
        newBtn.addEventListener("click", () => {
            fetch("http://localhost:3000/user", {
                method: "PUT",
                body: JSON.stringify({
                    name: userName,
                    task: list[i]
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.msg = "Task deleted") {
                    newBtn.style.visibility = "hidden"
                }
            putRes.innerText = json.msg
            })
        })
        btnContainer.appendChild(newBtn)
    }
}