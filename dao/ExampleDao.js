const connectionFactory = require('../services/connectionFactory')
const knex = connectionFactory.knex;

module.exports = {
    listAll() {
        return knex('books')
            .limit(10);
    },

    insertBook(name, price) {
        return knex('books').insert({
            name,
            price
        })
    }
}