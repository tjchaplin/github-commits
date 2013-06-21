(function(){
    "use strict";
    var DateExtensions = function(){};

    DateExtensions.prototype.getFirstSundayOfWeek = function(aDate)
    {
        var firstSundayOfWeek = new Date(aDate);
        firstSundayOfWeek.setHours(0,0,0,0);

        var daysToSubtract = firstSundayOfWeek.getDay();
        firstSundayOfWeek.setDate(firstSundayOfWeek.getDate() - daysToSubtract);

        return firstSundayOfWeek;
    };

    DateExtensions.prototype.getLastSundayOfWeek = function(aDate)
    {
        var maxDaysInWeek = 6;
        var lastDayOfWeek = new Date(aDate);

        lastDayOfWeek.setHours(23,59,59,59);
        var daysToAdd = maxDaysInWeek-lastDayOfWeek.getDay();

        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + daysToAdd);
        return lastDayOfWeek;
    };

    module.exports = new DateExtensions();
})();