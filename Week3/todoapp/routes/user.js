var express = require('express');
var router = express.Router();
var taskList = require('../taskList')

router.get('/:id', function(req, res, next) {
    let nameFound = false;
    for (let i = 0; i < taskList.length; i++) {
        if (req.params.id == taskList[i].name) {
            res.json(taskList[i])
            nameFound = true
        }
    }
    if (!nameFound) {
        res.json({name: req.params.id, msg: "User not found"})
    }
});

router.delete('/:id', function(req, res, next) {
    let nameFound = false;
    for (let i = 0; i < taskList.length; i++) {
        if (req.params.id == taskList[i].name) {
            taskList.splice(i, 1)
            res.json({msg: "User deleted"})
            nameFound = true
        }
    }
    if (!nameFound) {
        res.json({msg: "User not found"})
    }
})

router.put('/', function(req, res, next) {
    let taskFound = false;
    for (let i = 0; i < taskList.length; i++) {
        if (req.body.name == taskList[i].name) {
            for (let j = 0; j < taskList[i].todos.length; j++) {
                if (taskList[i].todos[j] == req.body.task) {
                    taskList[i].todos.splice(j, 1)
                    res.json({msg: "Task deleted"})
                    taskFound = true
                }
            }
        }
    }
    if (!taskFound) {
        res.json({msg: "User not found"})
    }
})

module.exports = router;