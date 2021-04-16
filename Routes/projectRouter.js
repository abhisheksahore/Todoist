const express = require('express');
const ProjectModel = require('../models/projectModel');
const auth = require('../middlewares/getToken');
const TaskModel = require('../models/taskModel');
const SectionModel = require('../models/sectionModel');
const UserModel = require('../models/userModel');

const router = express.Router();



// POST - Creating the Project
router.post('/project', auth, async (req, res) => {
    try {
        if (req.body.username === undefined) {
            res.status(400).json({message: "Send the username of the user in the body."});
        }
        if (req.body.username && req.body.project_name) {
            const newProject = new ProjectModel({
                
                project_name: req.body.project_name
            })
            const projectCreated = await newProject.save();

            await UserModel.updateOne({username: req.body.username}, {$push: {projects: projectCreated._id}})
            res.status(200).json(projectCreated);
        } else {
            res.status(400).json({message: "send the username and project name in body of the request."});
        }
    } catch (error) {
        res.status(500).json({error});
    }
})

//  GET - getting a project 

router.get('/:project_id', auth, async (req, res)=> {
    try {
        if (req.params.project_id) {
            const getProject = await ProjectModel.find({_id: req.params.project_id});
            const getProjectObj = getProject[0]
            res.status(200).json(getProjectObj);
        } else {
            res.status(400).json({message: "send username and project_id in url params."})
        }
    } catch (error) {
        res.status(500).json({message: error.error});
    }
})


// GET - Getting all the projects belong to a particular user.
router.get('/:username', auth, async (req, res) => {
    try {
        const getUser = await UserModel.find({username: req.params.username});
        const user = getUser[0];
        const projects = user.projects.reduce(async (projects, id) => {
            const getProject = await ProjectModel.find({_id: id});
            projects.push(getProject[0]);
            return projects;
        }, [])
        res.status(200).json(projects);
    } catch (error) {
       res.status(500).json({error: error.message}); 
    }
})




// GET - Getting all the tasks directly belong to a particular project. 
// router.get('tasks/:username/:project_id', auth, async (req, res) => {
//     try {
//         if (req.params.username && req.params.project_id) { 
//             const getProject = await ProjectModel.find({user_name: req.params.username, _id: req.params.project_id});
//             const projectData = getProject[0];
//             const tasks = [];
//             projectData.task_ids.forEach(async task_id => {
//                 const getTask = await TaskModel.find({"_id": task_id, });
//                 tasks.push(getTask[0]);
//             })
//             res.status(200).json(tasks);
//         } else {
//             res.status(400).json({message: "send the username and project_id in the url params"});
//         }
//     } catch (error) {
//         res.status(500).json({error_message: error.message});
//     }
// })



// GET - Getting all the sections directly belong to a particular project.
router.get('sections/:username/:project_id', auth, async (req, res) => {
    try {
        if (req.params.username && req.params.project_id) {
            const getSectionsInProject = await SectionModel.find({project_id: req.params.project_id});
            const sections = getSectionsInProject[0].sections;
            res.status(200).json(sections);
        } else {
            res.status(400).json({message: "send the username and project_id in url params."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error_message: "error.error"})
    }
})



// PATCH - patching a project.
router.patch('/:username/:project_id', auth, async (req, res) => {
    try {

        const flag = false;
        if (req.body.project_name) {
            await ProjectModel.updateOne({user_name: req.params.username, _id: req.params.project_id}, {$set: {project_name: req.body.project_name}});
            flag = true;
        }        
        if (req.body.is_completed) {
            await ProjectModel.updateOne({user_name: req.params.username, _id: req.params.project_id}, {$set: {is_completed: req.body.is_completed}});
            flag = true;
        }        
        if (flag === true) {
            const getUpdatedProject = await ProjectModel.find({_id: req.params.project_id});
            const updatedProject = getUpdatedProject[0];
            res.status(200).json(updatedProject);
        }
    } catch (error) {
        res.status(500).json({message: "Error in completing the request."})
    }
})


router.delete('/:username/:project_id', auth, async (req, res)=> {
    try {
        if (req.params.project_id && req.params.username) {
            const deletedProject = await ProjectModel.deleteOne({user_name: req.params.username, _id: req.params.project_id});
            res.status(200).json(deletedProject);
        } else {
            res.status(400).json({message: "send the project_id in the url params."});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server ERROR_500"});
    }
})

module.exports = router;