import express, { Router, Request, Response, NextFunction } from "express"
import passport from "../strategies/auth"
const router: Router = express.Router()

router.get('/auth', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', function(err: any, user: any) {
        if (err) { return res.send(
            `
            <a href="/register.html">Register</a>
            <br>
            <a href="/login.html">Login</a>
            `
        ) }
        if (!user) { return res.send(
            `
            <a href="/register.html">Register</a>
            <br>
            <a href="/login.html">Login</a>
            `
        ) }
        res.send(
            `
            <h1> Profile
            <h2> ${user.email} </h2>
            <br>
            <input id="add-item" type="text" placeholder="Add todo here">
            <br>
            <button id="logout"> Logout </button>
            <ol id="items">
            `
        );
    })(req, res, next);
})

router.get('/', (req: Request, res: Response) => {
    res.render('index')
})

router.get('/register.html', (req: Request, res: Response) => {
    res.render('register')
})

router.get('/login.html', (req: Request, res: Response) => {
    res.render('login')
})

module.exports = router
export default router