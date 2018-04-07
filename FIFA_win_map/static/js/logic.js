var sfCoords = [14.4974, -17.4974];
var mapZoomLevel = 2;


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
    zoom: 3
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

            function markerSize(population) {
                return population * 100000;
            }

            for (var i = 0; i < response.length; i++) {
                L.circle([response[i].Lat, response[i].Lon], {
                    fillOpacity: 0.75,
                    color: "steelblue",
                    weight: 1,
                    // Setting our circle's radius equal to the output of our markerSize function
                    // This will make our marker's size proportionate to its population
                    radius: markerSize(response[i].Wins)
                }).bindPopup("<h1>" + response[i].Country + "</h1> <hr> <h3>Titles: " + response[i].Total + "</h3>").addTo(albertsMap);
            }

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