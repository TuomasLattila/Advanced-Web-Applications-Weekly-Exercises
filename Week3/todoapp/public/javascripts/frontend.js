const submitBtn = document.getElementById("submit-data")
const displayRes = document.getElementById("display-res")

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
    //.then((res) => res.json())
    //.then((json) => console.log(json)) Problem here!! Can't get the respons text from the server!
})