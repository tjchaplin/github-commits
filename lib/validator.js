(function(exports){
	"use strict";

	exports.hasValidDate = function(options, value){
		var self = this;

		if(!options || (!options.sinceDate && !options.untilDate))
			return true;

		if(value.date >= options.sinceDate && !options.untilDate)
			return true;

		if(value.date <= options.untilDate && !options.sinceDate)
			return true;

		if(value.date <= options.untilDate && value.date >= options.sinceDate)
			return true;

		return false;
	};


	exports.evaluateOwner = function(owner){
		if(typeof owner === "string")
			owner = {name: owner};

		if(!owner.type)
			owner.type = "users";
		
		if(!owner.name)
			return {};

		return owner;
	};

})(exports);