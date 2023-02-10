const token = config.MY_API_TOKEN;

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer"], 
function
(esriConfig, Map, MapView, GeoJSONLayer) {

    esriConfig.apiKey = "MY_API_TOKEN";

    //Create geojson layer for BC Floodplain layer

    floodurl = "data/CWB_FLOODPLAINS_BC_AREA_SVW.geojson";

    const floodlayer = new GeoJSONLayer ({
      url: floodurl
    });

    //Create disaster response route geojson layer

    disasterurl = "data/DRP_DISASTER_RESPNSE_ROUTES_SP.geojson";

    const disasterlayer = new GeoJSONLayer ({
      url: disasterurl
    });

    const map = new Map({
      basemap: "dark-gray", // Basemap layer service
      layers: [floodlayer, disasterlayer]
    });

    const view = new MapView({
        map: map,
        center: [-122.911110, 49.206944], // Longitude, latitude
        zoom: 11, // Zoom level
        container: "viewDiv" // Div element
    });
});