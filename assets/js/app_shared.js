$(document).ready(function ready() {
  window.chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };

  // Dropdown
  $(".ui.dropdown").dropdown();

  // Notification
  $(".notification.item").popup({
    popup: ".popup",
    position: "bottom right",
    on: "click"
  });
});
// Helpers
function fnSharedMapInit(idObject = "map") {
  const osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const osmAttribution =
    "&copy; " +
    '<a href="http://openstreetmap.org/copyright">OpenStreetMap</a> ' +
    "contributors";
  const tiles = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttribution
  });
  const latlng = L.latLng(-37.82, 175.24);
  return L.map(idObject, { center: latlng, zoom: 13, layers: [tiles] });
}
