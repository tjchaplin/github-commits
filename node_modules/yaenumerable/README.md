#YAEnumerable

  Yet Another Enumerable Java Script Framework

[![Build Status](https://travis-ci.org/tjchaplin/YAEnumerable.png)](https://travis-ci.org/tjchaplin/YAEnumerable)

##Purpose

  To create and maintain a linq type JS framework.  See Credits/Other Frameworks for alternatives.

##Install

  ```
  npm install yaenumerable
  ```

##Example
Each selector will at a minimum return an item and the index of the item.
The index is always the last item returned in the callback.  See tests for additional examples.


###Where Condition
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [{a:2},{a:3}]
  var aValues = Enumerable.FromArray(anArray)
                          .Where(function(item){return item.a > 1;})
                          .ToArray();
  ```

###Select
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [1,2,3]
  var aValues = Enumerable.FromArray(anArray)
                          .Select( function(item){ return item.a; } )
                          .ToArray();
  ```

###SelectMany
  Allows you to flatten an array
  
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [ {a:[1,2,3]}, {a:[4,5,6]}, {a:[7,8,9]} ];
  
  //Will return: [1,2,3,4,5,6,7,8,9]
  var flattenedArray = Enumerable.SelectMany(function(item){return item.a})
                                 .ToArray();
  ```

###First
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //if no function specified will return first item:{a:1}
  var firstObject = Enumerable.FromArray(anArray).First();
  
  //Since function is specfied to return a, will return 1
  var firstA = Enumerable.FromArray(anArray)
                            .First(function(item){return item.a;});
  ```

###Sum
  ```javascript
  var Enumerable = require("yaenumerable");

  //Sum without a selector
  //In this case it will return 6
  var sum = Enumerable.FromArray([1,2,3]).Sum();

  //When specified with a selector will return the sum of that item:
  //In this case it will return 6
  var sumOfA = Enumerable.FromArray([{a:1},{a:2},{a:3}])
                            .Sum(function(item){return item.a;});
  ```

###Count
  Count items in enumerable.  Example use is with an enumerable
  
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [1,2,3];
  
  //Will return 2
  var count = Enumerable.FromArray([1,2,3])
                        .Where(function(item){return item > 1;})
                        .Count();
  ```

###Any
  Determines if any items meet a condtion
  
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [1,2,3];
  
  //Will return true
  var hasItemGreaterThan1 = Enumerable.FromArray([1,2,3])
                        .Any(function(item){return item > 1;});
  
  //Can use with a selector as well
  var hasItemAGreaterThan1 = Enumerable.FromArray([{a:1},{a:2},{a:3}])
                        .Any(function(item){return item.a > 1;});
  
  ```

###ForEach
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [1,2,3]
  var aValues = Enumerable.FromArray(anArray)
                          .ForEach( function(item){/*Do something useful*/})
                          .ToArray();
  ```

###AsyncForEach
  Allows you to make async calls on each item in an array and get the results of all calls when each call is complete.
  
  ```javascript
  var Enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];

	var longProcess = function(item, onLongProcessComplete){
    //Some long process
    var result = item;
    onLongProcessComplete(result);
	};

	Enumerable.FromArray(anArray)
      			.AsyncForEach(longProcess,
                          function(results){ 
                            //results is an array with each updated item
                            onComplete(results);
                          });
  ```
  

###For additional examples see the tests.  To run them:
  ```
  npm test
  ```
  
##Credits/Other Frameworks
  
  * [enumerablejs - lukesmith's very comprehensive framework](https://github.com/lukesmith/enumerablejs.git)
  * [enumerable - VisionMedia TJ Holowaychuk](https://github.com/component/enumerable.git)
