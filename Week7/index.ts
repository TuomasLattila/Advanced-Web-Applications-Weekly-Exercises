import express, {Express, json, NextFunction, Request, Response} from "express"
import bcrypt from "bcryptjs"
import session from "express-session"
import dotenv from "dotenv"

import passport from "passport"
import { Strategy } from "passport-local"

dotenv.config()

const app: Express = express()
const port: Number = 3000

type User = {
    id: Number,
    username: string,
    password: string
}

type Todo = {
    id: Number,
    todos: String[]
}

let userList: User[] = []
let todosList: Todo[] = []
let idCount: number = 0
const secret: any = process.env.SECRET

app.use(json())
app.use(session({
    secret: "myholysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    console.log("serialize")
    const obj: User = JSON.parse(JSON.stringify(user))
    //console.log(obj)
    done(null, obj.id)
})

passport.deserializeUser((id, done) => {
    console.log("deserialize")
    try {
        const foundUser = userList.find((user)=> user.id == id)
        if (!foundUser) throw new Error("User was not found!")
        done(null, foundUser)
    } catch (err) {
        done(err, false)
    }
})

passport.use(
    new Strategy((username, password, done) => {
        try {
            const foundUser = userList.find((user)=> user.username == username)
            if (!foundUser) throw new Error("User was not found!")
            bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                if (err) {
                    return done(Error("Error authenticating user"));
                }
                if (!isMatch) {
                    return done(Error("Inncorrect login information"));
                }
                done(null, foundUser)
            })
        } catch (err) {
            return done(err)
    }
    })
)

// authentication function
const validateSessionID = (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.headers.cookie)
    if (req.headers.cookie) {
        next()
    } else {
        res.status(401).end()
    }
}

const loginAuthentication = (req: Request, res: Response, next: NextFunction) => {
    for (const user of userList) {
        if (req.body.username == user.username) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    next()
                } else {
                    res.status(401).send("user no match").end()
                }
            })
        }
    }
}
//------

app.get("/error", (req: Request, res: Response) => {
    res.sendStatus(401)
})

app.get("/", (req: Request, res: Response) => {
    res.send("hello world").end()
})

app.get("/api/user/list", (req: Request, res: Response) => {
    res.send(userList)
})

app.get("/api/todos/list", (req: Request, res: Response) => {
    res.send(todosList)
})

//logged in routes

app.get("/api/secret",validateSessionID, (req: Request, res: Response) => {
    res.status(200).end()
})

//-----

app.post("/api/user/register", (req: Request, res: Response) => {
    if (req.headers.cookie) {
        return res.redirect("/")
    }
    for (const user of userList) {
        if (req.body.username == user.username) return res.status(400).end()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            const newUser: User = {
                id: idCount,
                username: req.body.username,
                password: hash
            }
            userList.push(newUser)
            res.json(newUser)
            idCount++
        }) 
    })
})

app.post("/api/user/login",loginAuthentication, passport.authenticate('local', {failureRedirect: '/error'}), (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.cookie) {
        return res.redirect("/")
    }
    res.status(200).send("user match")
   
})

app.post("/api/todos",validateSessionID, (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        const obj: User = JSON.parse(JSON.stringify(req.user))
        for (const item of todosList) {
            if (item.id === obj.id) {
                item.todos.push(req.body.todo)
                return res.send(item)
            }
        }
        const newItem: Todo = {
            id: obj.id,
            todos: [req.body.todo]
        }
        todosList.push(newItem)
        return res.send(newItem)
    }
})

app.listen(port, () => {
    console.log("Server is running on port: "+port)
})