import express, { Express, Request, Response } from "express";
const app: Express = express()
const port: Number = 3000

app.use(express.json())

interface Vehicle {
    model: String,
    color: String,
    year: Number,
    power: Number
}

interface Car extends Vehicle {
    bodyType: String,
    wheelCount: Number
}

interface Boat extends Vehicle {
    draft: Number
}

interface Plane extends Vehicle {
    wingspan: Number
}

let vehicleList: Vehicle[] = [];

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let found: Boolean = false;
    vehicleList.forEach(vehicle => {
        if (vehicle.model === req.params.model) {
            found = true
            res.json(vehicle)
        }
    })
    if (found != true) {
        res.status(404)
    }
})

app.post("/vehicle/add", (req: Request, res: Response) => {
    try {
        if (req.body.bodyType && req.body.wheelCount) {
            let newVehicle: Car = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                bodyType: req.body.bodyType,
                wheelCount: req.body.wheelCount
            }
            vehicleList.push(newVehicle)
            //res.status(201).send("Car added")
        } else if (req.body.draft) {
            let newVehicle: Boat = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                draft: req.body.draft
            }
            vehicleList.push(newVehicle)
            //res.status(201).send("Boat added")
        } else if (req.body.wingspan) {
            let newVehicle: Plane = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                wingspan: req.body.wingspan
            }
            vehicleList.push(newVehicle)
            //res.status(201).send("Plane added")
        } else {
            let newVehicle: Vehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
            }
            vehicleList.push(newVehicle)
            //res.status(201).send("Vehicle added")
        }
        res.status(201).send("Vehicle added")
    } catch (error) {
        res.status(500).send("Error adding vehicle: "+error)
    } 
})

app.listen(port, () => {
    console.log("Server up at port: "+port);
})