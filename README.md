#Git-Commits

  Framework to get users and organization commit stats from github

[![Build Status](https://travis-ci.org/tjchaplin/github-commits.png)](https://travis-ci.org/tjchaplin/github-commits)

##Purpose

  A simple framework to get users and organization commit stats from github.  Can filter stats by a date range. Can be used to integrate, git stats into a dashboard.

  Inspired by one of Fred George's talk on Programmer Anarchy, in which his team has a dashboard indicating commits for a week.

##Install

  `npm install git-commits`

##Examples

###Get all GitHub repository commits for a user

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  var options = {};
  var owner = {name:"tjchaplin",type:"users"};
  gitConnection.getAllRepositoryCommits(owner,options,function(repositories){
      //repositories will be an array of all repositories for user "tjchaplin"
      //with a numberOfCommits defined for each repository
      console.log(repositories);    
  });
  ```

###Get all GitHub repository commits for an org

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  var options = {};
  var owner = {name:"github",type:"orgs"};
  gitConnection.getAllRepositoryCommits(owner,options,function(repositories){
      //repositories will be an array of all repositories for org
      //with a numberOfCommits defined for each repository
      console.log(repositories);    
  });
  ```
###Get all GitHub repository commits for a user with a date filter

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  var owner = {name:"tjchaplin",type:"users"};
  //options can contain any of number of the below properties
  var options = {sinceDate:"2013-05-05T00:00:00Z",untilDate : "2013-05-05T23:59:59Z"};

  gitConnection.getAllRepositoryCommits(owner,options,function(repositories){
      //repositories will be an array of all repositories for user
      //with a numberOfCommits defined for each repository
      console.log(repositories);    
  });
  ```

###Get all GitHub repository commits for an org with a date filter

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  var owner = {name:"github",type:"orgs"};
  //options can contain any of number of the below properties
  var options = {sinceDate:"2013-05-05T00:00:00Z",untilDate : "2013-05-05T23:59:59Z"};

  gitConnection.getAllRepositoryCommits(owner,options,function(repositories){
      //repositories will be an array of all repositories for the org
      //with numberOfCommits defined for each repository
      console.log(repositories);    
  });
  ```

###Get all GitHub repositories for a user

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  gitConnection.getOwnerRepositories("tjchaplin", function(repositories){
      //repositories will be an array of all repositories for user "tjchaplin"
      console.log(repositories);
  });

  //Same as above but using the owner object:{"name": "aGitUserName"}
  var owner = {name:"tjchaplin";
  gitConnection.getOwnerRepositories(owner, function(repositories){
      //repositories will be an array of all repositories for user "tjchaplin"
      console.log(repositories);
  });

  //Same as above but explicitly defining the owner object for a user type:{"name": "aGitUserName","type":"users"}
  var owner = {name:"tjchaplin",type:"users"};
  gitConnection.getOwnerRepositories(owner, function(repositories){
      //repositories will be an array of all repositories for user "tjchaplin"
      console.log(repositories);
  });
  ```

###Get all GitHub repositories for an org

  ```javascript
  var gitCommits = require("git-commits");
  var gitConnection = gitCommits.Connect();

  var owner = {name:"github",type:"orgs"};
  gitConnection.getOwnerRepositories({name:"github",type:"orgs"}, function(repositories){
      //repositories will be an array of all repositories for user "tjchaplin"
      console.log(repositories);
  });
  ```

###Specify an authorization key to connect with GitHub

  ```javascript
  var gitCommits = require("git-commits");
  
  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitConnection = gitCommits.Connect(apiAuthorizationKey);
  ```

###Specify an authorization key and Specific GitHub url to connect with

  ```javascript
  var gitCommits = require("git-commits");

  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitHubUrl = "https://api.github.com"
  var gitConnection = gitCommits.Connect(apiAuthorizationKey,gitHubUrl);
  ```

###Specify an enterprise or private GitHub instance

  ```javascript
  var gitCommits = require("git-commits");

  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitConnection = gitCommits.Connect(apiAuthorizationKey,"https://<ENTERPRISE-GITHUB-URL>");

  //the framework can be used the same as the default connection
  ```

###Other Examples

  For additional examples see the tests.  To run them:
  `npm test`
  
##Credits/Other Frameworks