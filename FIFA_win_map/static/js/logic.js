var sfCoords = [37.7749, -122.4194];
var mapZoomLevel = 12;


var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYTEwZG9hbiIsImEiOiJjamZna3ExeW4zYzdkMnFvZm9wamtnazZwIn0.iiyb2QQD6Oo8BvYe0VmMHg", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYTEwZG9hbiIsImEiOiJjamZna3ExeW4zYzdkMnFvZm9wamtnazZwIn0.iiyb2QQD6Oo8BvYe0VmMHg", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18
});

var albertsMap = L.map("map-id", {
    center: sfCoords,
    zoom: 13
});

lightmap.addTo(albertsMap);

var urlInfo = "/static/Project2/fifa_wins.csv"
// var carshareURL = "/static/Project2/carshare.csv"
console.log(urlInfo);
d3.csv(urlInfo, function(error, response) {
    if (error) {console.log(error); return (error);}
    
        var countryCoords=[];
        var countryMarkers=[];
        var stationMarkers=[];

        console.log(response);
        console.log(response.length);
        console.log(+response[0].Wins);

            for (var i=0; i< response.length; i++) {
                var stopnumber = +response[i].Wins;
                for (var j=0; j<stopnumber; j++) {
                    countryCoords.push([response[i].Lat, response[i].Lon]);
                }
            };
            console.log(countryCoords);

            for (var i =0; i<response.length;i++) {
                countryMarkers.push(L.marker([response[i].Lat, response[i].Lon]).bindPopup(response[i].Country))
            }
            console.log(countryMarkers);
            
            var allMarks = L.layerGroup(countryMarkers);
            // var outofservice = L.layerGroup(noService);
            // var zipcar = L.layerGroup(carshareMarkers);

            var baseLayers = {
                Light: lightmap,
                Dark: darkmap,
            };
            var overlayLayers = {
                "All Bike Stations": allMarks
            };

            L.control
                .layers(baseLayers, overlayLayers) //baseLayers and overlaylayers MUST BE DEFINED ABOVE AND REQUIRED AS ARGUMENTS
                .addTo(albertsMap);

        // }) //keep
        // }) //keep
    // }) //keep
}) //keep