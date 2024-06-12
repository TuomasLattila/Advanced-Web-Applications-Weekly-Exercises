const submitBtn = document.getElementById("submit-data")

submitBtn.addEventListener("click", () => {
    let currentText = document.getElementById("input-text").value
    //console.log(currentText)
    fetch("http://localhost:3000/list", {
        method: "POST",
        body: JSON.stringify({
            text: currentText
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    //.then((res) => res.json())
    //.then((json) => console.log(json))
})