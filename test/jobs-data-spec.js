var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');

function resetJobs(callback) {
	mongoose.connection.collections['jobs'].drop(callback);
}

describe("get jobs", function() {
	it("should never be empty since jobs are seeded", function(done){
		mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/jobfinder', function() {
			resetJobs(function() {
				jobModel.seedJobs(function() {
					mongoose.model('Job').find({}).exec(function(error, jobsList) {
						expect(jobsList.length).to.be.at.least(1);
						done();
					});
				});
			});	
		});
	});
});