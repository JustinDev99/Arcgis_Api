const token = config.MY_API_TOKEN;

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/renderers/Renderer", "esri/renderers/UniqueValueRenderer", "esri/layers/GeoJSONLayer", "esri/widgets/Home"], 
function
(esriConfig, Map, MapView, Renderer, UniqueValueRenderer, GeoJSONLayer, Home) {

    esriConfig.apiKey = "MY_API_TOKEN";

  //Create renderer for bike path layer

  const bike_render = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid"
    }
  };  
  
  //Create simple fill Render for Borough Layer

  const colors = ["#d92b30", "#3cccb4", "#ffdf3c", "#c27c30", "#f260a1"];

  const boroughs = {
    type: "simple-line",
    style: "solid",
    width: "2px"
  };

  const statenIsland = {
    ...boroughs,
    color: colors[0]
  };

  const Brooklyn = {
    ...boroughs,
    color: colors[1]
  };

  const Manhattan = {
    ...boroughs,
    color: colors[2]
  };

  const Queens = {
    ...boroughs,
    color: colors[3]
  };

  const Bronx = {
    ...boroughs,
    color: colors[4]
  };

  const boro_render = {
    type: "unique-value",
    legendOptions: {
      title: "Borough Name"
    },
    field: "boro_name",

    uniqueValueInfos: [
      {
        value: "Staten Island",
        symbol: statenIsland,
        label: "Staten Island"
      },
      {
        value: "Brooklyn",
        symbol: Brooklyn,
        label: "Brooklyn"
      },
      {
        value: "Manhattan",
        symbol: Manhattan,
        label: "Manhattan"
      },
      {
        value: "Queens",
        symbol: Queens,
        label: "Queens"
      },
      {
        value: "Bronx",
        symbol: Bronx,
        label: "Bronx"
      }
    ]
  };

  //Create NYC Bike Route Layer

  BikeUrl = "data/New York City Bike Routes.geojson";

  const bikelayer = new GeoJSONLayer ({
    url: BikeUrl,
    renderer: bike_render,
    effect: "bloom(2, 0.1, 1)"
  });

  //Create NYC Borough Layer

  boundaryurl = "data/Borough Boundaries.geojson";

  const boundarylayer = new GeoJSONLayer ({
    url: boundaryurl,
    opacity: "0.3",
    renderer: boro_render
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