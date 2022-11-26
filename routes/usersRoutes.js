const router = require('express').Router()
const Users = require('../models/Users')

// criação de usuários
router.post('/register',  async (req, res) => {

    const User = await new Users({
        name : req.body.txtName,
        email: req.body.txtEmail,
        password: req.body.txtPassword
    })
    User.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
  })

// parte do login
router.post('/login', async (req, res) => {

    const { email, password} = req.body

    const Find = await Users.find({ email, password })
    
    if (Find.length > 0) {
        res.redirect('/login')
    }else{
        res.json({ message: 'Usuário ou senha inválida!'})
    }

})
  module.exports = router