(function(){
	"use strict";
	var cache = module.exports = exports = function(refreshInterval){
		var self = this;
		if(!refreshInterval)
			refreshInterval = 86400000;

		self.dictionary = {};
		self.refreshCache(refreshInterval);
	};

	cache.prototype.forKey = function(key){
		var self = this;
		self.dictionary[key] = {};

		return {
			setValue : function(value){ 
				self.dictionary[key] = value;
			}
		};
	};

	cache.prototype.getValue = function(key){
		return this.dictionary[key];
	};

	cache.prototype.refreshCache = function(refreshInterval){
		var self = this;

		setInterval(function(){
			self.dictionary = {};
		},refreshInterval);
	};
})();