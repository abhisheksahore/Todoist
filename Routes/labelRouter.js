const express = require('express');
const LabelModel = require('../models/labelModel');
const auth = require('../middlewares/getToken');

const router = express.Router();


router.post('/label', auth, async (req, res) => {
    try {
        if (req.body.username && req.body.label_name) {
            const does_label_exists = await LabelModel.find({label_name: req.body.label_name});
            if (does_label_exists.length === 0) {
                const newLabel = new LabelModel({
                    label_name: req.body.label_name,
                    user_name: req.body.username, 
                    label_color: req.body.label_color
                })
                const labelCreated = await newLabel.save();
                res.status(200).json(labelCreated);
            } else {
                res.status(400).json({ message: "Label already exists."});
            }
        } else {
            res.status(400).json({message: "send the username and label_name for the label in request body"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error."});
    }
})

//  GET -getting all the labels belong to a user.

router.get('/:username', auth, async (req, res) => {
    try {
        if (req.params.username) {
            const getAllLabel = await LabelModel.find({user_name: req.params.username})
            res.status(200).json(getAllLabel);
        } else {
            res.status(400).json({message: "send the username to fetch the label of that user in url params."});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error."});
    }
})



// GET - getting label by name.
router.get('/:username/:label_name', auth, async (req, res) => {
    try {
        if (req.params.username && req.params.label_name) {
            const getLabel = await LabelModel.find({label_name: req.params.label_name});
            const label = getLabel[0];
            res.status(200).json(label);
        } else {
            res.status(400).json({message: "send the username and the label name to search in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
    }
})


// DELETE - deleting a label.

router.delete('/label/:username/:label_name', auth, async (req, res) => {
    try {
        if (req.params.username && req.params.label_name) {
            const deletedLabel = await LabelModel.deleteOne({user_name: req.params.username, label_name: req.params.label_name});
            res.status(200).json(deletedLabel);
        } else {
            res.status(400).json({message: "send username and label name to delete the label in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server error."})
    }
})


// PATCH - updating the label
router.patch('/label/:id', auth, async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            if (req.body.label_name) {
                await LabelModel.updateOne({_id: id}, {$set: {label_name: req.body.label_name}});
            }
            if (req.body.label_color) {
                await LabelModel.updateOne({_id: id}, {$set: {label_color: req.body.label_color}});
            }
            const getUpdatedLabel = await LabelModel.find({_id: id});
            const updatedLabel = getUpdatedLabel[0];
            res.status(200).json(updatedLabel);
        } else {
            res.status(400).json({message: "send label id to update the label in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server error."})
    }
})

module.exports = router;