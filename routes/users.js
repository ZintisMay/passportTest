const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => { res.render("login") })
router.get('/register', (req, res) => { res.render("register") })
router.post('/register', (req, res) => {

    const { name, email, password, password2 } = req.body
    console.log(name, email, password, password2)

    User.findOne({ email })
        .then(user => {
            if (user) {
                console.log("already exists")
            } else {

                const newUser = new User({ name, email, password })
                
                bcrypt.genSalt(10, (err, salt) => 
                	bcrypt.hash(newUser.password, salt, (err, hash) => {
                		if(err) throw err;
                		newUser.password - hash
                		newUser.save()
                		.then( user => {

                			res.send('redirect')
                			// res.redirect('/users/login')
                		})
                		.catch(err => console.log(err))
                }))
                
                // console.log(newUser)
                // res.send('new user')
            }
        })
        .catch(err => { 
        	console.log(err);
        	res.send('error findOne') 
        })
    
})

module.exports = router