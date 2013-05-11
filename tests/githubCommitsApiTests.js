var should = require('should');
var gitCommits = require("../lib/githubCommitsApi.js");
var enumerable = require("yaenumerable");

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


describe('When using git api',function(){
	this.timeout(60000);
	

	it("should be able to get repositories based on a username",function(onComplete){
		var gitConnection = gitCommits.Connect();

		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	

		gitConnection.getRepositories("tjchaplin",function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on a user owner",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getRepositories({name:"tjchaplin",type:"users"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on an org owner",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getRepositories({name:"github",type:"orgs"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});

	
	it("should be able to get commits by day",function(onComplete){

		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	

		gitConnection.getRepositoryDailyCommits("tjchaplin",{},function(data){
	 		data.length.should.equal(364);
			onComplete();			
		});
	});


	it("should be able to get commits given a since date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {sinceDate:new Date("Tue May 07 2013")};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(5);
			onComplete();			
		});

	});

	it("should be able to get commits given an until date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {untilDate:new Date("Tue May 07 2013")};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(359);
			onComplete();			
		});

	});


	it("should be able to get commits given a since and until date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {sinceDate:new Date("Tue May 09 2013"),untilDate:new Date()};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(3);
			onComplete();			
		});

	});

	it("should be able to get commit count given a repository",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getRepositoryDailyCommits = function(repository, options, callback){
			callback([{date: new Date(),commitCount: 1},
					  {date: new Date(),commitCount: 1}]);
		};	

		gitConnection.updateRepositoryCommitCount({name:"repository"},{},function(repository){
	 		repository.numberOfCommits.should.equal(2);
			onComplete();			
		});

	});

	it("should be able to sum all repository commits",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getRepositoryDailyCommits = function(repository, options, callback){
			callback([{date: new Date(),commitCount: 1},
					  {date: new Date(),commitCount: 1}]);
		};	
		var repositories = [{name:"repository1"},{name:"repository2"}]
		gitConnection.sumAllRepositoryCommits(repositories,{},function(repositories){
	 		repositories[0].numberOfCommits.should.equal(2);
	 		repositories[1].numberOfCommits.should.equal(2);
			onComplete();			
		});

	});

	// it("should be able to sum commits ",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	gitConnection.getDailyCommitCount("tjchaplin",{},function(data){
	// 		console.log(data);	
	//  		data.commitCount.should.equal(151);
	// 		onComplete();			
	// 	});

	// });



	// it("should be able to git commits ",function(onComplete){
	// 	loadTestData("sampleCommitActivity.json",function(data){
	// 		var fromDate = new Date();
	// 		var fromDateLastDayOfWeek = getLastDayOfWeek(new Date(fromDate));
	// 		var commits = [];

	// 		var getCommitsPerDay = function(commitStat){
	// 			var firstDayOfCommitStats = new Date(commitStat.week*1000);
	// 			var commitDays = enumerable.FromArray(commitStat.days)
	// 									.Select(function(item, index){ 
	// 										var day = new Date(firstDayOfCommitStats);	
	// 										var dateOfCommit = day.setDate(day.getDate() + index); 
	// 										return {date: new Date(dateOfCommit), commitCount: item};
	// 									})
	// 									.ToArray();
	// 			return commitDays;
	// 		};


	// 		var result = enumerable.FromArray(data)
	// 							.SelectMany(function(commitStat){ return getCommitsPerDay(commitStat); });

	// 		console.log(result);

	// 		var first = data[0];
	// 		var sunday = new Date(first.week*1000);
	// 		console.log(sunday);

	// 		var first = data[1];
	// 		var sunday = new Date(first.week*1000);
	// 		console.log(sunday);
	// 		onComplete();
	// 	});
	// });

	
	// it("should be able to get all commits by day",function(onComplete){

	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	gitConnection.getRepositoryCommitCountByDay("github-commits",{},function(data){
	//  		data.length.should.equal(364);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to sum commits ",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	gitConnection.getRepositoryCommitCountSumByDay({name:"github-commits"},{},function(data){
	//  		data.numberOfCommits.should.equal(151);
	// 		onComplete();			
	// 	});

	// });

	// it("should be able to sum commits given a since date ",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	gitConnection.getRepositoryCommitCountSumByDay({name:"github-commits"},{sinceDate:new Date("Tue May 07 2013")},function(data){
	//  		data.numberOfCommits.should.equal(2);
	// 		onComplete();			
	// 	});

	// });

	// it("should be able to sum commits given an until date ",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	gitConnection.getRepositoryCommitCountSumByDay({name:"github-commits"},{untilDate:new Date("Tue May 07 2013")},function(data){
	//  		data.numberOfCommits.should.equal(149);
	// 		onComplete();			
	// 	});

	// });

	// it("should be able to sum commits given an until date ",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
	// 	};	

	// 	var options = {sinceDate:new Date("Tue January 07 2013"),untilDate:new Date()};
	// 	gitConnection.getRepositoryCommitCountSumByDay({name:"github-commits"},options,function(data){
	//  		data.numberOfCommits.should.equal(25);
	// 		onComplete();			
	// 	});

	// });
	
	// it("should be able to get number of repository commits",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.makeRequest = function(url,callBack){
	// 		var sampleGitRepository = loadTestData("sampleGitCommits.json",callBack);
	// 	};	
	// 	gitConnection.getRepositoryCommits({name:"developer.github.com",owner:"github"},{},function(data){
	// 		data.numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to total commits for all user repositories",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.getOwnerRepositories = function(owner,callBack){
	// 		var sampleGitRepository = loadTestData("sampleRepositories.json",callBack);
	// 	};	
	// 	gitConnection.getRepositoryCommits = function(repository, options ,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommits.json",callBack);
	// 	};	
	// 	gitConnection.getAllRepositoryCommits({name:"tjchaplin",type:"users"},{},function(repositories){
	// 		repositories[0].numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to total commits for all repositories in an org",function(onComplete){
	// 	var gitConnection = gitCommits.Connect();
	// 	gitConnection.getOwnerRepositories = function(owner,callBack){
	// 		var sampleGitRepository = loadTestData("sampleRepositories.json",callBack);
	// 	};	
	// 	gitConnection.getRepositoryCommits = function(repository, options ,callBack){
	// 		var sampleGitRepository = loadTestData("sampleCommits.json",callBack);
	// 	};	
	// 	gitConnection.getAllRepositoryCommits({name:"github",type:"orgs"},{},function(repositories){
	// 		repositories[0].numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });
	
	// it("should return false when date value is not between the since and until dates",function(){
	// 	var gitConnection = gitCommits.Connect();
	// 	var sinceDate = new Date("2013-03-08T23:03:20Z");
	// 	var untilDate = new Date("2013-03-08T23:03:20Z");

	// 	var value = {date: new Date()}
	// 	var options = {sinceDate:sinceDate,untilDate:untilDate};
	// 	var result = gitConnection.optionCondition(options,value);

	// 	result.should.be.equal(false);
	// });
	
	// it("should return true if no options defined",function(){
	// 	var gitConnection = gitCommits.Connect();

	// 	var result = gitConnection.optionCondition();
		
	// 	result.should.be.equal(true);
	// });
	
});

