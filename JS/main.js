const token = config.MY_API_TOKEN;

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer", "esri/widgets/Home"], 
function
(esriConfig, Map, MapView, GeoJSONLayer, Home) {

    esriConfig.apiKey = "MY_API_TOKEN";

  //Create NYC Borough Layer

  boundaryurl = "data/Borough Boundaries.geojson";

  const boundarylayer = new GeoJSONLayer ({
    url: boundaryurl,
    opacity: "0.7"
  });

  //Create NYC Bike Route Layer

  BikeUrl = "data/New York City Bike Routes.geojson";

  const bikelayer = new GeoJSONLayer ({
    url: BikeUrl
  });

    const map = new Map({
      basemap: "dark-gray", // Basemap layer service
      layers: [bikelayer, boundarylayer]
    });

    const view = new MapView({
        map: map,
        center: [-74.006016, 40.714761], // Longitude, latitude
        zoom: 10, // Zoom level
        container: "viewDiv" // Div element
    });

      //Create home zoom widget to return to initial zoom level

    let homebtn = new Home ({
      view: view
    });
    view.ui.add(homebtn, "top-left");
});