$(document).ready(function(){
	var formElementDistance = '#activity_distance';
	var formElementGPSPoints = '#activity_gps_points';

	// Calendar
	$('.ui.calendar.date').calendar({
		type: 'date',
		formatter: {
			date: function (date, settings) {
				if (!date) return '';
				var day = date.getDate();
				if (day < 10) { day = '0' + day; }
				var month = date.getMonth() + 1;
				if (month < 10) { month = '0' + month; }
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
		}
	});
	$('.ui.calendar.time').calendar({
		type: 'time',
		formatter: {
			time: function (date, settings, forCalendar) {
				if (!date) return '';
				var hour = date.getHours();
				if (hour < 10) { hour = '0' + hour; }
				var minute = date.getMinutes();
				if (minute < 10) { minute = '0' + minute; }
				return hour + ':' + minute + ':00';
			}
		}
	});

	// Map
	var map = fnMapInit();

	// LeafletDraw
	var drawnItems = L.featureGroup().addTo(map);
	var drawControl = new L.Control.Draw({
		edit: {
			featureGroup: drawnItems,
			poly : {
				allowIntersection : false
			}
		},
		draw: {
			polyline: true,
			polygon: false,
			marker: false,
			rectangle: false,
			circle: false,
			circlemarker: false,
		}
	});

	map.addControl(drawControl);

	if ($(formElementGPSPoints).val() != '') {
		// Import GeoJson
		L.geoJson($.parseJSON($(formElementGPSPoints).val()), {
			onEachFeature: function (feature, layer) {
				drawnItems.addLayer(layer);
			}
		});
		// Disable "Add a polyline"
		drawControl.setDrawingOptions({
			polyline: false
		});
		map.removeControl(drawControl).addControl(drawControl);
	}
	
	// Generate popup content based on layer type
	// - Returns HTML string, or null if unknown object
	var getDistance = function(layer) {
		// Truncate value based on number of decimals
		var _round = function(num, len) {
			return Math.round(num*(Math.pow(10, len)))/(Math.pow(10, len));
		};

		if (layer instanceof L.Polyline) {
			var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
				distance = 0;
			if (latlngs.length < 2) {
				return distance;
			} else {
				for (var i = 0; i < latlngs.length-1; i++) {
					distance += latlngs[i].distanceTo(latlngs[i+1]);
				}
				return _round(distance, 0);
			}
		}
		return null;
	}
	var getPopupContent = function(layer) {
		if (layer instanceof L.Polyline) {
			var distance = getDistance(layer);
			if (distance == 0) {
				return "Distance: N/A";
			}
			return "Distance: "+distance+" m";
		}
		return null;
	};

	map.on(L.Draw.Event.CREATED, function(event) {
		// Bind a popup
		var layer = event.layer;
		var content = getPopupContent(layer);
		if (content !== null) {
			layer.bindPopup(content);
		}
		drawnItems.addLayer(layer);

		// Update the distance
		$(formElementDistance).val(getDistance(layer));
		
		// Disable "Add a polyline"
		drawControl.setDrawingOptions({
			polyline: false
		});
		map.removeControl(drawControl).addControl(drawControl);

		// Save GPS Track
		var gpsTrack = drawnItems.toGeoJSON();
		$(formElementGPSPoints).val(JSON.stringify(gpsTrack));
	});
	map.on(L.Draw.Event.EDITED, function(event) {
		var layers = event.layers;
		// Update the distance
		layers.eachLayer(function(layer) {
			$(formElementDistance).val(getDistance(layer));
		});

		// Save GPS Track
		var gpsTrack = drawnItems.toGeoJSON();
		$(formElementGPSPoints).val(JSON.stringify(gpsTrack));
	});
	map.on(L.Draw.Event.DELETED, function(event) {
		// Enable "Add a polyline"
		drawControl.setDrawingOptions({
			polyline: true
		});
		map.removeControl(drawControl).addControl(drawControl);

		// Update the distance
		$(formElementDistance).val(0);

		// Save GPS Track
		$(formElementGPSPoints).val('');
	});
});