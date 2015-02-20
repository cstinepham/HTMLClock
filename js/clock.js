
function getTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var clockDivElement;

    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    clockDivElement = document.getElementById("clock");
    clockDivElement.innerHTML = h+":"+m+":"+s;
    
    setTimeout(function(){getTime();}, 1000);
}


function getTempColor(temp) {
    if (temp < 60) {
        return "cold";
    } else if (temp >= 60) {
        return "chilly";
    } else if (temp >= 70) {
        return "nice";
    } else if (temp >= 80) {
        return "warm";
    } else if (temp >= 90) {
        return "hot";
    }

}

function getTemp() {
   var temperatureMax;
   var colorClass;

    $.getJSON("https://api.forecast.io/forecast/a3ef2cfa095204d246373287a54aa91a/35.300399,-120.662362?callback=?",
      function(json) {
         temperatureMax = json.daily.data[0].temperatureMax;
         colorClass = getTempColor(temperatureMax);

         $("#forecastLabel").html(json.daily.summary);
         $("#forecastIcon").attr("src", "img/" + json.daily.icon + ".png");
         $("body").addClass(colorClass);

         });
}


function showAlarmPopup() {
    $("#mask").removeClass("hide");
    $("#popup").removeClass("hide");
}

function hideAlarmPopup() {
    $("#mask").addClass("hide");
    $("#popup").addClass("hide");
}

function insertAlarm(time, alarmName, alarm) {
    var div = $("<div>").addClass("flexable"); 
    div.append($("<div>").addClass("name").html(alarmName));
    div.append($("<div>").addClass("time").html(time));

    var removeButton = $("<input>").attr("type", "button").val("Remove");
    removeButton.click(function () {
        alarm.destroy({
            success: function() {
                div.remove();
            }
        });
     });    
    div.append(removeButton);
    $("#alarms").append(div);

}



function addAlarm(userId) {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName option:selected").text();
    var time = hours + ":" + mins + " " + ampm;

    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();




    alarmObject.save({"time":time,"alarmName":alarmName}, {
        success: function(object) {
            insertAlarm(time, alarmName);
            hideAlarmPopup();

        }
    });
}

function getAllAlarms() {
    Parse.initialize("G8OrVGtahBG8Z1g2OoZMHjjAYwS1GbzBe3BDcTLE", "rzPfiIOYu6pHmCYqfZkLK9WxLxDypFT0iT80XsPf");
    var AlarmObject = Parse.Object.extend("Alarm");

    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
            for (var i=0; i<results.length; i++) {
                insertAlarm(results[i].get("time"), results[i].get("alarmName"), results[i]);
            }
        }
    });
}

var userId;

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {

    gapi.client.load('plus','v1', function(){
     var request = gapi.client.plus.people.list({
       'userId': 'me',
     });
     request.execute(function(resp) {
       userId = resp[0].id;

     });
    });

    getAllAlarms();




    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}





window.onload = function() {
    getTime();
    getTemp();
    getAllAlarms();
 };
