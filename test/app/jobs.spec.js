describe("posting jobs", function() {

	beforeEach(module('app'));

	it("should call /api/jobs with job data", inject(function($httpBackend, jobs) {
		var postRequestJob;
		var newJob = {title: "test title", description: "test description"};

		$httpBackend.whenPOST('/api/jobs', function(data) {
			postRequestJob = JSON.parse(data);
			expect(postRequestJob).to.not.be.empty;
			return true;
		}).respond(200);
		jobs.save(newJob);
		$httpBackend.flush();
	}));

});