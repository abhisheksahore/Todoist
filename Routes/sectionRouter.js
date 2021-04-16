const express = require('express');
const auth = require('../middlewares/getToken');
const ProjectModel = require('../models/projectModel');
const SectionModel = require('../models/sectionModel');
const TaskModel = require('../models/taskModel');
const router = express.Router();



// POST - Creating a section
router.post('/section', auth, async (req, res) => {
    try {
        if (req.body.username === undefined) {
            res.status(400).json({message: "Send the username of the user in the body."});
        }
        const is_project_id_valid = await ProjectModel.find({_id: req.body.project_id});
        if (is_project_id_valid.length === 0) {
            res.status(400).json({message: "invalid project id"});
        }
        let project_id;
        if (req.body.project_id) {
            project_id = req.body.project_id;
        } else {
            project_id = null;
        }
        if (req.body.username && req.body.section_name) {
            const newSection = new SectionModel({
                user_name: req.body.username, 
                section_name: req.body.section_name,
                project_id: project_id
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
        if (req.params.section_id) {
            const getSection = await SectionModel.find({_id: req.params.section_id});
            const getSectionData = getSection[0];
            res.status(200).json(getSectionData);
        } else {
            res.status(400).json({message: "send section_id in url params"});
        }       
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})


// GET - getting all the sections 
router.get('/:username', auth, async (req, res)=> {
    try {
        if (req.params.username) {
            const getAllSection = await SectionModel.find({user_name: req.params.username});
            res.status(200).json(getAllSection);
        } else {
            res.status(400).json({message: "send the username with the url params"});
        }
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})


// PATCH - patching the section 
router.patch('/section/:section_id/:section_name', auth, async (req, res) => {
    try {
        if (!req.params.section_id) {
            res.status(400).json({message: "send the section id in url params"});
        }

        if (req.params.section_id && req.params.section_name) {
            await SectionModel.updateOne({_id: req.params.section_id}, {$set: {section_name: req.params.section_name}});
            const getUpdatedSection = await SectionModel.find({_id: req.params.section_id});
            const updatedSection = getUpdatedSection[0];
            res.status(200).json(updatedSection); 
        } else {
            res.status(400).json({message: "send the section name and section id in url params"});
        }
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})


// GET - getting all the tasks belong to a particular section
// router.get('/section/:section_id/tasks', auth, async (req, res) => {
//     try {
//         if (req.params.section_id) {
//             const getSection = await SectionModel.find({_id: req.params.section_id});
//             const tasks = getSection[0].task_ids.reduce( async (tasks, task_id) => {
//                 const getTask = await TaskModel.find({_id: task_id});
//                 tasks.push(getTask[0]);
//                 return tasks;
//             }, [])
//             res.status(200).json(tasks);
//         } else {
//             res.status(400).json({message: "send the section id in url params"});
//         }
//     } catch (error) {
//         res.status(500).json({message: "Internal server error"});
//     }
// })





// DELETE - deleting the section
router.delete('/section/:section_id', auth, async (req, res) => {
    try {
        if (req.params.section_id) {
            const deletedSection = await SectionModel.deleteOne({_id: req.params.section_id});
            res.status(200).json({message: "Section deleted successfully."});
        } else {
            res.status(400).json({message: "SEND THE SECTION ID IN URL PARAMS TO DELETE THE SECTION."});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;