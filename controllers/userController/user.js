
const winston = require('winston')
const jwt = require('jsonwebtoken')
const userDao = require('../../dao/UserDao')
const jwtConfig = require('../../config/jwtConfig')


exports.login = function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        winston.error('login -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }

    userDao.login(email, password).then(result => {

        if (!result || result.length <= 0) {

            winston.info('login->  *Unauthorized*')
            return res.status(401).json({
                status: 401,
                message: "Unauthorized - User not existent or  password is not valid"
            })
        } else {
            winston.info('login->  *The request is OK*')

            const payload = { id: result[0].id };
            const token = jwt.sign(payload, jwtConfig.jwtSecret);
            return res.status(200).json({
                status: 200,
                message: "Sucessfuly - The request is OK ",
                token: token
            })
        }
    })

}


exports.register = function (req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        winston.error('register -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }

    return userDao.registerUser(name, email, password)
        .then(result => {
            winston.info(`User -> registerUser - *Successfuully new resource is created with id ${result}*`)
            return res.status(201).json({
                status: 201,
                message: "Successfuully new resource is created with id " + result
            })

        })
        .catch(error => {

            winston.error(`User -> registerUser - *Internal Server error - ${error}*`)
            return res.status(500).json({
                status: 500,
                message: "Internal Server error - " + error
            })
        })
}
