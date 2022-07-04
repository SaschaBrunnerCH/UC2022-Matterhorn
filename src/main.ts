import Color from "@arcgis/core/Color";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Map from "@arcgis/core/Map";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";
import Daylight from "@arcgis/core/widgets/Daylight";
import ElevationProfile from "@arcgis/core/widgets/ElevationProfile";
import TileLayer from "@arcgis/core/layers/TileLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import Feature from "@arcgis/core/widgets/Feature";
import { DocumentHighlights, HighlightSpan } from "typescript";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SizeVariable from "@arcgis/core/renderers/visualVariables/SizeVariable";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import Home from "@arcgis/core/widgets/Home";
import Basemap from "@arcgis/core/Basemap";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";

import LayerView from "@arcgis/core/views/layers/LayerView";

// setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.77/assets");

// const params = new URLSearchParams(document.location.search.slice(1));
// const someParam = params.has("someParam");

// IdentityManager.registerOAuthInfos([
//   new OAuthInfo({
//     appId: "",
//     popup: true,
//     popupCallbackUrl: `${document.location.origin}${document.location.pathname}oauth-callback-api.html`,
//   }),
// ]);

// (window as any).setOAuthResponseHash = (responseHash: string) => {
//   IdentityManager.setOAuthResponseHash(responseHash);
// };

const map = new Map({
  // Esri world satellite basemap
  basemap: "satellite",
  // Esri world elevation service
  ground: "world-elevation"
});

const railway = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/0",
  title: "Railway lines",
  elevationInfo: {
    mode: "on-the-ground"
  }
});
map.add(railway);


const cableCars = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/2",
  title: "Cable cars ",
  elevationInfo: {
    mode: "absolute-height"
  },
  renderer: new SimpleRenderer({
    symbol: new LineSymbol3D({
      symbolLayers: [
        new PathSymbol3DLayer({
          material: {
            color: [77, 77, 77],
          },
          join: "bevel",
          width: 5,
          height: 5

        })]
    })
  })

});
map.add(cableCars);

const slopes = new FeatureLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Ski%20Slopes%20Zermatt/FeatureServer",
  title: "Ski Slopes",
  elevationInfo: {
    mode: "on-the-ground"
  },
  renderer: new UniqueValueRenderer({

    field: "difficulty",
    defaultLabel: "Other",
    uniqueValueInfos: [
      {
        label: "Beginner",
        symbol: new LineSymbol3D({
          symbolLayers: [
            new LineSymbol3DLayer({
              material: {
                color: "#548953",
              },
              join: "bevel",
              cap: "round",
              size: 1.5
            }),
          ],
        }),
        value: "beginner",
      },
      {
        label: "Easy",
        symbol: new LineSymbol3D({
          symbolLayers: [
            new LineSymbol3DLayer({
              material: {
                color: "#007ac2",
              },
              join: "bevel",
              cap: "round",
              size: 1.5
            }),
          ],
        }),
        value: "easy",
      },
      {
        label: "Medium",
        symbol: new LineSymbol3D({
          symbolLayers: [
            new LineSymbol3DLayer({
              material: {
                color: "#d90012",
              },
              join: "bevel",
              cap: "round",
              size: 1.5
            }),
          ],
        }),
        value: "medium",
      },
      {
        label: "Difficult",
        symbol: new LineSymbol3D({
          symbolLayers: [
            new LineSymbol3DLayer({
              material: {
                color: [0, 0, 0],
              },
              join: "bevel",
              cap: "round",
              size: 1.5
            }),
          ],
        }),
        value: "difficult",
      },
    ],
  })
});
map.add(slopes);

const hikingPaths = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/1",
  title: "Hiking paths",
  visible: false
});
map.add(hikingPaths);

const rocks = new FeatureLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Zermatt_Rocks/FeatureServer",
  title: "Rocks",
  legendEnabled: false,
  listMode: "hide",
  elevationInfo: {
    mode: "on-the-ground"
  },
  renderer: new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: [43, 43, 43, 0.36],
            colorMixMode: "replace"
          }
        })]
    })
  })
});
map.add(rocks);

const buildings = new SceneLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Zermatt/SceneServer",
  title: "Buildings",
  legendEnabled: false,
  listMode: "hide",
  renderer: new SimpleRenderer({
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: [194, 159, 99],
            colorMixMode: "tint"
          }
        })]
    })
  })
});
map.add(buildings);

const roofs = new SceneLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Building_Roofs_Zermatt/SceneServer",
  title: "Roofs",
  legendEnabled: false,
  listMode: "hide",
  renderer: new SimpleRenderer({
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: [115, 76, 0],
            colorMixMode: "tint"
          }
        })]
    })
  })
});
map.add(roofs);

const trees = new SceneLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/ZermattTreesFinal/SceneServer",
  title: "Trees",
  visible: false,
  renderer: new SimpleRenderer({
    symbol: new PointSymbol3D({
      symbolLayers: [
        new ObjectSymbol3DLayer({
          resource: {
            href: "https://static.arcgis.com/arcgis/styleItems/RealisticTrees/gltf/resource/LarixDecidua.glb"
          },
          height: 30
        })]
    })
  })
});
map.add(trees);

const hillshade = new TileLayer({
  url: "https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
  title: "Hillshade",
  legendEnabled: false,
  listMode: "hide"
});



