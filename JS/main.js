const token = config.MY_API_TOKEN;

require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    esriConfig.apiKey = "MY_API_TOKEN";

    const map = new Map({
      basemap: "dark-gray" // Basemap layer service
    });

    const view = new MapView({
        map: map,
        center: [-123.116226, 49.246292], // Longitude, latitude
        zoom: 12, // Zoom level
        container: "viewDiv" // Div element
    });
});