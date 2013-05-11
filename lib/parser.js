(function(exports){
	"use strict";

	exports.parseOwner = function(owner){
		if(typeof owner === "string")
			owner = {name: owner};

		if(!owner.type)
			owner.type = "users";
		
		if(!owner.name)
			return {};

		return owner;
	};

})(exports);
