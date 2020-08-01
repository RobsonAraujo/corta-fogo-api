
const exampleDao = require('../../dao/ExampleDao')
const winston = require('winston')




// Example get
exports.listAllbooks = function (req, res) {
    return exampleDao.listAll().then(result => {

        if (!result || result.length <= 0) {

            winston.info('example-> listAll *Successfully -  not result*')
            return res.status(200).json({
                status: 200,
                message: "Successfully -  not result"
            })
        } else {
            winston.info('example-> listAll *The request is OK*')
            return res.status(200).json({
                status: 200,
                message: "The request is OK ",
                data: result
            })
        }
    }).catch(error => {
        winston.error(`example-> listAll *${error}*`)
        return res.status(500).json({
            status: 500,
            message: "Internal Server error - " + error
        })
    })

}

// example post

exports.saveBook = function (req, res) {
    const { name, price } = req.body;

    if (!name || !price) {
        winston.error('example -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }


    return exampleDao.insertBook(name, price)
        .then(result => {
            winston.info(`example -> insertBook - *Successfuully new resource is created with id ${result}*`)
            return res.status(201).json({
                status: 201,
                message: "Successfuully new resource is created with id " + result
            })

        })
        .catch(error => {

            winston.error(`example -> insertBook - *Internal Server error - ${error}*`)
            return res.status(500).json({
                status: 500,
                message: "Internal Server error - " + error
            })
        })
}
