import Basemap from "@arcgis/core/Basemap";
import Camera from "@arcgis/core/Camera";
import Color from "@arcgis/core/Color";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Map from "@arcgis/core/Map";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import SnowyWeather from "@arcgis/core/views/3d/environment/SnowyWeather";
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import LayerView from "@arcgis/core/views/layers/LayerView";
import SceneView from "@arcgis/core/views/SceneView";
import Daylight from "@arcgis/core/widgets/Daylight";
import ElevationProfile from "@arcgis/core/widgets/ElevationProfile";
import ElevationProfileLineGround from "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineGround";
import Expand from "@arcgis/core/widgets/Expand";
import Home from "@arcgis/core/widgets/Home";
import Legend from "@arcgis/core/widgets/Legend";
import Weather from "@arcgis/core/widgets/Weather";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";

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

/***********************************
 * Load and add all the layers
 ***********************************/

const map = new Map({
  // Esri world satellite basemap
  basemap: "satellite",
  // Esri world elevation service
  ground: "world-elevation"
});

const railway = new FeatureLayer({
  visible: false,
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/0",
  title: "Railway lines",
  legendEnabled: false,
  elevationInfo: {
    mode: "on-the-ground"
  },
  renderer: new SimpleRenderer({
    symbol: new LineSymbol3D({
      symbolLayers: [
        new LineSymbol3DLayer({
          material: { color: [30, 30, 30] },
          size: "2.7px"
        }),
        new LineSymbol3DLayer({
          material: { color: [240, 240, 240] },
          size: "1.5px"
        }),
        new LineSymbol3DLayer({
          pattern: new LineStylePattern3D({
            style: "dash"
          }),
          material: { color: [30, 30, 30] },
          size: "1.5px"
        })
      ]
    })
  })
});
map.add(railway);


const cableCars = new FeatureLayer({
  visible: false,
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/2",
  title: "Cable cars",
  legendEnabled: false,
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
  visible: false,
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
  visible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: new UniqueValueRenderer({
    field: "difficulty",
    field2: "theme",
    fieldDelimiter: ", ",
    legendOptions: {
      title: "Hiking paths"
    },
    uniqueValueInfos: [
      {
        value: "easy, ",
        symbol: getHikingPathSymbol(
          "solid",
          [252, 194, 1]
        )
      },
      {
        value: "medium, ",
        symbol: getHikingPathSymbol(
          "dash",
          [252, 194, 1]
        )
      },
      {
        value: "difficult, ",
        symbol: getHikingPathSymbol(
          "dot",
          [252, 194, 1]
        )
      },
      {
        value: "easy, panoramic",
        symbol: getHikingPathSymbol(
          "solid",
          [250, 59, 32]
        )
      },
      {
        value: "medium, panoramic",
        symbol: getHikingPathSymbol(
          "dash",
          [250, 59, 32]
        )
      },
      {
        value: "difficult, panoramic",
        symbol: getHikingPathSymbol(
          "dot",
          [250, 59, 32]
        )
      }
    ]
  })
});
map.add(hikingPaths);

const rocks = new FeatureLayer({
  visible: false,
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
  visible: false,
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
  visible: false,
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
  legendEnabled: false,
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
  camera: new Camera(
    {
      position: {
        longitude: 7.80103763,
        latitude: 46.03375606,
        z: 4264.89987
      },
      heading: 231.57,
      tilt: 77.49
    }),
  qualityProfile: "high",

  environment: {
    weather: { type: 'snowy', cloudCover: 0.14, precipitation: 0.3, snowCover: 'enabled' },
    atmosphere: {
      quality: "high"
    }
  }
});


/***********************************
 * Make a winter basemap
 ***********************************/

// Remove basemap and set ground color
//view.map.basemap = "none";
view.map.basemap = map.basemap = Basemap.fromId("");
view.map.ground.surfaceColor = new Color("#d9ecff");
// Add hillshade layer on top
view.map.layers.add(hillshade);
// Blend the hillshade layer with the background
hillshade.blendMode = "luminosity";


/***********************************
 * Add the widgets' UI elements to the view
 ***********************************/
const weatherExpand = new Expand({
  visible: false,
  view: view,
  content: new Weather({
    view: view
  }),
  group: "top-right"
  //expanded: true
});

