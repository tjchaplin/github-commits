var Enumerable = require("yaenumerable");

"use strict";

var AsyncRequest = module.exports = exports = function(){
	var self = this;

	self.requests = [];
	self.requestClient = undefined

	return self;
};

AsyncRequest.prototype.addRequest = function(requestUrl,requestCallback){
	var self = this;
	
	var request = {url:requestUrl,
				   callback:requestCallback};

	self.requests.push(request);
};

AsyncRequest.prototype.executeRequest = function(onAllRequestsComplete,currentRequestIndex,results){
	var self = this;
	if(!currentRequestIndex)
		currentRequestIndex = 0;

	if(currentRequestIndex >= self.requests.length){
		onAllRequestsComplete(results);
		return;
	}


	var currentRequest = self.requests[currentRequestIndex];
	self.requestClient.request(currentRequest.url,function(result){
		currentRequest.callback(result,function(updatedResult){
			results = updatedResult;
			self.executeRequest(onAllRequestsComplete,++currentRequestIndex,results);
		});
	});
};
