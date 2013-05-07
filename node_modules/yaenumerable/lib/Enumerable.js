(function(exports){
	"use strict";
	
	var Enumerable = function(sequence){
		var self = this;
		if(sequence === 'undefined' || sequence === null)
			sequence = [];

		self.sequence = sequence;		
		return self;
	};

	Enumerable.prototype.Where = function(condition){
		var self = this;
		var results = [];

		if(!condition)
			return new Enumerable(results);

		for (var i = 0; i < self.sequence.length; i++) {
			if(condition(self.sequence[i]))
				results.push(self.sequence[i]);
		}

		return new Enumerable(results);
	};

	Enumerable.prototype.Sum = function(selector){
		var self = this;

		if(!selector)
			selector = function(item){return item;};

		var sum = 0;
		self.ForEach(function(item){ sum += selector(item); });
		return sum;
	};

	Enumerable.prototype.ForEach = function(onEach){
		var self = this;

		if(!onEach)
			return self;

		for (var i = 0; i < self.sequence.length; i++) {
			onEach(self.sequence[i]);
		}

		return self;
	};

	Enumerable.prototype.Select = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		for (var i = 0; i < self.sequence.length; i++) {
			selected.push(selector(self.sequence[i]));
		}

		return new Enumerable(selected);
	};

	Enumerable.prototype.First = function(selector){
		var self = this;

		if(!selector)
			return self.sequence[0];

		return selector(self.sequence[0]);
	};

	Enumerable.prototype.Any = function(condition){
		var self = this;

		var result = false;

		if(!condition)
			return self.sequence.length > 0;

		for (var i = 0; i < self.sequence.length; i++) {
			if(condition(self.sequence[i]))
				result = true;
		}
		return result;
	};

	Enumerable.prototype.Count = function(condition){
		var self = this;

		if(!self.sequence)
			return 0;

		return self.sequence.length;
	};

	Enumerable.prototype.ToArray = function(){
		var self = this;
		return self.sequence;
	};

	exports.FromArray = function(array){
		return new Enumerable(array);
	};

})(exports);