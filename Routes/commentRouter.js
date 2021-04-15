const express = require('express');
const auth = require('../middlewares/getToken');
const CommentModel = require('../models/commentModel');




const router = express.Router();


router.post('/comment', auth, async (req, res) => {
    try {
        if (req.body.username && req.body.comment_text && req.body.task_id) {
            const newComment = new CommentModel({
                commented_by: req.body.username,
                comment_text: req.body.comment_text,
                task_id: req.body.task_id
            });
            const commentCreated = await newComment.save();
            res.status(200).json(commentCreated);
        } else {
            res.status(400).json({message: "send the username, task_id, comment_by and comment text in the request body"});
        }     
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})


// GET - getting all the comments belonging to a particular task.
router.get('/:task_id', auth, async (req, res) => {
    try {
        if (req.params.task_id) {
            const getAllComments = await CommentModel.find({task_id: req.params.task_id});
            res.status(200).json(getAllComments);
        } else {
            res.status(400).json({message: "send the task_id to fetch all the comments belonging to that task"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})


// UPDATE - update the comment
router.patch('/:username/:comment_id', auth, async (req, res) => {
    try {
        if (req.params.username && req.params.comment_id && req.body.comment_text) {
            await CommentModel.updateOne({commented_by: req.params.username, _id: req.params.comment_id}, {$set: {comment_text: req.body.comment_text}});
            const getUpdatedComment = await CommentModel.find({_id: req.params.comment_id});
            const updatedComment = getUpdatedComment[0]; 
            res.status(200).json(updatedComment);           
        } else {
            res.status(400).json({message: "send the username of the person who wants to edit this comment and also the comment id in the url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})


// DELETE - delete a comment.

router.delete('/:username/:comment_id', auth, async (req, res) => {
    try {
        if (req.params.username && req.params.comment_id) {
            const deletedComment = await CommentModel.deleteOne({commented_by: req.params.username, _id: req.params.comment_id});
            res.status(200).json(deletedComment);
        } else {
            res.status(400).json({message: "send the username and the comment_id in url params"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})



module.exports = router;