const token = config.MY_API_TOKEN;

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/core/reactiveUtils", "esri/layers/support/FeatureEffect", "esri/layers/GeoJSONLayer", "esri/widgets/Home", "esri/widgets/Expand", "esri/widgets/Legend"], 
function
(esriConfig, Map, MapView, reactiveUtils, FeatureEffect, GeoJSONLayer, Home, Expand, Legend) {

    esriConfig.apiKey = "MY_API_TOKEN";

    let boroLayerView;
  
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

  const colors = ["#d92b30", "#3cccb4", "#000000", "#c27c30", "#FFD700"];

  const boroughs = {
    type: "simple-line",
    style: "solid",
    width: "3px",
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
    effect: "bloom(2, 0px, 1%)"
  });


  //Create NYC Borough Layer

  boundaryurl = "data/Borough Boundaries.geojson";

  const boundarylayer = new GeoJSONLayer ({
    url: boundaryurl,
    renderer: boro_render,
    outFields: ["boro_name"]
  });

  const map = new Map({
    basemap: "dark-gray", // Basemap layer service
    layers: [bikelayer, boundarylayer]
  });

    const view = new MapView({
        map: map,
        center: [-74.006016, 40.714761], // Longitude, latitude
        zoom: 11, // Zoom level
        container: "viewDiv" // Div element
    });

    //Add Watch function to alert when feature layers are fully loaded 

    reactiveUtils.once(
      ()=> bikelayer.loadStatus === "loaded")
      .then(()=>{
        console.log('bike layer now loaded');
      });

    reactiveUtils.once(
      ()=> boundarylayer.loadStatus === "loaded")
      .then(()=>{
        console.log('boundary layer is now loaded');
      });

    //when function to determine when view is loaded

    reactiveUtils.when(
      ()=> !view.updating,
      ()=> {
        console.log('view is finished updating');
      });

    //reactive utils watch function to listen for clicks on the view

    reactiveUtils.on(
      ()=> view,
      "click",
      (event)=>{
        console.log('click event occured:', event)
      }
    );

    //filter nodes

    const filterNodes = document.querySelectorAll(`.boro_item`);
    const filterElements = document.getElementById("filter");

    //click handler event for selection

    filterElements.addEventListener("click", filterByBoro);

    function filterByBoro(event) {
      const selectedBoro = event.target.getAttribute("data-boro");
      boroLayerView.filter = {
        where: "boro = '" + selectedBoro + "'"
      };
    }

    view.whenLayerView(bikelayer).then((layerView) => {
      boroLayerView = layerView;

      //UI
      filterElements.style.visibility = "visible";
      const filterExpand = new Expand ({
        view:view,
        content:filterElements,
        expandIconClass: "esri-icon-filter",
        group: "top-left"
      });
      //clear filters when pannel is closed
      filterExpand.watch("expanded", () => {
        if(!filterExpand.expanded) {
          boroLayerView.filter = null;
        }
      });
      view.ui.add(filterExpand, "top-left");
    });

    //Create Legend

    const legend = new Expand({
      content: new Legend({
        view: view,
        layerInfos: [{
          layer: boundarylayer,
          title: "NYC Boroughs"
        },
        {
          layer: bikelayer,
          title: "NYC Bike Routes"
        }]
      }),
      view: view,
      expanded: true
    });

    view.ui.add(legend, "bottom-left");

      //Create home zoom widget to return to initial zoom level

    let homebtn = new Home ({
      view: view
    });
    view.ui.add(homebtn, "top-left");
});