const daylightExpand = new Expand({
  visible: false,
  view: view,
  content: new Daylight({
    view: view
  }),
  group: "top-right"
});
view.ui.add([weatherExpand, daylightExpand], "top-right");

const groundProfile = new ElevationProfileLineGround({});

groundProfile.visible = false

const elevationProfile = new ElevationProfile({
  view: view,
  profiles: [
    { type: "input" },
    groundProfile
  ]
});



const elevationProfileExpand = new Expand({
  view: view,
  content: elevationProfile,
  expanded: false
});

view.ui.add(elevationProfileExpand, "top-right");
view.ui.add(new Home({ view: view }), "top-left")


let legend = new Legend({
  view: view,
  container: "legend"
});

/***********************************
 * Plenary buttons
 ***********************************/

const showZermatt = async () => {
  return await view.goTo(new Camera({
    position: {
      x: 7.80936535,
      y: 46.01498424,
      z: 3447.14671,
    },
    heading: 249.22,
    tilt: 83.87
  }));
};
let showZermattBtn = document.getElementById("showZermatt") as HTMLCalciteButtonElement;
showZermattBtn.addEventListener("click", showZermatt);
view.ui.add(showZermattBtn, "bottom-left");


let showSummerMapBtn = document.getElementById("showSummerMap") as HTMLCalciteButtonElement;

const showSummerMap = async () => {
  cableCars.visible = true;
  railway.visible = true;
  hikingPaths.visible = true;
  // trees.visible = true;

  await reactiveUtils.whenOnce(() => !view.updating);

  view.goTo(new Camera({
    position: {
      x: 7.71800069,
      y: 46.02965198,
      z: 5788.46887,
    },
    heading: 152.83,
    tilt: 48.84
  }))
};

showSummerMapBtn.addEventListener("click", showSummerMap);

view.ui.add(showSummerMapBtn, "bottom-left");


const showWinterBasemap = async () => {

  await showZermatt();

  hikingPaths.visible = false;
  railway.visible = false;

  await reactiveUtils.whenOnce(() => !view.updating);

  slopes.visible = false;

  // rocks.visible = true;
  trees.visible = false;
  hillshade.visible = false;

  map.basemap.baseLayers.forEach(l => l.visible = false);

  // map.basemap = Basemap.fromId("");
};
let showWinterBasemapBtn = document.getElementById("showWinterBasemap") as HTMLCalciteButtonElement;
showWinterBasemapBtn.addEventListener("click", showWinterBasemap);
view.ui.add(showWinterBasemapBtn, "bottom-left");


const showBlendedBasemap = () => {
  hillshade.visible = true;
  slopes.visible = true;
};
let showBlendedBasemapBtn = document.getElementById("showBlendedBasemap") as HTMLCalciteButtonElement;
showBlendedBasemapBtn.addEventListener("click", showBlendedBasemap);
view.ui.add(showBlendedBasemapBtn, "bottom-left");

// elevationProfileExpand.watch("expanded", () => {
//   if (elevationProfileExpand.expanded) {
//     slopes.visible = true;
//   }
// });

/***********************************
 * Functionality to change between summer and winter
 ***********************************/

let summer = document.getElementById("summer") as HTMLCalciteButtonElement;
let winter = document.getElementById("winter") as HTMLCalciteButtonElement;
let slopesContainer = document.getElementById("slopes") as HTMLCalciteButtonElement;

const showSummer = () => {
  summer.appearance = "solid";
  winter.appearance = "outline";

  view.environment.weather = new CloudyWeather({ cloudCover: 0.5 });

  slopes.visible = false;
  hikingPaths.visible = true;
  hillshade.visible = false;
  rocks.visible = false;
  trees.visible = true;

  map.basemap = Basemap.fromId("satellite")

  slopesContainer.style.visibility = "hidden";
};

const showWinter = () => {
  winter.appearance = "solid";
  summer.appearance = "outline";

  view.environment.weather = new SnowyWeather({
    cloudCover: 0.14, precipitation: 0.3,
    snowCover: 'disabled'
  });

  slopes.visible = true;
  hikingPaths.visible = false;
  hillshade.visible = true;
  rocks.visible = true;
  trees.visible = false;

  map.basemap = Basemap.fromId("")

  slopesContainer.style.visibility = "visible";

};

