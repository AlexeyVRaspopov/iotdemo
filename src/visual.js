var inter = setInterval(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/locations', false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        var result = JSON.parse(xhr.responseText);
        console.log(result);
        var flightPath = new google.maps.Polyline({
            path: result,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);
        map.panTo(result[0]);
    }
}, 2000);