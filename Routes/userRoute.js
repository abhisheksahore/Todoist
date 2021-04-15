const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const auth = require('../middlewares/getToken');

// Importing models
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/signup', async(req, res) => {
    try {
        
        if (req.body.username && req.body.email && req.body.password) {
            const user_does_exist = await UserModel.find({email: req.body.email})
            console.log('USER_DOES_EXIST',user_does_exist);
            if (user_does_exist.length === 0) {
                
                const secret_salt = await bcrypt.genSalt();
                const hashed_password = await bcrypt.hash(req.body.password, secret_salt);
                console.log('a');
                console.log(req.body)
                const newUser = new UserModel({
                    username: req.body.username,
                    password: hashed_password,
                    email: req.body.email,
                })
                console.log('b')
                const createdUser = await newUser.save();
                res.status(200).json(createdUser);
            } else {
                res.status(400).json({msg: "email already exists"});
            }
        } else {
            res.status(400).json({message: "provide email and password."});
        }
    } catch (error) {
        console.error(error)
        res.status(404).json({error})
    }
})


router.post('/checkUsername', async (req, res) => {
    try {
        if (req.body.username) {
            const does_username_exists = await UserModel.find({username: req.body.username});
            if (does_username_exists.length === 0) {
                res.status(200).json({does_username_exists: false});
            } else {
                res.status(200).json({does_username_exists: true});
            }
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
})



router.post('/login', async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            // console.log(SECRET_KEY)
            
            jwt.sign(req.body, SECRET_KEY, async (err, token) => {
                if (err) {
                    res.status(404).send(err);
                }
                // console.log(username_or_email);
                console.log(req.body.username);
                let does_username_exists;
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.username)) {
                    
                    does_username_exists = await UserModel.find({ email: req.body.username});

                } else {
                    does_username_exists = await UserModel.find({ username: req.body.username});
                }
                console.log('Does_username_exists',does_username_exists);
                if (does_username_exists.length === 1) {
                    console.log(does_username_exists);
                    if (await bcrypt.compare(req.body.password, does_username_exists[0].password)) {
                        // console.log("a");
                        const user_data = does_username_exists[0];
                        res.status(200).json({user_data, token});
                    } else {
                        res.status(400).json({message: "Wrong password!"});
                    }
                } else {
                    res.status(401).json({message: "User not found"});
                }
            })
            // console.log(req.body);

        } else {
            res.status(400).json({message: "Please provide username and password."});
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({message: error});
    }
})

router.get('/user', auth, async (req, res) => {
    
    try {
        let getUser;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.username)) {
            getUser = await UserModel.find({ email: req.username});
        } else {
            getUser = await UserModel.find({ username: req.username});
        }
        console.log(getUser[0]._id)
        const user = getUser[0];
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(404).json({message: "error"})
    }
})

router.delete('/deleteUser', auth, async (req, res)=> {
    try {
        let getUser;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.username)) {
            getUser = await UserModel.deleteOne({ "email": req.username});
        } else {
            getUser = await UserModel.deleteOne({ "username": req.username});
        }

        res.status(200).json({message: "User successfully deleted."});
    } catch (error) {
        res.status(500).json({message: "Error in completing the request."})
    }
})

router.patch('/updateUser', auth, async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Error in completing the request."});
    }
})

module.exports = router;