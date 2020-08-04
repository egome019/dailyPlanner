$(document).ready(function() {

    // this is all for the time to show on the header
    var currentDay = $("#currentDay");
    var format = 'dddd MMM Do';
    var result = moment().format(format);

    currentDay.text(result);
// this is the beginning of the color changing based on the time
    var timeBlock = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

    function timeBlockColor(){
        var currentTime = moment().format('ha')
        for (var index = 0; index < timeBlock.length; index++) {
            if ((timeBlock[index]) < currentTime) {
                $("#" + timeBlock[index]).addClass("future")
            }
            else if ((timeBlock[index]) > currentTime) {
                $("#" + timeBlock[index]).addClass("past")
            }
            else if ((timeBlock[index]) == currentTime) {
                $("#" + timeBlock[index]).addClass("present")
            }
        }
    }

// this is where the plans for the timeblock get saved to the time block even when refreshing the page.
    var storedAppt = [];


    function plans() {
        var storedInputs = JSON.parse(localStorage.getItem("times"));
        if (storedInputs !== null) {
            storedAppt = storedInputs;
            timeBlockColor();
            storedAppts();
        }else{
            timeBlockColor();
        }
    }
    plans();
    function storedAppts() {
        for (var index = 0; index < storedAppt.length; index++) {
            var storedEvent = storedAppt[index].event;
            var storedTime = storedAppt[index].time;
            for (var i = 0; i < timeBlock.length; i++) {
                if (storedTime == timeBlock[i]) {
                    var textArea = $("#" + timeBlock[i]);
                    textArea.val(storedEvent)
                }
            }
        }
    }

// this the click function that stores the plans in each time block when the save button is clicked

    $(".saveBtn").on("click", function(e){
        e.preventDefault();

        var hourBlock = $(this).prev().attr("id");
        var appt = $(this).prev().val().trim();
        var times = {
                time: hourBlock,
                event: appt,
            };
        storedAppt.push(times);
        localStorage.setItem("times", JSON.stringify(storedAppt));  
    })
})