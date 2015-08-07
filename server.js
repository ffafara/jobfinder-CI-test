var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require("./jobs-data.js");

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
	jobsData.findJobs({}).then(function(collection) {
		res.send(collection);
	});
});

app.get('*', function(req, res) {
	res.render('index');
});

jobsData.connectDB(process.env.MONGOLAB_URI || 'mongodb://localhost/jobfinder')
	.then(function() {
		console.log("successfully connected to mongodb!");
		jobsData.seedJobs();
	});

app.listen(process.env.PORT || 3000);
