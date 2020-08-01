const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwtConfig = require("../config/jwtConfig");



const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const strategyParams = {
    secretOrKey: jwtConfig.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    const strategy = new Strategy(strategyParams, function (payload, next) {
        return next(null, true)
    });

    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", jwtConfig.jwtSession);
        }
    };
};