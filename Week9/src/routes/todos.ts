import express, {Express, Request, Response} from "express"
import passport from "../strategies/auth";
import Todo from "../models/Todo"

const router: Express = express();

router.get("/list", passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const reqUser = JSON.parse(JSON.stringify(req.user))
            const foundTodo = await Todo.findOne({ user: reqUser._id})
            if (foundTodo) {
                res.json({ items: foundTodo.items })
            } else {
                res.json({ items: [] })
            } 
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/", passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    try {
        if (req.user && req.body.items) {
            const reqUser = JSON.parse(JSON.stringify(req.user))
            const foundTodo = await Todo.findOne({ user: reqUser._id})
            if (foundTodo) {
                for (const item of req.body.items) {
                    foundTodo.items.push(item)
                }
                await foundTodo.save()
                res.sendStatus(200)
            } else {
                const newTodo = new Todo({
                    user: reqUser._id,
                    items: req.body.items
                })
                await newTodo.save()
                res.sendStatus(200)
            } 
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router
export default router