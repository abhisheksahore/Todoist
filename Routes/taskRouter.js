const express = require('express');
const TaskModel = require('../models/taskModel');
const UserModel = require('../models/userModel');
const auth = require('../middlewares/getToken');

const router = express.Router();

router.post('/task', auth, async (req, res) => {
    try {
        if (req.body.username === undefined) {
            res.status(400).json({message: "Send the username of the user in the body."});
        }

        if (req.body.username && req.body.task_name && req.body.directly_in_project && req.body.in_section) {
            const newTask = new TaskModel({
                user_name: req.body.username,
                task_name: req.body.task_name,
                in_section: req.body.in_section,
                directly_in_project: req.body.directly_in_project,
                task_due_date: req.body.a
            })
            const taskCreated = await newTask.save();
            res.status(200).json(taskCreated);
        } else {
            res.status(400).json({message: "provide the required field."})
        }     
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



router.get('/task/:task_id', auth, async (req, res) => {
    try {
        if (req.params.task_id) {
            const getTask = await TaskModel.find({"_id": req.params.task_id});
            console.log(getTask);
            let task = getTask[0];
            res.status(200).json({task});
        } else {
            res.status(400).json({message: "send the task_id in url params"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
})

router.get('/:username', auth, async (req, res) => {
    try {
        if (req.params.username === undefined) {
            res.status(400).json({message: "Send the username of the user in the url params."});
        } else {
            const getAllTasks = await TaskModel.find({user_name: req.params .username});
            res.status(200).json(getAllTasks);
        }
    } catch (error) {
        res.status(500).json({error});
    }
})


router.get('/:username/today', auth, async (req, res) => {
    try {
        
        const today = new Date();
        const midnight = new Date(today.setHours(23,0,0,0));
        const todayTask = await TaskModel.find({ task_due_date: {
                $lt: midnight
            },
            user_name: req.params.username
        });
        
        res.status(200).json(todayTask);
    } catch (error) {
        res.status(500).json({error});
    }
})


// PATCH - patching a task.
router.patch('/:username/:task_id', auth, async (req, res) => {
    // task_name,
    // completed,
    // task_due_date,
    // priority,

    try {
        const flag = false;
        if (req.body.task_name) {
            await TaskModel.updateOne({user_name: req.params.username, _id: req.params.task_id}, {$set: {task_name: req.body.task_name}});
            flag = true;
        }       
        if (req.body.completed) {
            await TaskModel.updateOne({user_name: req.params.username, _id: req.params.task_id}, {$set: {completed: req.body.completed}});
            flag = true;
        }       
        if (req.body.task_due_date) {
            await TaskModel.updateOne({user_name: req.params.username, _id: req.params.task_id}, {$set: {task_due_date: req.body.task_due_date}});
            flag = true;
        }       
        if (req.body.priority) {
            await TaskModel.updateOne({user_name: req.params.username, _id: req.params.task_id}, {$set: {priority: req.body.priority}});
            flag = true;
        }   

        if (flag) {
            const getUpdatedTask = await TaskModel.find({user_name: req.params.username, _id: req.params.task_id});
            const updatedTask = getUpdatedTask[0];
            res.status(200).json(updatedTask);
        }

    } catch (error) {
        res.status(500).json({message: "Error in completing the request."})
    }

})

router.delete('/task/:task_id', auth, async (req, res) => {
    try {
        const deletedTask = await TaskModel.deleteOne({"_id": req.params.task_id});
        console.log(deletedTask);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({error});
    }
})

module.exports = router;