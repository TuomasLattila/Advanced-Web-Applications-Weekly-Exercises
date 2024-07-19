"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let vehicleList = [];
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.get("/vehicle/search/:model", (req, res) => {
    let found = false;
    vehicleList.forEach(vehicle => {
        if (vehicle.model === req.params.model) {
            found = true;
            res.json(vehicle);
        }
    });
    if (found != true) {
        res.status(404);
    }
});
app.post("/vehicle/add", (req, res) => {
    try {
        if (req.body.bodyType && req.body.wheelCount) {
            let newVehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                bodyType: req.body.bodyType,
                wheelCount: req.body.wheelCount
            };
            vehicleList.push(newVehicle);
            //res.status(201).send("Car added")
        }
        else if (req.body.draft) {
            let newVehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                draft: req.body.draft
            };
            vehicleList.push(newVehicle);
            //res.status(201).send("Boat added")
        }
        else if (req.body.wingspan) {
            let newVehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                wingspan: req.body.wingspan
            };
            vehicleList.push(newVehicle);
            //res.status(201).send("Plane added")
        }
        else {
            let newVehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
            };
            vehicleList.push(newVehicle);
            //res.status(201).send("Vehicle added")
        }
        res.status(201).send("Vehicle added");
    }
    catch (error) {
        res.status(500).send("Error adding vehicle: " + error);
    }
});
app.listen(port, () => {
    console.log("Server up at port: " + port);
});
