var express = require('express');
var router = express.Router();
var taskList = require('../taskList')

router.post('/', function(req, res, next) {
	let existingName = false
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].name == req.body.name){
			taskList[i].todos.push(req.body.task)
			res.send("Todo added")
			existingName = true
		}
	}
	if (!existingName) {
		taskList.push({
			name: req.body.name,
			todos: [req.body.task]
		})
		res.send("User added")
	}
	//console.log(taskList)
});

module.exports = router;