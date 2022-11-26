//config inicial
const mongoose = require('mongoose')

//config users para mongodb
const Users = mongoose.model('Users', {
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = Users
