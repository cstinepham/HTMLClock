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
    
    setTimeout(function(){getTime()}, 1000);
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

function insertAlarm(hours, mins, ampm, alarmName) {
    var div = $("<div>").addClass("flexable"); 
    div.append($("<div>").addClass("name").html(alarmName));
    div.append($("<div>").addClass("time").html(hours + ":" + mins + " " + ampm));
    $("#alarms").append(div) ;                    

}

function addAlarm() {
    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName option:selected").text();

    insertAlarm(hours, mins, ampm, alarmName);
    hideAlarmPopup();


}



window.onload = function() {
    getTime();
    getTemp();
 };


