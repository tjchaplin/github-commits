var should = require('should');
var githubRepositoryConverter = require("../lib/githubRepositoryConverter.js");
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

describe('When converting a githhub repository',function(){

	it("should be able to convert a single repository",function(onComplete){
		loadTestData("sampleGitRepositories.json",function(gitHubRepositories){
			var githubRepository = gitHubRepositories[0];
			var repository = githubRepositoryConverter.convert(githubRepository);

			repository.name.should.be.equal(githubRepository.name);
			onComplete();
		});
	});

	it("should be able to convert a multiple repositories",function(onComplete){
		loadTestData("sampleGitRepositories.json",function(gitHubRepositories){
			var repositories = githubRepositoryConverter.convertAll(gitHubRepositories);

			repositories.length.should.be.equal(10);
			onComplete();
		});
	});	
});

