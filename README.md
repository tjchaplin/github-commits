#GitHub-Commits

  Framework to get users and organization commit stats from github

[![Build Status](https://travis-ci.org/tjchaplin/github-commits.png)](https://travis-ci.org/tjchaplin/github-commits)

##Purpose

  A simple framework to get users and organization commit stats from github.  Can filter stats by a date range. Can be used to integrate, git stats into a dashboard.

  Inspired by one of Fred George's talk on Programmer Anarchy, in which his team has a dashboard indicating commits for a week.

##Install

  `npm install github-commits`

##Examples

###Get Current Week GitHub repository commits for an org

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .currentWeekCommits()
              .toArray(function(repositories){
                console.log(repositories);
              });
  ```
  
###Sum Current Week Commits for an org

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .currentWeekCommits()
              .sumCommits(function(sum){
                console.log(sum);
              });
  ```
###Sum Open Issues for an org for current week commits

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .currentWeekCommits()
              .sumOpenIssues(function(sum){
                console.log(sum);
              });
  ```
  
###Get Commits for an org Until/Up to a Certain Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forUser("tjchaplin")
              .commitsUntil("2020-12-31T23:59:59Z")
              .toArray(function(repositories){
                console.log(repositories);
              });
  ```
  
###Sum Commits for an org Until/Up to a Certain Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsUntil("2020-12-31T23:59:59Z")
              .sumCommits(function(sum){
                console.log(sum);
              });
  ```
  
###Sum Open Issues for an org Until/Upa Certain Commit Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsUntil("2020-12-31T23:59:59Z")
              .sumOpenIssues(function(sum){
                console.log(sum);
              });
  ```
  
###Get Commits for an org Since a Certain Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("tjchaplin")
              .commitsSince("2013-01-01T23:59:59Z")
              .toArray(function(repositories){
                console.log(repositories);
              });
  ```
  
###Sum Commits for an org Since a Certain Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsSince("2013-01-01T23:59:59Z")
              .sumCommits(function(sum){
                console.log(sum);
              });
  ```
###Sum Open Issues for an org Since a Certain Commit Date

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsSince("2013-01-01T23:59:59Z")
              .sumOpenIssues(function(sum){
                console.log(sum);
              });
  ```
###Get Commits for an org between a Set of Dates

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("tjchaplin")
              .commitsBetween("2013-01-01T23:59:59Z","2020-12-31T23:59:59Z")
              .toArray(function(repositories){
                console.log(repositories);
              });
  ```
  
###Sum Commits for an org between a Set of Dates

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsBetween("2013-01-01T23:59:59Z","2020-12-31T23:59:59Z")
              .sumCommits(function(sum){
                console.log(sum);
              });
  ```
###Sum Open Issues for an org between a Set of Commit Dates

  ```javascript
  var GitHubCommits = require("github-commits");
  var gitHubCommits = new GitHubCommits();

  gitHubCommits.forOrg("github")
              .commitsBetween("2013-01-01T23:59:59Z","2020-12-31T23:59:59Z")
              .sumOpenIssues(function(sum){
                console.log(sum);
              });
  ```


###Specify an authorization key to connect with GitHub

  ```javascript
  var gitHubCommits = require("github-commits");
  
  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitConnection = gitHubCommits.Connect(apiAuthorizationKey);
  ```

###Specify an authorization key and Specific GitHub url to connect with

  ```javascript
  var gitHubCommits = require("github-commits");

  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitHubUrl = "https://api.github.com"
  var gitConnection = gitHubCommits.Connect(apiAuthorizationKey,gitHubUrl);
  ```

###Specify an enterprise or private GitHub instance

  ```javascript
  var gitHubCommits = require("github-commits");

  //Can specify the GitHub api authorization key for the private or enterprise instance
  var apiAuthorizationKey = "";
  var gitConnection = gitHubCommits.Connect(apiAuthorizationKey,"https://<ENTERPRISE-GITHUB-URL>");

  //the framework can be used the same as the default connection
  ```

###Other Examples

  For additional examples see the tests.  To run them:
  `npm test`
  
##Credits/Other Frameworks

###How To Get An Authorization Code With Curl

  `curl -d '{"scopes":["repo"],"note":"Help example"}' https://api.github.com/authorizations`
