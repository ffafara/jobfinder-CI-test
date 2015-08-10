var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../../models/Job');
var Promise = require('bluebird');
var jobsData = require("../../jobs-data.js");

function resetJobs() {
	return new Promise(function(resolve, reject) {
		mongoose.connection.collections['jobs'].drop(resolve, reject);
	});
}

describe("get jobs", function() {

	var jobs;

	before(function(done){
		jobsData.connectDB(process.env.MONGOLAB_URI || 'mongodb://localhost/jobfinder')
			.then(resetJobs)
			.then(jobsData.seedJobs)
			.then(jobsData.findJobs)
			.then(function(collection) {
				jobs = collection;
				done();
			});
	});

	after(function() {
		mongoose.connection.close();
	});

	it("should never be empty since jobs are seeded", function(){
		expect(jobs.length).to.be.at.least(1);
	});

	it("should have a job with a title", function() {
		expect(jobs[0].title).to.not.be.empty;
	});

	it("should have a job with a description", function() {
		expect(jobs[0].description).to.not.be.empty;
	});
});

describe("saveJob()", function() {

	before(function(done){
		jobsData.connectDB(process.env.MONGOLAB_URI || 'mongodb://localhost/jobfinder')
			.then(resetJobs)
			.then(done);
	});

	after(function(done) {
		resetJobs()
			.then(function() {
				mongoose.connection.close();
				done()
			});
	});

	it("should save job data in database and return created object with id", function(done) {
		var testJob = {title: "test title", description: "test description"};

		jobsData.saveJob(testJob)
			.then(function(result) {
				expect(result).to.include(testJob);
				expect(result['_id']).to.not.be.empty;
				done();
			})
			.catch(done);
	})


});