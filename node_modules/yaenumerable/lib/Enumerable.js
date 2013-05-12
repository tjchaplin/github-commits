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

		for (var index = 0; index < self.sequence.length; index++) {
			if(condition(self.sequence[index],index))
				results.push(self.sequence[index]);
		}

		return new Enumerable(results);
	};

	Enumerable.prototype.Sum = function(selector){
		var self = this;

		if(!selector)
			selector = function(item){return item;};

		var sum = 0;
		self.ForEach(function(item,index){ sum += selector(item,index); });
		return sum;
	};

	Enumerable.prototype.ForEach = function(onEach){
		var self = this;

		if(!onEach)
			return self;

		for (var index = 0; index < self.sequence.length; index++) {
			onEach(self.sequence[index],index);
		}

		return self;
	};

	Enumerable.prototype.AsyncForEach = function(onEachItem, onComplete){
		var self = this;

		var results = [];
		var numberOfCallsRemaining = self.sequence.length;

		var onItemComplete =function(resultItem){
			results.push(resultItem);
			numberOfCallsRemaining--;

			if(numberOfCallsRemaining === 0)
				onComplete(results);
		}; 

		self.ForEach(function(item,index){ 
			onEachItem(item, onItemComplete, index);
		});

		return self;
	};

	Enumerable.prototype.Select = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		for (var index = 0; index < self.sequence.length; index++) {
			selected.push(selector(self.sequence[index],index));
		}

		return new Enumerable(selected);
	};

	Enumerable.prototype.SelectMany = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		var addItems = function(item){selected.push(item);};

		for (var index = 0; index < self.sequence.length; index++) {
			var selectedResults = new Enumerable(selector(self.sequence[index],index));
			selectedResults.ForEach(addItems);
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

		for (var index = 0; index < self.sequence.length; index++) {
			if(condition(self.sequence[index],index))
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