const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera:
  {
    position: [
      7.80103763,
      46.03375606,
      4264.89987
    ],
    heading: 231.57,
    tilt: 77.49
  },
  qualityProfile: "high",

  environment: {
    weather: { type: 'snowy', cloudCover: 0.14, precipitation: 0.3, snowCover: 'enabled' },
    atmosphere: {
      quality: "high"
    }
  }
});


// Remove basemap and set ground color
view.map.basemap = "none";
view.map.ground.surfaceColor = new Color("#d9ecff");
// Add hillshade layer on top
view.map.layers.add(hillshade);
// Blend the hillshade layer with the background
hillshade.blendMode = "luminosity";


/***********************************
 * Add the widgets' UI elements to the view
 ***********************************/
const weatherExpand = new Expand({
  view: view,
  content: new Weather({
    view: view
  }),
  group: "top-right"
  //expanded: true
});

const daylightExpand = new Expand({
  view: view,
  content: new Daylight({
    view: view
  }),
  group: "top-right"
});
view.ui.add([weatherExpand, daylightExpand], "top-right");

const elevationProfile = new ElevationProfile({ view: view });
const elevationProfileExpand = new Expand({
  view: view,
  content: elevationProfile,
  expanded: false
});

view.ui.add(elevationProfileExpand, "bottom-right");
view.ui.add(new Home({ view: view }), "top-left")

let summer = document.getElementById("summer") as HTMLCalciteButtonElement;
let winter = document.getElementById("winter") as HTMLCalciteButtonElement;

summer.addEventListener("click", () => {
  summer.appearance = "solid";
  winter.appearance = "outline";

  view.environment.weather = { type: 'cloudy', cloudCover: 0.5 },

    slopes.visible = false;
  hikingPaths.visible = true;
  hillshade.visible = false;
  rocks.visible = false;
  trees.visible = true;

  map.basemap = Basemap.fromId("satellite")

  document.getElementById("title").innerHTML = "Hiking Paths"
});

winter.addEventListener("click", () => {
  winter.appearance = "solid";
  summer.appearance = "outline";

  view.environment.weather = { type: 'snowy', cloudCover: 0.14, precipitation: 0.3, snowCover: 'enabled' },

    slopes.visible = true;
  hikingPaths.visible = false;
  hillshade.visible = true;
  rocks.visible = true;
  trees.visible = false;

  map.basemap = Basemap.fromId("")

  document.getElementById("title").innerHTML = "Slopes"

});

view.when(() => {

  loadSlopes();
});

let highlight: any = null;
let selectedSlope: string = "";

function loadSlopes() {
  let slopesContainer = document.getElementById("slopes");

  // Create empty query, means to take all rows!
  var query = slopes.createQuery();

  slopes.queryFeatures(query).then((results) => {
    if (results.features.length > 0) {
      let features = results.features;
      features = features.sort(() => Math.random() - 0.5);

      for (let i in features) {
        if (["Furgg - Furi", "Kuhbodmen", "Weisse Perle", "Matterhorn", "Plan Maison"].includes(features[i].attributes["title"])) {
          var div = document.createElement("calcite-button");
          div.appearance = "outline";
          div.id = features[i].attributes["ObjectId"];
          div.classList.add("slope");
  
          switch (features[i].attributes["difficulty"]) {
            case "beginner":
              div.classList.add("green");
              break;
            case "easy":
              div.classList.add("blue");
              break;
            case "medium":
              div.classList.add("red");
              break;
            case "hard":
              div.classList.add("black");
              break;
          }
          div.innerHTML = features[i].attributes["title"];
          slopesContainer?.appendChild(div);
  
          div.addEventListener("click", () => {
            view.goTo(features[i].geometry).then(() => {
              //view.popup.viewModel.features = [features[i]];
              //view.popup.open();
            });
            highlightSlope(features[i]);
          });
        }
        
      }
    }
  });
}

function highlightSlope(feature: Feature) {
  if (feature == null || (selectedSlope != "" && selectedSlope == feature.getObjectId())) {
    if (highlight) {
      highlight.remove();
    }
    elevationProfile.viewModel.input = null;
    elevationProfileExpand.expanded = false;
    (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "outline";
    selectedSlope = "";
    view.popup.close();
  } else {
    view.whenLayerView(feature.layer).then((layerView:LayerView) => {
      if (highlight) {
        highlight.remove();
      }
      highlight = layerView.highlight([feature.getObjectId()]);
    });

    elevationProfile.viewModel.input = feature;
    elevationProfileExpand.expanded = true;

    if (selectedSlope != "") {
      (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "outline";
    }

    selectedSlope = feature.getObjectId();
    console.log(selectedSlope);
    (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "solid";
  }
}

view.on("click", function (event:any) {
  view.hitTest(event.screenPoint).then(function (response:any) {
    var res = response.results[0];
    // If there was an element clicked and also this element is either part of the traffic or public transport layers
    if (res && res.graphic.layer.title == "Ski Slopes") {
      highlightSlope(res.graphic);
    } else highlightSlope(null);
  });
});


let rotating = false;

function rotate() {
  if (rotating && !view.interacting) {
    view.goTo(
      {
        heading: view.camera.heading + 0.2,
        center: view.center
      },
      { animate: false }
    );
    requestAnimationFrame(rotate);
  }
}

document.getElementById("rotateButton")?.addEventListener("click", () => {
  rotating = !rotating;
  rotate();
});

view.ui.add("rotateButton", "bottom-left");

window["view"] = view;
