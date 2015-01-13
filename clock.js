setTimeout(function(){getTime()}, 1000);

function getTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    var clockDivElement = document.getElementById('clock');
    clockDivElement.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){getTime()}, 1000);
}

