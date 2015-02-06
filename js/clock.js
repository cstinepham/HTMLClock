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

function insertAlarm(time, alarmName, alarmObject) {
    var div = $("<div>").addClass("flexable"); 
    div.append($("<div>").addClass("name").html(alarmName));
    div.append($("<div>").addClass("time").html(time));

    var removeButton = $("<input>").attr("type", "button").val("Remove");
    div.append(removeButton);
    $("#alarms").append(div);

}



function addAlarm() {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName option:selected").text();
    var time = hours + ":" + mins + " " + ampm;

    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();

    alarmObject.save({"time":time,"alarmName":alarmName}, {
        success: function(object) {
            insertAlarm(time, alarmName, this);
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





window.onload = function() {
    getTime();
    getTemp();
    getAllAlarms();
 };
