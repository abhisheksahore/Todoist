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
            // console.log(user_does_exist);
            if (user_does_exist.length === 0) {
                
                const secret_salt = await bcrypt.genSalt();
                const hashed_password = await bcrypt.hash(req.body.password, secret_salt);
                console.log('a');
                console.log(req.body.preferences.date_time_format)
                const newUser = new UserModel({
                    username: req.body.username,
                    password: hashed_password,
                    email: req.body.email,
                    preferences: {
                        theme: req.body.preferences.theme,
                        date_time_format: {
                            time_zone: req.body.preferences.date_time_format.time_zone,
                            date_format: req.body.preferences.date_time_format.date_format,
                            time_format: req.body.preferences.date_time_format.time_format
                        },
                        reminder_prefs: {
                            email: req.body.preferences.reminder_prefs.email,
                            desktop: req.body.preferences.reminder_prefs.desktop,
                            should_remind: req.body.preferences.reminder_prefs.should_remind,
                            remind_before: req.body.preferences.reminder_prefs.remind_before
                        }
                    }
                })
                console.log('b')
                const createdUser = await newUser.save();
                res.status(200).json(createdUser);
            } else {
                res.status(400).json({msg: "email already exists"});
            }
        } else {
            res.status(400).json({message: "provide email and passworrd."});
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
                    console.log(does_username_exists);3
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

router.get('/', auth, (req, res) => {
    res.send('hello');
})

router.get('/testing', (req, res)=> {
    res.status(401).send("chal raha hai");
})

module.exports = router;