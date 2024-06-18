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

module.exports = router;