var Enumerable = require("yaenumerable");
var validator = require("./validator.js");

(function(exports){
	"use strict";

	var GitHubStatParser = function(){};

	GitHubStatParser.prototype.parseCommitsPerDay = function(commitStat){
		var self = this;

		var firstDayOfCommitStats = new Date(commitStat.week*1000);

		var commitDays = Enumerable.FromArray(commitStat.days)
								.Select(function(item, index){ 
									return self.toDailyCommit(commitStat,index,item);
								})
								.ToArray();
		return commitDays;
	}; 

	GitHubStatParser.prototype.toDailyCommit = function(commitStat,dayOfWeek,numberOfCommits){
		var self = this;

		var firstDayOfCommitStats = new Date(commitStat.week*1000);

		var day = new Date(firstDayOfCommitStats);	
		var dateOfCommit = day.setDate(day.getDate() + dayOfWeek); 
		var dailyCommit = {date: new Date(dateOfCommit), commitCount: numberOfCommits};

		return dailyCommit;
	}; 

	exports.dailyCommits = function (githubCommitStats,options){
		var self = this;

		var githubCommitStatParser = new GitHubStatParser();

		var dailyCommits = Enumerable.FromArray(githubCommitStats)
									.SelectMany(function(commitStat){ 
										return githubCommitStatParser.parseCommitsPerDay(commitStat);
									})
									.Where(function(commitDay){
										return validator.hasValidDate(options,commitDay);
									})
									.ToArray();

		return dailyCommits;
	};

})(exports);