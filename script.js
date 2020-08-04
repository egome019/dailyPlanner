$(document).ready(function() {
    var currentDay = $("#currentDay");
    var format = 'dddd MMM Do';
    var result = moment().format(format);

    currentDay.text(result);

    var timeBlock = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];


    function timeBlockColor(){
        var currentTime = moment().format('ha')
        for (var index = 0; index < timeBlock.length; index++) {
            if (parseInt(timeBlock[index]) > currentTime) {
                $("#" + timeBlock[index]).addClass("future")
            }
            else if (parseInt(timeBlock[index]) < currentTime) {
                $("#" + timeBlock[index]).addClass("past")
            }
            else if (parseInt(timeBlock[index]) == currentTime) {
                $("#" + timeBlock[index]).addClass("present")
            }
        }
    }

    var storedAppt = [];

    function plans() {
        var storedInputs = JSON.parse(localStorage.getItem("times"));
        if (storedInputs !== null) {
            storedAppt = storedInputs;
            storedAppts();
            timeBlockColor();
        }else{
            timeBlockColor();
        }
    }

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



    $(".saveBtn").on("click", function(e){
        e.preventDefault();

        var hourBlock = $(this).prev().attr("id");
        var appt = $(this).prev().val().trim();

        console.log(hourBlock)
        console.log(appt)

        var times = {
                time: hourBlock,
                event: appt,
            };

        
        storedAppt.push(times);
        localStorage.setItem("times", JSON.stringify(storedAppt));
        
    })
    

})