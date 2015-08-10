var express = require('express');
var app = express();
var expect = require('chai').expect;
var request = require('supertest');
var Promise = require('bluebird');

var dataSavedJob;
var jobs = [
			{title: 'Sales Person', description: 'you will fight dragons'},
			{title: 'Accountant', description: 'you will use the keyboard'},
			{title: 'Cook', description: 'you will use be making bagles'},
			{title: 'Waiter', description: 'you will be putting food on tables'}
		];
var db = {
	failMode: false,
	saveJob: function(job) {
		dataSavedJob = job;
	},
	findJobs: function(query) {
		var deferred = Promise.pending();
		if (this.failMode) deferred.reject(new Error('something bad happened'));
		else deferred.resolve(jobs);
		return deferred.promise;
	}
};
var jobService = require('../jobs-service')(db, app);

describe("save jobs", function() {
	it("should validate that title is greater than 4 characters");

	it("should validate that title is less than 40 characters");

	it("should validate that description is greater than 4 characters");

	it("should validate that description is less than 250 characters");

	it("should pass the job to the database save", function(done) {
		var newJob = {title: 'Sales Person', description: 'you will fight dragons'};

		request(app).post('/api/jobs').send(newJob).end(function(err, res) {
			expect(dataSavedJob).to.deep.eql(newJob);
			done();	
		});
	});

	it("should return a status of 200 to the front end if the database saved");

	it("should return a job with id");

	it("should return an error if the database failed");

});

describe("get jobs", function() {

	it("should call database findJobs() and return jobs collection", function(done) {
		request(app).get('/api/jobs').end(function(err, res) {
			expect(res.body).to.deep.eql(jobs);
			done();
		});
	});

	it("should return a status of 200", function(done) {
		request(app)
			.get('/api/jobs')
			.expect(200, done)
	});

	it("should return a json object", function(done) {
		request(app)
			.get('/api/jobs')
			.expect('Content-Type', /json/, done)
	});

	it("should return an 500 error if database failed", function(done) {
		db.failMode = true;
		request(app)
			.get('/api/jobs')
			.expect(500, done)
	});

});