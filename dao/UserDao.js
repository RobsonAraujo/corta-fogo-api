const connectionFactory = require('../services/connectionFactory')
const knex = connectionFactory.knex;
const security = require('../services/security')

module.exports = {
    registerUser(name, email, password) {

        return security.generateBcryptHash(password).then(passwordHash =>
            knex('users').insert({ name, email, password: passwordHash })
        )

    },

    login(email, password) {
        return (async () => {
            const user = await knex('users').where({ email }).limit(1)
            if (!user || user.length == 0) { return null }
            const passwordValid = await security.compareBcryptPassword(password, user[0].password)
            if (passwordValid) {
                return user
            }

            return null
        })()

    }

}