summer.addEventListener("click", showSummer);

winter.addEventListener("click", showWinter);

/***********************************
 * Functionality to rotate
 ***********************************/
let rotating = false;

const rotateButton = document.getElementById("rotateButton") as HTMLCalciteButtonElement;

rotateButton.addEventListener("click", () => {
  rotating = !rotating;
  rotate();
});

rotateButton.hidden = true;

view.ui.add(rotateButton, "bottom-left");



/***********************************
 * Functionality to choose different slopes
 ***********************************/

let highlight: any = null;
let selectedSlope: string = "";

view.when(() => {
  loadSlopes();

  // Initial configuration

  view.camera = new Camera({
    position: {
      x: 10.47143029,
      y: 24.62260916,
      z: 6016793.21337,
    },
    heading: 356.09,
    tilt: 20.43
  });

  view.environment.weather = new CloudyWeather({ cloudCover: 0.5 });

  slopes.visible = false;
  hikingPaths.visible = false;
  hillshade.visible = false;
  rocks.visible = false;
  trees.visible = false;

  map.basemap = Basemap.fromId("satellite");

});

view.on("click", function (event: any) {
  view.hitTest(event.screenPoint).then(function (response: any) {
    var res = response.results[0];
    // If there was an element clicked and also this element is either part of the traffic or public transport layers
    if (res && (res.graphic.layer.title == "Ski Slopes" || res.graphic.layer.title == "Cable cars")) {
      highlightSlope(res.graphic);
    } else highlightSlope(null);
  });
});

/***********************************
 * Helper functions
 ***********************************/

function loadSlopes() {
  let slopesContainer = document.getElementById("slopes");

  // Create empty query, means to take all rows!
  var query = slopes.createQuery();

  slopes.queryFeatures(query).then((results) => {
    if (results.features.length > 0) {
      let features = results.features;

      for (let i in features) {
        if (["Furgg - Furi", "Kuhbodmen", "Weisse Perle", "Matterhorn panorama", "Plan Maison"].includes(features[i].attributes["title"])) {
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

function highlightSlope(graphic: Graphic | null) {
  if (graphic == null || (selectedSlope != "" && selectedSlope == graphic.attributes["ObjectId"])) {
    if (highlight) {
      highlight.remove();
    }
    elevationProfile.viewModel.input = new Graphic();
    elevationProfileExpand.expanded = false;
    if (document.getElementById(selectedSlope)) {
      (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "outline";
    }
    selectedSlope = "";
    view.popup.close();
  } else {
    view.whenLayerView(graphic.layer).then((layerView: LayerView) => {
      if (highlight) {
        highlight.remove();
      }
      highlight = (layerView as FeatureLayerView).highlight([graphic.attributes["ObjectId"]]);
    });

    elevationProfile.viewModel.input = graphic;
    elevationProfileExpand.expanded = true;

    if (document.getElementById(selectedSlope) && selectedSlope != "") {
      (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "outline";
    }
    selectedSlope = graphic.attributes["ObjectId"];

    if (document.getElementById(selectedSlope)) {
      (document.getElementById(selectedSlope) as HTMLCalciteButtonElement).appearance = "solid";
    }

  }
}

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

function getHikingPathSymbol(patternStyle: any, color: [number, number, number]) {
  // Each line is rendered with two symbol layers: an opaque line and a semi-transparent background of the same color underneath it.
  const patternColor = new Color(color);
  const backgroundColor = new Color(color);
  // Adding an alpha value to make the background transparent.
  backgroundColor.a = 0.2;

  return new LineSymbol3D({
    symbolLayers: [
      new LineSymbol3DLayer({
        // If no pattern is specified, line is rendered as solid.
        material: { color: backgroundColor },
        size: patternStyle === "dot" ? "3px" : "2px"
      }),
      new LineSymbol3DLayer({
        pattern: new LineStylePattern3D({
          // Using pattern to mark difficulty
          style: patternStyle
        }),
        cap: "round",
        join: "round",
        material: { color: patternColor },
        size: patternStyle === "dot" ? "3px" : "1.6px"
      })
    ]
  });
}

window["view"] = view;
