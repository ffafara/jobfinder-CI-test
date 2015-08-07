var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
	title:{type:String},
	description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
	Job.find({}).exec(function(error, collection) {
		if (collection.length === 0) {
			Job.create({title: 'Sales Person', description: 'you will fight dragons'});
			Job.create({title: 'Accountant', description: 'you will use the keyboard'});
			Job.create({title: 'Cook', description: 'you will use be making bagles'});
			Job.create({title: 'Waiter', description: 'you will be putting food on tables'});
		}
	});
};