// map 2
var map2 = L.map('map2').setView([47.62, -122.32], 11);
var maptwo = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY2luZHl2dTQiLCJhIjoiY2sydzVleGJ3MGNkNDNpcW1odG1icDEwciJ9._9FHgo3Qa682z450P9Xz_w'
}).addTo(map2);

//load Seattle north and south boundaries GeoJSON
$.getJSON("City.json",function(data){
		L.geoJson(data, {
		style: function(feature) {
			return {
				color: "red",
			};
		},
		onEachFeature: function (feature, layer) {
            layer.bindPopup("Seattle North and South Boundaries " );
          }
				}).addTo(map2);
});

//load Seattle parking pay stations GeoJSON, add styling markers, and popup
$.getJSON("Bike_Racks.json",function(data){
	var bikes = L.ExtraMarkers.icon({
	 icon: "fas fa-bicycle",
	 markerColor: "blue-dark",
	 shape: "penta",
 });
	var bikestations = L.geoJson(data, {
			pointToLayer: function (feature, latlng){
					var marker = L.marker(latlng,{icon: bikes});
						marker.bindPopup("<b><h4>Bike Racks Locations</h4></b>" + " Address: " + feature.properties.UNITDESC + '</br>' + " Rack Capacity: " + feature.properties.RACK_CAPAC + '</br>' + " Conditions: " + feature.properties.CONDITION);
						return marker;
					}
				});
				var clusters = L.markerClusterGroup({
					showCoverageOnHover: false
				});
				clusters.addLayer(bikestations);
				map2.addLayer(clusters);
		});


	//load GeoJSON
	$.getJSON("Bike.json",function(data){
			L.geoJson(data, {
			style: function(feature) {
				return {
					color: "black",
					weight: 2.5,
					opacity: .5
				};
			},
			onEachFeature: function (feature, layer) {
	            layer.bindPopup("<b><h4>Bike Facilities</h4></b>" + " Location: " + feature.properties.STREET_NAM + '</br>' + " Length: " + feature.properties.LENGTH_MIL + '</br>' + " Status: " + feature.properties.STATUS + '</br>' + " Facility Type: " + feature.properties.EXISTING_F );
	          }
					}).addTo(map2);
	});

map2.addControl(new L.Control.Fullscreen());
