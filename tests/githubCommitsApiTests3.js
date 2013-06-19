var should = require('should');
var GitCommits = require("../lib/githubCommitsApi.js");
var enumerable = require("yaenumerable");
var async = require('async');

var fs = require('fs');
 
var loadTestData = function(fileName,onLoaded){
	var file = __dirname + "/"+fileName;
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) {
	    console.log('Error: ' + err);
	    return;
	  }
	  data = JSON.parse(data);
	  onLoaded(data);
	});
}

var fakeRequestClient = function(mockRequst){
	var self = this;
	self.url = undefined;

	self.request = function(url,callback){
		self.url = url;
		var url = url.slice(0,url.indexOf("?"));
		
		var fileName = mockRequst[url];

		if(!fileName)
			return callback();

		loadTestData(fileName,function(data){

			callback(data);		
		});
	};
	return self;
};
		//var gitConnection = gitCommits.Connect();
		
		// gitConnection.userRequest("tjchaplin")
		// 			.repositories()
		//			.commits()
		// 			.from("jkjklj").to("1jljlj")
		// 			.forCurrent("week")	
		// 			.top(5,function(commiter){return commiter.commitCount});
		// 			.sum(function(repository){return repository.commitCount},funcition(onComplete){},function(onError){});
		//			.
// describe('When using git api',function(){
// 	this.timeout(60000);
	
// 	it("should be able to get repositories based on a username",function(onComplete){


// 		var gitConnection = gitCommits.Connect();
// 		var result = gitConnection.user("tjchaplin");
// 		console.log(result);
// 		onComplete();
// 	});
// });
// describe('When getting user repositories',function(){
// 	it("should be able to get repositories based on a username",function(onComplete){
// 		async.series([function(callback){
// 			console.log("1");
// 			setTimeout(function() {
// 				console.log("In timeout 1");
// 				callback();				
// 			}, 10);

// 		},function(callback){
// 			console.log("2");
// 			callback();
// 			onComplete();
// 		}
// 			]);
		
// 	});
// });
// describe('When getting user repositories',function(){
// 	it("should be able to get repositories based on a username",function(onComplete){
// 		var f1 = function(callback){
// 			console.log("1");
// 			setTimeout(function() {
// 				console.log("In timeout 1");
// 				callback();				
// 			}, 10);

// 		};
// 		var f2 = function(callback){
// 			console.log("2");
// 			callback();
// 			onComplete();
// 		};
// 		async.series([f1,f2]);
		
// 	});
// });

describe('When getting current week commits',function(){
	it("should be able to get commits",function(onComplete){

		var mockRequst={};
		mockRequst["https://api.github.com/repos/tjchaplin/scarlet/commits"] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.currentWeekCommits([{name:"scarlet"}])
					.toArray(function(repositories){
						repositories[0].commitCount.should.eql(30);
						onComplete();
					});
	});
});

describe('When getting current week commits',function(){
	it("should be able to sum commits",function(onComplete){

		var mockRequst={};
		mockRequst["https://api.github.com/repos/tjchaplin/scarlet/commits"] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.currentWeekCommits([{name:"scarlet"}])
					  .sum(function(repository){
					  		return repository.commitCount;
					  	}
					  	,function(sum){
					  		sum.should.be.eql(30);
							onComplete();
					  });
	});
});

// describe('When getting user repositories',function(){
// 	it("should be able to sum open issues",function(onComplete){
// 		var gitConnection = gitCommits.Connect();
// 		var mockRequst={};
// 		mockRequst["https://api.github.com/User/tjchaplin/repos"] = "sampleGitRepositories.json";

// 		gitConnection.requestClient = new fakeRequestClient(mockRequst);

// 		gitConnection.user("tjchaplin")
// 					  .repositories()
// 					  .sum(function(repository){return repository.openIssues;}
// 					  	,function(sum){
// 					  		sum.should.be.eql(10);
// 							onComplete();
// 					  });
// 	});
// });

// describe('When getting user repositories',function(){
// 	it("should be able to get repositories based on a username",function(onComplete){
// 		var gitConnection = gitCommits.Connect();
// 		var mockRequst={};
// 		mockRequst["https://api.github.com/User/tjchaplin/repos"] = "sampleGitRepositories.json";

// 		gitConnection.requestClient = new fakeRequestClient(mockRequst);

// 		gitConnection.user("tjchaplin")
// 					  .repositories()
// 					  .toArray(function(repositories){
// 					  	console.log(repositories);
// 					  	repositories.length.should.be.eql(10);
// 						onComplete();
// 					  });
// 	});
// });
// describe('When getting user repositories commits',function(){
// 	it("should be able to get commits",function(onComplete){
// 		var gitConnection = gitCommits.Connect();
// 		var mockRequst={};
// 		mockRequst["https://api.github.com/User/tjchaplin/repos"] = "sampleRepositories.json";
// 		mockRequst["https://api.github.com/repos/tjchaplin/cqrs-journey-code/commits"] = "sampleGitRepositories.json";

// 		gitConnection.requestClient = new fakeRequestClient(mockRequst);

// 		gitConnection.user("tjchaplin")
// 					  .repositories()
// 					  .toArray(function(repositories){
// 					  	repositories.length.should.be.eql(1);
// 						onComplete();
// 					  });
// 	});
// });
