/* global fnSharedMapInit */
$(document).ready(function ready() {
  const formElementDistance = "#activity_distance";
  const formElementGPSPoints = "#activity_gps_points";

  // Calendar
  $(".ui.calendar.date").calendar({
    type: "date",
    formatter: {
      date(date) {
        if (!date) return "";
        let day = date.getDate();
        if (day < 10) {
          day = `0${day}`;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }
    }
  });
  $(".ui.calendar.time").calendar({
    type: "time",
    formatter: {
      time(date) {
        if (!date) return "";
        let hour = date.getHours();
        if (hour < 10) {
          hour = `0${hour}`;
        }
        let minute = date.getMinutes();
        if (minute < 10) {
          minute = `0${minute}`;
        }
        return `${hour}:${minute}:00`;
      }
    }
  });

  // Map
  const map = fnSharedMapInit();

  // LeafletDraw
  const drawnItems = L.featureGroup().addTo(map);
  const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
      poly: {
        allowIntersection: false
      }
    },
    draw: {
      polyline: true,
      polygon: false,
      marker: false,
      rectangle: false,
      circle: false,
      circlemarker: false
    }
  });

  map.addControl(drawControl);

  if ($(formElementGPSPoints).val() !== "") {
    // Import GeoJson
    L.geoJson($.parseJSON($(formElementGPSPoints).val()), {
      onEachFeature(feature, layer) {
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
  function getDistance(layer) {
    // Truncate value based on number of decimals
    function roundDistance(num, len) {
      return Math.round(num * 10 ** len) / 10 ** len;
    }

    if (layer instanceof L.Polyline) {
      const latlngs = layer._defaultShape
        ? layer._defaultShape()
        : layer.getLatLngs();
      let distance = 0;
      let i;
      if (latlngs.length < 2) {
        return distance;
      }
      for (i = 0; i < latlngs.length - 1; i += 1) {
        distance += latlngs[i].distanceTo(latlngs[i + 1]);
      }
      return roundDistance(distance, 0);
    }
    return null;
  }
  function getPopupContent(layer) {
    if (layer instanceof L.Polyline) {
      const distance = getDistance(layer);
      if (distance === 0) {
        return "Distance: N/A";
      }
      return `Distance: ${distance} m`;
    }
    return null;
  }

  map.on(L.Draw.Event.CREATED, function created(event) {
    // Bind a popup
    const content = getPopupContent(event.layer);
    if (content !== null) {
      event.layer.bindPopup(content);
    }
    drawnItems.addLayer(event.layer);

    // Update the distance
    $(formElementDistance).val(getDistance(event.layer));

    // Disable "Add a polyline"
    drawControl.setDrawingOptions({
      polyline: false
    });
    map.removeControl(drawControl).addControl(drawControl);

    // Save GPS Track
    $(formElementGPSPoints).val(JSON.stringify(drawnItems.toGeoJSON()));
  });
  map.on(L.Draw.Event.EDITED, function edited(event) {
    // Update the distance
    event.layers.eachLayer(function eachLayer(layer) {
      $(formElementDistance).val(getDistance(layer));
    });

    // Save GPS Track
    $(formElementGPSPoints).val(JSON.stringify(drawnItems.toGeoJSON()));
  });
  map.on(L.Draw.Event.DELETED, function deleted() {
    // Enable "Add a polyline"
    drawControl.setDrawingOptions({
      polyline: true
    });
    map.removeControl(drawControl).addControl(drawControl);

    // Update the distance
    $(formElementDistance).val(0);

    // Save GPS Track
    $(formElementGPSPoints).val("");
  });
});
