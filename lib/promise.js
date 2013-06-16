var nextTick;

if (typeof setImmediate === "function")
	nextTick = function(next){setImmediate(next)};
else if (typeof process !== "undefined" && process.nextTick)
	nextTick = function(next){process.nextTick};
else
	nextTick = function(next){ setTimeout(next, 0) };

(function(exports){
	"use strict";

	function Promise(promise) {
	    if (promise instanceof Promise) {
	    	console.log("using the promise");
	        return promise;
	    } else {
	        console.log("using handlers")
	        this.handlers = [];
	    }
	};

	Promise.prototype.then = function(onFulfilled, onRejected) {
	    var self = this;
	    
	    process.nextTick(function(){
		    self.handlers.push({
		        onFulfilled: onFulfilled,
		        onRejected: onRejected
	    	})
		});

	    return self;
	};

	Promise.prototype.value = {};

	Promise.prototype.resolve = function() {
		var self = this;
	    var handler = this.handlers.shift();
	    if (handler && handler.onFulfilled) {
	    	console.log("resolving"+JSON.stringify(arguments));
	        var last = handler.onFulfilled.apply(this, arguments);
	        console.log	("last:"+JSON.stringify(last));
	        if(this.handlers.length === 0)
	        	self.value = last;
	    }
	};

	Promise.prototype.reject = function() {
	    var handler = this.handlers.shift();
	    if (handler && handler.onRejected) {
	        handler.onRejected.apply(this, arguments);
	    }
	};

	exports.Promise = function(promise){
		console.log("alsdfj");
		return new Promise(promise);
	};

})(exports);