import express, {Router, Request, Response} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"

import User from "../models/User"

const router: Router = express.Router()

router.post('/register', 
    body('email').isString().isEmail(), 
    body('password').isString().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}), 
    async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
        return res.sendStatus(400)
    }
    try {
        if (req.body.email && req.body.password) {
            const foundUser = await User.findOne({email: req.body.email})
            if (!foundUser) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(req.body.password, salt, async (err, hash) => {
                        if (err) throw err;
                        const newUser = new User({
                            email: req.body.email,
                            password: hash
                        })
                        await newUser.save()
                        res.status(200).send(newUser)
                    })
                })
            } else {
                res.status(403).send("Email already in use! Try another.")
            }
        } else { 
            res.send("Bad credentials! Try again.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) {
            res.status(403).send("Wrong login information.")
        } else {
            bcrypt.compare(req.body.password, foundUser.password, (err, value) => {
                if (value) {
                    const secret: string = process.env.SECRET? process.env.SECRET : "myholysecret"
                    let token = jwt.sign({ email: foundUser.email }, secret)
                    if (token) {
                        res.send({
                            success: true,
                            token: token
                        })
                    }
                } else {
                    res.status(403).send("Wrong login information.")
                }
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
 
module.exports = router;
export default router;