var url = require("url");
var https = require("https");
var Cache = require("./cache.js");
var GitHubCommits = require("./github-commits-api.js");

(function(){
	"use strict";
	var HttpsRequest = function(apiAuthorizationToken){
		this.authorizationToken = apiAuthorizationToken;
		this.cache = new Cache();
	};

	HttpsRequest.prototype.request = function(requestUrl,callback,onError){
		var self = this;

		var lastResponseData;
		var lastRequest = self.cache.getValue(requestUrl);
		var headers = {"User-Agent": "github-commits"};

		if(self.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+self.authorizationToken;

		if(lastRequest){
			headers["If-Modified-Since"] = lastRequest.lastRequestDate.toUTCString();
			lastResponseData = lastRequest.lastResponseData;
		}

		requestUrl=urlAppendMaxResultsPerPage(requestUrl);

		var requestParams = url.parse(requestUrl);
		requestParams.headers = headers;
		requestParams.method = "GET";
		
		self.retriableRequest(requestParams,lastResponseData,callback,onError,1,5);
	};

	HttpsRequest.prototype.retriableRequest = function(requestParams,lastResponseData,callback,onError,currentAttempt,maxAttempts)
	{
		var self = this;

		var request = https.request(requestParams, function (response) {
			var responseData = '';
			var errorMessage = '';
			response.setEncoding('utf8');

			if(!isValidResponse(response.statusCode)){
				errorMessage = invalidResponseErrorMessage(response.statusCode,requestParams.href,response.headers);
				if(onError)
					onError(errorMessage,lastResponseData);
				return;
			}

			if(shouldRetry(response.statusCode)){
				setTimeout(self.retriableRequest(requestParams,callback,currentAttempt++,maxAttempts),3000);
				return;
			}

			if(!hasBeenModified(response.statusCode)){
				if(callback)
					callback(lastResponseData);

				return;
			}

			response.on('data', function (chunk) {
				responseData = responseData + chunk;
			});

			response.on('end', function () {
				if (callback) 
					callback(JSON.parse(responseData));

				self.cache.forKey(requestParams.href)
							.setValue({
								lastRequestDate : new Date(),
								lastResponseData : JSON.parse(responseData)
							});
			});

			response.on('error',function(error){
				errorMessage = "error requestParams"+requestParams+" error:"+error;
				if(onError)
					onError(errorMessage,lastResponseData);
			});
            
		});
          
        request.end();
	};

	var invalidResponseErrorMessage = function(statusCode,url,headers){

		var errorMessage = "Invalid Response Code:"+statusCode+" when making request:"+url+" response headers:"+JSON.stringify(headers);

		var remainingRequests = parseInt(headers["x-ratelimit-remaining"],10);
		var allowedRequests = parseInt(headers["x-ratelimit-limit"],10);

		if(remainingRequests === 0)
			errorMessage = "Exceeded maximum allowed requests("+allowedRequests+") in the past hour.";

		return errorMessage;
	};

	var urlAppendMaxResultsPerPage = function(url){
		var requestParamater = "per_page=100";

		if(url.indexOf("?") >= 0)
			url += "&"+requestParamater;
		else
			url += "?"+requestParamater;

		return url;
	};

	var hasBeenModified = function(responseCode){
		if(responseCode === 304)
			return false;

		return true;
	};

	var isValidResponse = function(responseCode){
		if(responseCode === 403)
			return false;

		return true;
	};

	var shouldRetry = function(responseCode){
		if(responseCode === 202)
			return true;

		if(responseCode === 204)
			return true;

		return false;
	};

	module.exports = exports  =function(apiAuthorizationToken,apiUrl){
		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		return new GitHubCommits(new HttpsRequest(apiAuthorizationToken),apiUrl);
	};

})();