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

        var argentinaIcon = new L.Icon({
            iconUrl: '/static/images/argentina.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var brazilIcon = new L.Icon({
            iconUrl: '/static/images/brasil.png',
            iconSize: [40, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var czechIcon = new L.Icon({
            iconUrl: '/static/images/czchrep.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var englandIcon = new L.Icon({
            iconUrl: '/static/images/england.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var franceIcon = new L.Icon({
            iconUrl: '/static/images/france.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var germanyIcon = new L.Icon({
            iconUrl: '/static/images/germany.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var hungaryIcon = new L.Icon({
            iconUrl: '/static/images/hungary.png',
            iconSize: [30, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var italyIcon = new L.Icon({
            iconUrl: '/static/images/italia.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var netherlandsIcon = new L.Icon({
            iconUrl: '/static/images/netherlands.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var spainIcon = new L.Icon({
            iconUrl: '/static/images/spain.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var uruguayIcon = new L.Icon({
            iconUrl: '/static/images/uruguay.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          var swedenIcon = new L.Icon({
            iconUrl: '/static/images/sweden.png',
            iconSize: [35, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });


          var team_list = [brazilIcon, germanyIcon, italyIcon, argentinaIcon, uruguayIcon, franceIcon, englandIcon, spainIcon, netherlandsIcon, czechIcon, hungaryIcon, swedenIcon];

            for (var i=0; i< response.length; i++) {
                var stopnumber = +response[i].Wins;
                for (var j=0; j<stopnumber; j++) {
                    countryCoords.push([response[i].Lat, response[i].Lon]);
                }
            };
            console.log(countryCoords);

            for (var i =0; i<response.length;i++) {
                countryMarkers.push(L.marker([response[i].Lat, response[i].Lon], {icon:team_list[i]}).bindPopup(response[i].Country));
            }
            
            var allMarks = L.layerGroup(countryMarkers);
            // var outofservice = L.layerGroup(noService);
            // var zipcar = L.layerGroup(carshareMarkers);

            function markerSize(population) {
                return population * 50000;
            }

            for (var i = 0; i < response.length; i++) {
                L.circle([response[i].Lat, response[i].Lon], {
                    fillOpacity: 0.75,
                    color: "green",
                    weight: 1,
                    radius: markerSize(response[i].Total)
                }).bindPopup("<h1>" + response[i].Country + "</h1> <hr> <h3>Titles: " + response[i].Total + "</h3>").addTo(albertsMap);
            }

            var baseLayers = {
                Light: lightmap,
                Dark: darkmap,
            };
            var overlayLayers = {
                "Team Info": allMarks
            };

            L.control
                .layers(baseLayers, overlayLayers) //baseLayers and overlaylayers MUST BE DEFINED ABOVE AND REQUIRED AS ARGUMENTS
                .addTo(albertsMap);

        // }) //keep
        // }) //keep
    // }) //keep
}) //keep