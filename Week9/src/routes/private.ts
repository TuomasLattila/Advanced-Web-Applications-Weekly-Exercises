import express, {Router, Request, Response} from "express"
import passport from "../strategies/auth";
const router: Router = express.Router()

router.get("/", passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    if (req.user) {
        res.json({ email: JSON.parse(JSON.stringify(req.user)).email})
    }
})

module.exports = router;
export default router;