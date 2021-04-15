const express = require('express');
const auth = require('../middlewares/getToken');
const SectionModel = require('../models/sectionModel');
const router = express.Router();



// POST - Creating a section
router.post('/section', auth, async (req, res) => {
    try {
        if (req.body.username === undefined) {
            res.status(400).json({message: "Send the username of the user in the body."});
        }
        if (req.body.username && req.body.section_name) {
            const newSection = new SectionModel({
                user_name: req.body.username, 
                section_name: req.body.section_name
            }) 
            const SectionCreated = await newSection.save();
            res.status(200).json({SectionCreated});
        } else {
            res.status(400).json({message: "send username and section_name in request body."})
        }
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})


// GET - Getting a section
router.get('/section/:section_id', auth, async (req, res) => {
    try {
                
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})

module.exports = router;