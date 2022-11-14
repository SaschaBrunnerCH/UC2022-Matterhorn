import Basemap from "@arcgis/core/Basemap";
import Camera from "@arcgis/core/Camera";
import Color from "@arcgis/core/Color";
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
import ElevationProfileLineInput from "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineInput";
import Expand from "@arcgis/core/widgets/Expand";
import Home from "@arcgis/core/widgets/Home";
import Legend from "@arcgis/core/widgets/Legend";
import Weather from "@arcgis/core/widgets/Weather";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-button";



let elevationProfile: ElevationProfile;
let elevationProfileExpand: Expand;

let rendererCableCar = new SimpleRenderer({
  symbol: new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        material: {
          color: [77, 77, 77],
        },
        join: "bevel",
        width: 5,
        height: 5

      }),
      new LineSymbol3DLayer({
        material: {
          color: [77, 77, 77],
        },
        join: "bevel",
        size: 3,
      })]
  })
});

let rendererHikingPaths = new UniqueValueRenderer({
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

let rendererSlopes = new UniqueValueRenderer({

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
      value: "hard",
    },
  ],
})

//***********************************
//* Add more data
//***********************************

const railway = new FeatureLayer({
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












const map = new Map({
  // Esri world satellite basemap
  basemap: "satellite",
  // Esri world elevation service
  // ground: "world-elevation"
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
    atmosphere: {
      quality: "high"
    }
  }
});


//***********************************
//* Step 1: Adding data
//***********************************

const hikingPaths = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/1",
  title: "Hiking paths",
  elevationInfo: {
    mode: "on-the-ground"
  },
  renderer: rendererHikingPaths,
  visible: false
});
map.add(hikingPaths);

const slopes = new FeatureLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Ski%20Slopes%20Zermatt/FeatureServer",
  title: "Ski Slopes",
  elevationInfo: {
    mode: "on-the-ground"
  },
  renderer: rendererSlopes,
  visible: false
});
map.add(slopes);

const cableCars = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Zermatt_hiking_cable_rail/FeatureServer/2",
  title: "Cable cars",
  legendEnabled: false,
  elevationInfo: {
    mode: "absolute-height"
  },
  renderer: rendererCableCar,
  visible: false
});
map.add(cableCars);

// hikingPaths.visible = true;
// cableCars.visible = true;
// slopes.visible = true;

//***********************************
//* Step 2: Blend modes
//***********************************

// Load hillshade layer
const hillshade = new TileLayer({
  url: "https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
  title: "Hillshade",
  legendEnabled: false,
  listMode: "hide",
  visible: false
});
view.map.layers.add(hillshade);


function addBlendModes() {
  addBlendModeButtons();
  const daylightExpand = new Expand({
    view: view,
    content: new Daylight({
      view: view
    }),
    group: "top-right"
  });
  view.ui.add([daylightExpand], "top-right");

  document.getElementById("background")?.addEventListener("click", () => {
    view.map.basemap = null as any;
    view.map.ground.surfaceColor = new Color("#d9ecff");
    hillshade.visible = false;
  })
  document.getElementById("hillshade")?.addEventListener("click", () => {
    hillshade.visible = true;
    hillshade.blendMode = "normal";
  })
  document.getElementById("blendMode")?.addEventListener("click", () => {
    hillshade.visible = true;
    hillshade.blendMode = "luminosity";
  })

}

// addBlendModes();


//***********************************
//* Step 3: Add Buildings
//***********************************


// addBuildings()

// view.environment.weather = new SnowyWeather({ cloudCover: 0.6, precipitation: 0.3 })


//***********************************
//* Step 4: Finalize app
//***********************************


// finalizeApp()



//***********************************
//* Step 5: Functionality to rotate
//***********************************
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

//addRotateButton()




view.ui.add(new Home({ view: view }), "top-left")


//***********************************
//* Functionality to change between summer and winter
//***********************************

let summer = document.getElementById("summer") as HTMLCalciteButtonElement;
let winter = document.getElementById("winter") as HTMLCalciteButtonElement;
let slopesContainer = document.getElementById("slopes") as HTMLCalciteButtonElement;

summer.addEventListener("click", () => {
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
});

winter.addEventListener("click", () => {
  winter.appearance = "solid";
  summer.appearance = "outline";

  view.environment.weather = new SnowyWeather({ cloudCover: 0.14, precipitation: 0.3, snowCover: 'enabled' });

  slopes.visible = true;
  hikingPaths.visible = false;
  hillshade.visible = true;
  rocks.visible = true;
  trees.visible = false;

  map.basemap = Basemap.fromId("")

  slopesContainer.style.visibility = "visible";

});

//***********************************
//* Functionality to choose different slopes
//***********************************

let highlight: any = null;
let selectedSlope: string = "";

