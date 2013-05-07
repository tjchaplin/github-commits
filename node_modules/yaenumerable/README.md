#YAEnumerable

  Yet Another Enumerable Java Script Framework

[![Build Status](https://travis-ci.org/tjchaplin/YAEnumerable.png)](https://travis-ci.org/tjchaplin/YAEnumerable)

##Purpose

  To create and maintain a linq type JS framework.  See Credits/Other Frameworks for alternatives.

##Install

  `npm install YAEnumerable`

##Example

  ```javascript
  var Enumerable = require("YAEnumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  //aValues will now be [1,2,3]
  var aValues = Enumerable.Select(function(item){return item.a;}).ToArray();
  ```
  For additional examples see the tests.  To run them:
  `npm test`
  
##Credits/Other Frameworks
  
  * [enumerablejs - lukesmith's very comprehensive framework](https://github.com/lukesmith/enumerablejs.git)
  * [enumerable - VisionMedia TJ Holowaychuk](https://github.com/component/enumerable.git)
