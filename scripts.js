var mymap = L.map('map').setView([47.62, -122.32], 11);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w'
}).addTo(mymap);

mymap.createPane("boundaryPane");
mymap.createPane("stationPane");
mymap.createPane("parkingPane");


//load Seattle north and south boundaries GeoJSON
$.getJSON("City.json",function(data){
		L.geoJson(data, {
			pane: "boundaryPane",
		style: function(feature) {
			return {
				color: "red",
			};
		},
		onEachFeature: function (feature, layer) {
            layer.bindPopup("Seattle North and South Boundaries " );
          }
				}).addTo(mymap);
});

//load Seattle parking pay stations GeoJSON, add styling markers, and popup
$.getJSON("Pay_Stations.json",function(data){
	var payS = L.ExtraMarkers.icon({
	 icon: "fas fa-parking",
	 markerColor: "blue-dark",
	 shape: "penta",
 });
	var stations = L.geoJson(data, {
			pane: "stationPane",
			pointToLayer: function (feature, latlng){
					var marker = L.marker(latlng,{icon: payS});
						marker.bindPopup("<b><h4>Paid Parking Kiosks</h4></b>" +
						" Paid Location: " + feature.properties.PAIDAREA + '</br>' +
						" UnitID: " + feature.properties.UNITID + '</br>' +
						" Address: " + feature.properties.UNITDESC + '</br>' +
						" Weekday paid parking hours: " + feature.properties.START_TIME + " - " + feature.properties.END_TIME_W +  '</br>' +
						" Saturday paid parking hours: " + feature.properties.START_TI_1 + " - " + feature.properties.END_TIME_S + '</br>' +
						" Sunday parking: Free! ");
						return marker;
					}
				});
				var clusters = L.markerClusterGroup({
					showCoverageOnHover: false
				});
				clusters.addLayer(stations);
				mymap.addLayer(clusters);
		});

//load GeoJSON
$.getJSON("Parking_Restrictions.json",function(data){
		L.geoJson(data, {
			pane: "parkingPane",
		style: function(feature) {
			return {
				color: "black",
				weight: 3
			};
		},
		onEachFeature: function (feature, layer) {
            layer.bindPopup("Peak Hour Parking Restrictions: " + feature.properties.PKHRDESC);
          }
				}).addTo(mymap);
});

L.control.locate().addTo(mymap);
