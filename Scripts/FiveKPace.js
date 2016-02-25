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

    //var metricMile = 1609.34; // commented - no longer needed
    var minsAndSeconds = " : ";
    var ttlSecsThisSegment = 0;
    //var finishMins =  $("finishMins").value ;
    //var finishSecs =  $("finishSecs").value ;
    var ttlSecsOverall = parseInt(this.finishMins * 60) + parseInt(this.finishSecs);
    var pacePerMeter = 0.0;
    var outputVar = "";

    var raceLength = $("race_distance").value;
    switch (raceLength) {

        case "5K":
            // FIRST MILE LOGIC
            if (this.mileOneSecs != "") {  // user entered a 1 mile time				
                ttlSecsThisSegment = (parseInt(this.mileOneMins * 60)) + (parseInt(this.mileOneSecs));
                var myVar = this.mileOneMins + ":" + this.mileOneSecs;
                document.getElementById("lblMileOne").innerHTML = "Mile One: " + myVar + " pace";
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
                    document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                    ttlSecsOverall -= ttlSecsThisSegment;
                }
                else {  // User entered a 2 mile time but no 1 mile time				
                    ttlSecsThisSegment = (parseInt(this.mileTwoMins * 60)) + (parseInt(this.mileTwoSecs));
                    pacePerMeter = ttlSecsThisSegment / (this.metricMile * 2);
                    ttlSecsThisSegment = pacePerMeter * (this.metricMile * 2);  // pace per mile expressed in seconds	
                    if (!isInt(ttlSecsThisSegment / 2)) { // if it is a floating point number , convert it twice, using a rounded number for one of the two conversions
                        minsAndSeconds = convertToMinsSecs(Math.round(ttlSecsThisSegment / 2));
                        document.getElementById("lblMileOne").innerHTML = "Mile One: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        document.getElementById("lblMileOne").innerHTML = "Mile One: " + minsAndSeconds + " pace";
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
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
                    document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
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
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 2);
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                        document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
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
                        document.getElementById("lblMileOne").innerHTML = "Mile One: " + minsAndSeconds + " pace";
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 3);
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                        document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
                    }
                    else {
                        minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment / 3);
                        document.getElementById("lblMileOne").innerHTML = "Mile One: " + minsAndSeconds + " pace";
                        document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                        document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
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
                document.getElementById("lblFinish").innerHTML = "Pace per Mile: " + minsAndSeconds;
                //ttlSecsOverall -= ttlSecsThisSegment ;
                //var remainingTtlSecsPerMeter = ( ttlSecsOverall / (5000 - this.metricMile) );				
            } else if (this.mileOneSecs != "" && this.mileTwoSecs == "" && this.mileThreeSecs == "") { // only mile 1 entered
                //alert("only mile 1 was entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - this.metricMile);
                ttlSecsThisSegment = pacePerMeter * this.metricMile;  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                document.getElementById("lblMileTwo").innerHTML = "Mile Two: " + minsAndSeconds + " pace";
                document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
                document.getElementById("lblFinish").innerHTML = "Pace last tenth: " + minsAndSeconds;
                //	} else if($("mileOneSecs").value != "" && $("mileTwoSecs").value != "" && $("mileThreeSecs").value == ""){ // only miles 1 and 2 were entered
            } else if (this.mileTwoSecs != "" && this.mileThreeSecs == "") { // miles 2 was entered
                //alert("only miles 1 and 2 were entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - (this.metricMile * 2));
                ttlSecsThisSegment = pacePerMeter * (this.metricMile);  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
                document.getElementById("lblFinish").innerHTML = "Pace last tenth: " + minsAndSeconds;
                //	} else if($("mileOneSecs").value != "" && $("mileTwoSecs").value != "" && $("mileThreeSecs").value != ""){ // miles 1, 2 and 3 were entered
            } else if (this.mileThreeSecs != "") { // mile 3 was entered
                //alert("only miles 1, 2 and 3 were entered");
                ttlSecsThisSegment = ttlSecsOverall;
                pacePerMeter = ttlSecsThisSegment / (5000 - (this.metricMile * 3));
                ttlSecsThisSegment = pacePerMeter * (this.metricMile);  // pace per mile expressed in seconds
                minsAndSeconds = convertToMinsSecs(ttlSecsThisSegment);
                //document.getElementById("lblMileThree").innerHTML = "Mile Three: " + minsAndSeconds + " pace";
                document.getElementById("lblFinish").innerHTML = "Pace last tenth: " + minsAndSeconds;
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

var clear_scrn = function () {
    //alert(" testing clear_scrn ");
    $("mileOneMins").value = "";
    $("mileOneSecs").value = "";
    document.getElementById("lblMileOne").style.color = "blue";
    document.getElementById("lblMileOne").innerHTML = "<= Mile 1 clock time";

    $("mileTwoMins").value = "";
    $("mileTwoSecs").value = "";
    document.getElementById("lblMileTwo").style.color = "blue";
    document.getElementById("lblMileTwo").innerHTML = "<= Mile 2 clock time";

    $("mileThreeMins").value = "";
    $("mileThreeSecs").value = "";
    document.getElementById("lblMileThree").style.color = "blue";
    document.getElementById("lblMileThree").innerHTML = "<= Mile 3 clock time";

    $("finishMins").value = "";
    $("finishSecs").value = "";
    //$("finishMins").value = "25";
    //$("finishSecs").value = "00";
    document.getElementById("lblFinish").style.color = "blue";
    document.getElementById("lblFinish").innerHTML = "<= Enter Finishing time ";

    // Reset the CSS box style height in case the lyrics
    // logic has already been executed
    document.getElementById("content").style.height = "600px";

    //document.getElementById("songId").innerHTML  = "CSS box style height has been readied for use";	

}

var reset_user_response = function (newResponse) {

    //var newResponse = "The year you are searching for is: <span id=\"date_field\"> &nbsp </span>";
    //var newResponse = "";

    document.getElementById("parId1").innerHTML = newResponse;

}

var convertToMinsSecs = function (ttlSecsThisSegment) {

    //ttlSecsThisSegment = ttlSecsThisSegment.toFixed(2);

    var minsAndSecs = "";
    var preliminaryMinsSecs = ttlSecsThisSegment / 60;
    preliminaryMinsSecs = preliminaryMinsSecs.toFixed(4);

    var stringMinsSecs = preliminaryMinsSecs.toString();

    /*
    if (stringMinsSecs.indexOf(".00",0) == -1 )
    stringMinsSecs = stringMinsSecs + ".";
    */

    var periodPosition = stringMinsSecs.indexOf(".");
    //var periodPosition =  preliminaryMinsSecs.indexOf(".")  ;

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
    document.getElementById("lblMileOne").innerHTML = "";
    document.getElementById("lblMileTwo").innerHTML = "";
    document.getElementById("lblMileThree").innerHTML = "";
    document.getElementById("lblFinish").innerHTML = "";
}

var isInt = function (n) {
    return n % 1 === 0;
}

var validate_user_entries = function (minsValue, secsValue, htmlLabel, htmlMinsId, htmlSecsId) {

    if (secsValue == "") {
        document.getElementById(htmlLabel).innerHTML = "<=Please enter secs";
        document.getElementById(htmlLabel).style.color = "red";
        document.getElementById(htmlSecsId).style.color = "red";
        throw new Error("Seconds is a mandatory field.  Please resubmit");
    }

    if (isNaN(secsValue) || secsValue < 0) {
        document.getElementById(htmlLabel).innerHTML = "<=Positive number req";
        document.getElementById(htmlLabel).style.color = "red";
        document.getElementById(htmlSecsId).style.color = "red";
        throw new Error("Seconds must be a number.  Please resubmit");
    }
    // The algorithm will actually processes > 60 secs successfully.  However, entering > 60 secs.
    // is disallowed as it is an illogical approach for a runner/end-user.
    if (secsValue > 59) {
        document.getElementById(htmlLabel).innerHTML = "<=Must be LT 60 secs";
        document.getElementById(htmlLabel).style.color = "red";
        document.getElementById(htmlSecsId).style.color = "red";
        throw new Error("Seconds must be < 60 secs.  Please resubmit");
    }

    if (minsValue == "") {
        document.getElementById(htmlLabel).innerHTML = "<=Please enter mins";
        document.getElementById(htmlLabel).style.color = "red";
        document.getElementById(htmlMinsId).style.color = "red";
        throw new Error("Minutes is a mandatory field.  Please resubmit");
    }

    if (isNaN(minsValue) || minsValue < 0) {
        document.getElementById(htmlLabel).innerHTML = "<=Positive number req";
        document.getElementById(htmlLabel).style.color = "red";
        document.getElementById(htmlMinsId).style.color = "red";
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

    document.getElementById("lblMileOne").style.color = "blue";
    document.getElementById("mileOneMins").style.color = "blue";
    document.getElementById("mileOneSecs").style.color = "blue";

    document.getElementById("lblMileTwo").style.color = "blue";
    document.getElementById("mileTwoMins").style.color = "blue";
    document.getElementById("mileTwoSecs").style.color = "blue";

    document.getElementById("lblMileThree").style.color = "blue";
    document.getElementById("mileThreeMins").style.color = "blue";
    document.getElementById("mileThreeSecs").style.color = "blue";

    document.getElementById("lblFinish").style.color = "blue";
    document.getElementById("finishMins").style.color = "blue";
    document.getElementById("finishSecs").style.color = "blue";

}

// instantiate Pace object globally
var pace = new Pace();

window.onload = function () {
    //alert(" window.onload function executing");

    $("start").onclick = calculate_paces;
    $("clrScreen").onclick = clear_scrn;
    clear_scrn();

}
