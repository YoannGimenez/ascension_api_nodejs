const User = require('../models/User');

exports.findAll = async (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200)
            res.send(users)
        })
        .catch(err => console.log(err))
}



