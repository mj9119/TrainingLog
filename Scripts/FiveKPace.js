// classes defined at top of file
var Pace = function (mileMarkerMinsOrSecs, minsOrSecs) { // passes 2 parms example--> (mile1_minutes, 26 )
    //this.mile_markers = [];
    this.mileOneMins = "";
    this.mileOneSecs = "";
    this.mileTwoMins = "";
    this.mileTwoSecs = "";
    this.mileThreeMins = "";
    this.mileThreeSecs = "";
    this.finishMins = "";
    this.finishSecs = "";
    this.metricMile = 1609.34; // 1609.34 meters in 1 mile
}

Pace.prototype.capture_mile_markers_and_times = function () {
    this.mileOneMins = $("mileOneMins").value;
    this.mileOneSecs = $("mileOneSecs").value;
    this.mileTwoMins = $("mileTwoMins").value;
    this.mileTwoSecs = $("mileTwoSecs").value;
    this.mileThreeMins = $("mileThreeMins").value;
    this.mileThreeSecs = $("mileThreeSecs").value;
    this.finishMins = $("finishMins").value;
    this.finishSecs = $("finishSecs").value;
}

Pace.prototype.update_mile_paces = function () {
    
    var minsAndSeconds = " : ";
    var ttlSecsThisSegment = 0;
    var ttlSecsOverall = parseInt(this.finishMins * 60) + parseInt(this.finishSecs);
    var pacePerMeter = 0.0;
    var outputVar = "";

    //var raceLength = $("race_distance").value;
    var raceLength = "5K";

    switch (raceLength) {

        case "5K":
            // FIRST MILE LOGIC
            if (this.mileOneSecs != "") {  // user entered a 1 mile time				
                ttlSecsThisSegment = (parseInt(this.mileOneMins * 60)) + (parseInt(this.mileOneSecs));
                var myVar = this.mileOneMins + ":" + this.mileOneSecs;
                //document.getElementById("lblMileOne").innerHTML = "Mile One: " + myVar + " pace";
                $("lblMileOne").value = "Mile One: " + myVar + " pace";
                ttlSecsOverall -= ttlSecsThisSegment;
            }

            // SECOND MILE LOGIC
            if (this.mileTwoSecs != "") {  	//  User entered a 2 mile time
                if (this.mileOneSecs != "") {  // 	User entered both 1 and 2 mile times
                    ttlSecsThisSegment = ((parseInt(this.mileTwoMins * 60)) + (parseInt(this.mileTwoSecs)))
					                   - ttlSecsThisSegment; // ttlSecsThisSegment still contains mile 1 values
                    //( (parseInt( $("mileOneMins").value * 60))  + (parseInt($("mileOneSecs").value)) ); 
                    pacePerMeter = ttlSecsThisSegment / this.metricMile;
                    ttlSecsThisSegment = pacePerMeter * this.metricMile;  // pace per mile expressed in seconds				
                    minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                    document.getElementById("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
                else {  // User entered a 2 mile time but no 1 mile time				
                    ttlSecsThisSegment = (parseInt(this.mileTwoMins * 60)) + (parseInt(this.mileTwoSecs));
                    pacePerMeter = ttlSecsThisSegment / (this.metricMile * 2);
                    ttlSecsThisSegment = pacePerMeter * (this.metricMile * 2);  // pace per mile expressed in seconds	
                    if (!isInt(ttlSecsThisSegment / 2)) { // if it is a floating point number , convert it twice, using a rounded number for one of the two conversions
                        minsAndSeconds = convertToMinsSecs(Math.round(ttlSecsThisSegment / 2));
                        $("lblMileOne").value = "Mile One: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        $("lblMileOne").value = "Mile One: " + minsAndSeconds + " pace";
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                    }
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
            }

            // THIRD MILE LOGIC
            if (this.mileThreeSecs != "") {  //  User entered a 3 mile time
                if (this.mileTwoSecs != "") {  // 	User entered both 3 and 2 mile times										   
                    //  remember the 2 mile time already provided the 1 mile time calculation
                    ttlSecsThisSegment = ((parseInt(this.mileThreeMins * 60)) + (parseInt(this.mileThreeSecs))) - ((parseInt(this.mileTwoMins * 60)) + (parseInt(this.mileTwoSecs)));
                    pacePerMeter = ttlSecsThisSegment / this.metricMile;
                    ttlSecsThisSegment = pacePerMeter * this.metricMile;  // pace per mile expressed in seconds				
                    minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                    $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
                else if (this.mileOneSecs != "") { 	// User entered 3 mile time, and a 1 mile time, but no 2 mile time
                    //calculate miles 2 & 3
                    //alert ("1 mile time was entered:  Calculate miles 2 & 3");
                    ttlSecsThisSegment = ((parseInt(this.mileThreeMins * 60)) + (parseInt(this.mileThreeSecs)) - ((parseInt(this.mileOneMins * 60)) + (parseInt(this.mileOneSecs)))); // ttlSecsThisSegment still contains mile 2 values									   
                    pacePerMeter = ttlSecsThisSegment / (this.metricMile * 2);
                    ttlSecsThisSegment = pacePerMeter * (this.metricMile * 2);  // pace per mile expressed in seconds	
                    if (!isInt(ttlSecsThisSegment / 2)) { // if it is a floating point number , convert it twice, using the rounded up number for one of the conversions
                        minsAndSeconds = convertToMinsSecs(Math.round(ttlSecsThisSegment / 2));
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                        $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
                else {  								// User entered 3 mile time, but no 2 mile time nor 1 mile time
                    //alert ("calculate miles 1 2 3");// calculate miles 1, 2, 3					
                    ttlSecsThisSegment = (parseInt(this.mileThreeMins * 60)) + (parseInt(this.mileThreeSecs));
                    pacePerMeter = ttlSecsThisSegment / (this.metricMile * 3);
                    ttlSecsThisSegment = pacePerMeter * (this.metricMile * 3);  // pace per mile expressed in seconds	
                    if (!isInt(ttlSecsThisSegment / 3)) { // if it is a floating point number , convert it twice, using a rounded number for one of the conversions
                        minsAndSeconds = convertToMinsSecs(Math.round(ttlSecsThisSegment / 3));
                        $("lblMileOne").value = "Mile One: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 3);
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                        $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 3);
                        $("lblMileOne").value = "Mile One: " + minsAndSeconds + " pace";
                        $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                        $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
            }

            //FINISHING TIME LOGIC - mandatory field
            //This logic used when only a Finishing Time is entered
            //	if( $("mileOneSecs").value == "" && $("mileTwoSecs").value == "" && $("mileThreeSecs").value == "" ){ //user entered Finishing Time only
            if (this.mileOneSecs == "" && this.mileTwoSecs == "" && this.mileThreeSecs == "") { //user entered Finishing Time only
                //alert("execute finish time only");
                // jb ttlSecsThisSegment = (parseInt( $("finishMins").value * 60))  + (parseInt($("finishSecs").value)) ;
                ttlSecsThisSegment = (parseInt(this.finishMins * 60)) + (parseInt(this.finishSecs));
                pacePerMeter = ttlSecsThisSegment / 5000; //ttl secs divided by 5000 meters
                ttlSecsThisSegment = pacePerMeter * this.metricMile;  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);                
                $("lblFinish").value = "Pace per Mile: " + minsAndSeconds;
				
            } else if (this.mileOneSecs != "" && this.mileTwoSecs == "" && this.mileThreeSecs == "") { // only mile 1 entered
                //alert("only mile 1 was entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - this.metricMile);
                ttlSecsThisSegment = pacePerMeter * this.metricMile;  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                $("lblMileTwo").value = "Mile Two: " + minsAndSeconds + " pace";
                $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                $("lblFinish").value = "Pace last tenth: " + minsAndSeconds;
                //	} else if($("mileOneSecs").value != "" && $("mileTwoSecs").value != "" && $("mileThreeSecs").value == ""){ // only miles 1 and 2 were entered
            } else if (this.mileTwoSecs != "" && this.mileThreeSecs == "") { // miles 2 was entered
                //alert("only miles 1 and 2 were entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - (this.metricMile * 2));
                ttlSecsThisSegment = pacePerMeter * (this.metricMile);  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                $("lblMileThree").value = "Mile Three: " + minsAndSeconds + " pace";
                $("lblFinish").value = "Pace last tenth: " + minsAndSeconds;
                //	} else if($("mileOneSecs").value != "" && $("mileTwoSecs").value != "" && $("mileThreeSecs").value != ""){ // miles 1, 2 and 3 were entered
            } else if (this.mileThreeSecs != "") { // mile 3 was entered
                //alert("only miles 1, 2 and 3 were entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - (this.metricMile * 3));
                ttlSecsThisSegment = pacePerMeter * (this.metricMile);  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);                
                $("lblFinish").value = "Pace last tenth: " + minsAndSeconds;
            }

            break;

        case "10K":
            alert("you are in 10K logic");
            break;
    }
}

var $ = function (id) {
    return document.getElementById(id);
}

var initialize_screen = function () {
    //alert(" testing initialize_screen ");
    reset_text_colors();
    $("mileOneMins").value = "";
    $("mileOneSecs").value = "";
    $("lblMileOne").style.color = "blue";
    $("lblMileOne").value = "<= Enter Mile 1 clock time if known";

    $("mileTwoMins").value = "";
    $("mileTwoSecs").value = "";
    $("lblMileTwo").style.color = "blue";
    $("lblMileTwo").value = "<= Enter Mile 2 clock time if known";

    $("mileThreeMins").value = "";
    $("mileThreeSecs").value = "";
    $("lblMileThree").style.color = "blue";
    $("lblMileThree").value = "<= Enter Mile 3 clock time if known";

    $("finishMins").value = "";
    $("finishSecs").value = "";

    $("lblFinish").style.color = "red";
    //document.getElementById("lblFinish").style.color = "red";

    $("lblFinish").value = "<= Finishing time is mandatory";

}

var convertToMinsSecs = function (ttlSecsThisSegment) {

    var minsAndSecs = "";
    var preliminaryMinsSecs = ttlSecsThisSegment / 60;
    preliminaryMinsSecs = preliminaryMinsSecs.toFixed(4);

    var stringMinsSecs = preliminaryMinsSecs.toString();

    var periodPosition = stringMinsSecs.indexOf(".");    

    var minutes = stringMinsSecs.substring(0, periodPosition);
    var seconds = stringMinsSecs.substring(periodPosition);

    seconds = parseInt(60 * seconds);
    switch (seconds) {
        case 0:
            seconds = "00";
            break;
        case 1:
            seconds = "01";
            break;
        case 2:
            seconds = "02";
            break;
        case 3:
            seconds = "03";
            break;
        case 4:
            seconds = "04";
            break;
        case 5:
            seconds = "05";
            break;
        case 6:
            seconds = "06";
            break;
        case 7:
            seconds = "07";
            break;
        case 8:
            seconds = "08";
            break;
        case 9:
            seconds = "09";
            break;
    }
    return minsAndSecs += minutes.toString() + ":" + seconds;
}

var clearPacesPerMile = function () {
    $("lblMileOne").value = "";
    $("lblMileTwo").value = "";
    $("lblMileThree").value = "";
    $("lblFinish").value = "";
}

var isInt = function (n) {
    return n % 1 === 0;
}

var validate_user_entries = function (minsValue, secsValue, htmlLabel, htmlMinsId, htmlSecsId) {

    if (secsValue == "") {
        $(htmlLabel).value = "<= Please enter seconds";
        $(htmlLabel).style.color = "red";
        $(htmlSecsId).style.color = "red";
        throw new Error("Seconds is a mandatory field.  Please resubmit");
    }

    if (isNaN(secsValue) || secsValue < 0) {
        $(htmlLabel).value = "<= A Positive number is required";
        $(htmlLabel).style.color = "red";
        $(htmlSecsId).style.color = "red";
        throw new Error("Seconds must be a number.  Please resubmit");
    }
    // The algorithm will actually processes > 60 secs successfully.  However, entering > 60 secs.
    // is disallowed as it is an illogical approach for a runner/end-user.
    if (secsValue > 59) {
        $(htmlLabel).value = "<= Number must be Less than 60 seconds";
        $(htmlLabel).style.color = "red";
        $(htmlSecsId).style.color = "red";
        throw new Error("Seconds must be < 60 secs.  Please resubmit");
    }

    if (minsValue == "") {
        $(htmlLabel).value = "<= Please enter minutes";
        $(htmlLabel).style.color = "red";
        $(htmlMinsId).style.color = "red";
        throw new Error("Minutes is a mandatory field.  Please resubmit");
    }

    if (isNaN(minsValue) || minsValue < 0) {
        $(htmlLabel).value = "<= A Positive number is required";
        $(htmlLabel).style.color = "red";
        $(htmlMinsId).style.color = "red";
        throw new Error("Minutes must be a number.  Please resubmit");
    }
}
var calculate_paces = function () {
    //alert(" testing calculate_paces ");	
    var minsValue, secsValue = "";

    try {
        reset_text_colors(); // reset screen colors in case user has corrected an existing error
        minsValue = $("finishMins").value;
        secsValue = $("finishSecs").value;
        validate_user_entries(minsValue, secsValue, "lblFinish", "finishMins", "finishSecs"); // Begin by validating Finishing time

        minsValue = $("mileThreeMins").value;
        secsValue = $("mileThreeSecs").value;
        if (minsValue != "" || secsValue != "") // Optional:  if no mins/secs entered, no need to validate
            validate_user_entries(minsValue, secsValue, "lblMileThree", "mileThreeMins", "mileThreeSecs"); // Validate Third mile time

        minsValue = $("mileTwoMins").value;
        secsValue = $("mileTwoSecs").value;
        if (minsValue != "" || secsValue != "") // Optional:  if no mins/secs entered, no need to validate
            validate_user_entries(minsValue, secsValue, "lblMileTwo", "mileTwoMins", "mileTwoSecs"); // Validate Second mile time

        minsValue = $("mileOneMins").value;
        secsValue = $("mileOneSecs").value;
        if (minsValue != "" || secsValue != "") // Optional:  if no mins/secs entered, no need to validate
            validate_user_entries(minsValue, secsValue, "lblMileOne", "mileOneMins", "mileOneSecs"); // Validate First mile time

        clearPacesPerMile();
        pace.capture_mile_markers_and_times();
        pace.update_mile_paces();
    } catch (error) {
        ; //alert(error.message); // no need to alert as an error message is displayed on the screen
    }
}

var reset_text_colors = function () {

    $("lblMileOne").style.color = "blue";
    $("mileOneMins").style.color = "blue";
    $("mileOneSecs").style.color = "blue";

    $("lblMileTwo").style.color = "blue";
    $("mileTwoMins").style.color = "blue";
    $("mileTwoSecs").style.color = "blue";

    $("lblMileThree").style.color = "blue";
    $("mileThreeMins").style.color = "blue";
    $("mileThreeSecs").style.color = "blue";

    $("lblFinish").style.color = "blue";
    $("finishMins").style.color = "blue";
    $("finishSecs").style.color = "blue";

}

// instantiate Pace object globally
var pace = new Pace();

window.onload = function () {
    //alert(" window.onload function executing");

    $("start").onclick = calculate_paces;
    $("clrScreen").onclick = initialize_screen;
    initialize_screen();

}
