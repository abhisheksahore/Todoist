const express = require('express');
const auth = require('../middlewares/getToken');
const SubtaskModel = require('../models/subtaskModel')
const TaskModel = require('../models/taskModel');



const router = express.Router();

router.post('/subtask', auth, async(req, res) => {
    try {
        if (req.body.subtask_due_date === undefined) {
            subtask_due_date = null;
        }
        if (req.body.subtask_name && req.body.task_id) {
            const newSubtask = new SubtaskModel({
                subtask_name: req.body.subtask_name,
                task_id : req.body.task_id,
                subtask_due_date: req.body.subtask_due_date,
                priority: req.body.priority
            })
            const subtaskCreated = await newSubtask.save();
            res.status(200).json(subtaskCreated);
        } else {
            res.status(400).json({message: "send the subtask name and task_id in request body."});
        }
    } catch (error) {
        res.status(500).json({message: "Error in completing the request."});
    }
})


// GET - getting all the subtasks of a task.
router.get('/task/:task_id/subtasks', auth, async (req, res) => {
    try {
        if (req.params.task_id) {
            const id = req.params.task_id;
            const getSubtask = await SubtaskModel.find({task_id: id});
            const subtasks = getSubtask[0];
            res.status(200).json(subtasks);
        } else {
            res.status(400).json({message: "send the task id in url parameter"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})



// GET - getting a subtask of a task 
router.get('/subtask/:task_id/:subtask_id', auth, async (req, res) => {
    try {
        if (req.params.task_id && req.params.subtask_id) {
            const tid = req.params.task_id;
            const stid = req.params.subtask_id;
            const getSubtask = await SubtaskModel.find({task_id: tid, _id: stid});
            const subtask = getSubtask[0];
            res.status(200).json(subtask);
        } else {
            res.status(400).json({message: "send the task id and subtask id in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})




// PATCH - patching a subtask.

router.patch('/subtask/:stid', auth, async (req, res) => {
    try {
        if (req.params.stid) {
            const id = req.params.stid;
            if (req.body.subtask_name) {
                await SubtaskModel.updateOne({_id: id}, {$set: {subtask_name: req.body.subtask_name}});
            }
            if (req.body.completed) {
                await SubtaskModel.updateOne({_id: id}, {$set: {completed: req.body.completed}});
            }
            if (req.body.subtask_due_date) {
                await SubtaskModel.updateOne({_id: id}, {$set: {subtask_due_date: req.body.subtask_due_date}}); 
            }
            if (req.body.priority) {
                await SubtaskModel.updateOne({_id: id}, {$set: {priority: req.body.priority}}); 
            }
            const getUpdatedSubtask = await SubtaskModel.find({_id: id});
            const updatedSubtask = getUpdatedSubtask[0];
            res.status(200).json(updatedSubtask);
        } else {
            res.status(400).json({message:"send the subtask id in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})



// DELETE - deleting a subtask.
router.delete('/subtask/:tid/:stid', auth, async (req, res)=> {
    try {
        if (req.params.tid && req.params.stid) {
            const deletedSubtask = await SubtaskModel.deleteOne({_id: req.params.stid, task_id: req.params.tid});
            res.status(200).json(deletedSubtask);
        } else {
            res.status(400).json({message: "send the task_id and the subtask_id in the url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;