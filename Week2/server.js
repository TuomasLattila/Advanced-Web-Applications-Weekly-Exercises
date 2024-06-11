
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/hello", (req, res) => {
    res.send({msg: "Hello world"})
});

app.get("/echo/:id", (req, res) => {
    res.send({id: req.params.id})
});

app.post("/sum", (req, res) => {
    let result = 0;
    for (let i = 0; i < req.body.numbers.length; i++) {
        result += req.body.numbers[i]
    }
    res.send({sum: result})
})

app.listen(port, () => {console.log(`Server listening port ${port}!`)});