view.when(() => {

  let slopesList = [
    "Kuhbodmen",
    "Gandegg",
    "Weisse Perle",
    "Matterhorn panorama",
    "Furgg - Furi",
  ];
  let slopesNames = [
    "Easy Rider",
    "Glacier Run",
    "Valley Slope",
    "Matterhorn Panorama",
    "Express Track",
  ]

  for (let i = 0; i < slopesList.length; i++) {
    var query = slopes.createQuery();
    query.where = "title = '" + slopesList[i] + "'"

    slopes.queryFeatures(query).then((results) => {
      if (results.features.length > 0) {
        let feature = results.features[0];

        var div = document.createElement("calcite-button");
        div.appearance = "outline";
        div.id = feature.getObjectId().toString();
        div.classList.add("slope");

        switch (feature.attributes["difficulty"]) {
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
        div.innerHTML = slopesNames[i];
        slopesContainer?.appendChild(div);

        div.addEventListener("click", () => {
          view.goTo(feature.geometry).then(() => {
            //view.popup.viewModel.features = [feature];
            //view.popup.open();
          });
          (elevationProfile.profiles as any) = [
            new ElevationProfileLineGround(),
          ];
          highlightSlope(feature);
        });
      }
    })

  }
});

view.on("click", function (event: any) {
  view.hitTest(event.screenPoint).then(function (response: any) {
    var res = response.results[0];
    // If there was an element clicked and also this element is either part of the traffic or public transport layers
    if (res && (res.graphic.layer.title == "Ski Slopes" || res.graphic.layer.title == "Hiking paths")) {
      (elevationProfile.profiles as any) = [
        new ElevationProfileLineGround(),
      ];
      highlightSlope(res.graphic);
    }
    else if (res && (res.graphic.layer.title == "Cable cars")) {
      (elevationProfile.profiles as any) = [
        new ElevationProfileLineGround(),
        new ElevationProfileLineInput()
      ];
      highlightSlope(res.graphic);
    }
    else highlightSlope(null);
  });
});

//***********************************
//* Helper functions
//***********************************

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



function addRotateButton() {
  document.getElementById("rotateButton")?.addEventListener("click", () => {
    if (rotating) {
      (document.getElementById("rotateButton") as HTMLCalciteButtonElement).appearance = "outline"
    }
    else {
      (document.getElementById("rotateButton") as HTMLCalciteButtonElement).appearance = "solid"
    }
    rotating = !rotating;
    rotate();
  });
  view.ui.add("rotateButton", "bottom-left");
}


function addBlendModeButtons() {
  document.getElementById("blendModeButtons")!.style.display = "block";
  view.ui.add("blendModeButtons", "bottom-right");
}


function addBuildings() {
  map.add(buildings);

  view.camera = new Camera({
    position: {
      x: 7.74662272,
      y: 46.01522504,
      z: 1713.63692
    },
    heading: 231.80,
    tilt: 93.40
  })
  // Remove basemap and set ground color
  //view.map.basemap = "none";
  view.map.basemap = map.basemap = Basemap.fromId("");
  view.map.ground.surfaceColor = new Color("#d9ecff");
  // Add hillshade layer on top
  hillshade.visible = true;
  // Blend the hillshade layer with the background
  hillshade.blendMode = "luminosity";


  document.getElementById("blendModeButtons")!.style.display = "none";
  view.ui.remove("blendModeButtons");

  view.qualityProfile = "low";
  view.environment.atmosphere!.quality = "low";
  view.environment.lighting!.directShadowsEnabled = false;

}

function finalizeApp() {

  //***********************************
  //* Add the widgets' UI elements to the view
  //***********************************
  const weatherExpand = new Expand({
    view: view,
    content: new Weather({
      view: view
    }),
    group: "top-right"
    //expanded: true
  });

  // const daylightExpand = new Expand({
  //   view: view,
  //   content: new Daylight({
  //     view: view
  //   }),
  //   group: "top-right"
  // });

  elevationProfile = new ElevationProfile({
    view: view,
    profiles: [
      new ElevationProfileLineGround(),
      new ElevationProfileLineInput()
    ]
  });
  elevationProfileExpand = new Expand({
    view: view,
    content: elevationProfile,
    expanded: false,
  });


  new Legend({
    view: view,
    container: "legend"
  });
  view.camera = new Camera(
    {
      position: {
        longitude: 7.80103763,
        latitude: 46.03375606,
        z: 4264.89987
      },
      heading: 231.57,
      tilt: 77.49
    })

  view.qualityProfile = "high";
  view.environment.atmosphere!.quality = "high";
  view.environment.lighting!.directShadowsEnabled = true;

  document.getElementById("qualityButtons")!.style.display = "none";
  view.ui.remove("qualityButtons");

  document.getElementById("container")!.style.display = "block";
  document.getElementById("viewDiv")!.style.width = "80%";

  view.ui.add([weatherExpand], "top-right");
  view.ui.add(elevationProfileExpand, "bottom-right");

  map.add(railway);
  map.add(rocks);
  map.add(roofs);
  map.add(trees);
}

window["view"] = view;
