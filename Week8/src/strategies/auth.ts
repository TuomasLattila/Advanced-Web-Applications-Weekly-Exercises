import passport from "passport"
import { Strategy, ExtractJwt, JwtFromRequestFunction} from "passport-jwt"
import User from "../models/User"

interface optsType {
    jwtFromRequest: JwtFromRequestFunction,
    secretOrKey: string,
}
let opts: optsType = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET? process.env.SECRET : "myholysecret",
}

passport.use(new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findOne({ email: payload.email })
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error, false)
    }
}))

export default passport