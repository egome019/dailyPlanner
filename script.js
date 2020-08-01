var currentDay = $("#currentDay")
var format = 'dddd MMM Do';
var result = moment().format(format);

currentDay.text(result)