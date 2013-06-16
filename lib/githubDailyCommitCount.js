var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var gitConnection = require("gitHubConnection.js");
var dailyCommitStatParser = require("./dailyCommitStatParser.js");

(function(exports){
	"use strict";

	var CommitActivityQuery = function(repositoryRequest){
		var self = this;

		self.query = '/repos/'+repositoryRequest.owner+'/'+repositoryRequest.name+'/stats/commit_activity';
	};

	CommitActivityQuery.prototype.callback = function (commitStats){
		var self = this;

		console.log(commitStats);
		var dailyCommits = dailyCommitStatParser.parseCommits(commitStats,repositoryRequest.options);
		callback(dailyCommits);
	};

	exports.CommitActivityQuery = function(repositoryRequest){
		return new CommitActivityQuery(repositoryRequest);
	};

})(exports);