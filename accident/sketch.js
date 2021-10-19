let geodata = []; //buildings
let geodata1 = []; //roads
let geodata2 = []; //water
let geodata3 = []; //accident
let geodata4 = []; //bank

let backgroundImg;

let bounds = {
  //original
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,

  //verzogen
  // left:  8.284340,
  // top: 47.064680,
  // right: 8.331018,
  // bottom: 47.031380,
};

let filter = "Montag";

function preload() {
  geodata = loadJSON("data-main/lucerne-buildings.geojson");
  geodata1 = loadJSON("data-main/lucerne-roads.geojson");
  geodata2 = loadJSON("lucerne-water.geojson");
  geodata3 = loadJSON("data-main/accidentLU.geojson");
  geodata4 = loadJSON("data-main/SITZBANK_SITZBANK.json");

  // backgroundImg = loadImage("bg.png"); // Foto mit allen Daten
  backgroundImg = loadImage("original.png"); //original Foto ohne Accident Daten
}

function setup() {
  pixelDensity(3);
  createCanvas(1260, 910);
  // createCanvas(2700, 1950);
  // createCanvas(4050, 2925);

  //console.log(geodata);

  buildingsData = geodata.features;
  roadsData = geodata1.features;
  waterData = geodata2.features;
  accidentData = geodata3.features;
  bankData = geodata4.features;

  noLoop();
}

function draw() {
  background("#FEE9C1");
  image(backgroundImg, 0, 0, width, height);

  // drawWater();
  // drawBuildings();
  // drawRoads();
  drawAccident();
  // drawBank();
  drawText();
}

//water
function drawWater() {
  for (let i = 0; i < waterData.length; i++) {
    let waterObject = waterData[i];
    let geometry = waterObject.geometry;
    let coordinates = geometry.coordinates[0];
    let coordinates2 = coordinates[0];

    stroke(1);
    fill("#A3DAD1");
    beginShape();

    for (let l = 0; l < coordinates2.length; l++) {
      let coord = coordinates2[l];
      // console.log(coord);
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
      //ellipse(x,y,r,r);
    }
    endShape();
  }
}

// buildings

function drawBuildings() {
  for (let i = 0; i < buildingsData.length; i++) {
    let buildingsObject = buildingsData[i];
    let geometry = buildingsObject.geometry;
    let coordinates = geometry.coordinates[0];
    let coordinates2 = coordinates[0];

    // stroke(0);
    noStroke();
    fill("#CFA969");
    beginShape();

    for (let j = 0; j < coordinates2.length; j++) {
      let coord = coordinates2[j];
      //console.log(coord);
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
      //ellipse(x,y,r,r);
    }
    endShape();
  }
}

//roads
function drawRoads() {
  for (let j = 0; j < geodata1.features.length; j++) {
    let roadsCoordinates = geodata1.features[j].geometry.coordinates;
    let properties = geodata1.features[j].properties;

    if (properties.highway == "residential") {
      stroke("#7986CA");
      strokeWeight(0.5);
    } else if (properties.highway == "motorway") {
      noFill();
      stroke("#71332F");
      strokeWeight(3);
    } else if (properties.highway == "motorway_link") {
      noFill();
      stroke("#94524d");
      strokeWeight(1.5);
    } else if (properties.highway == "primary") {
      stroke("#CC3F31");
      strokeWeight(1);
    } else if (properties.highway == "secondary") {
      stroke("#74b9ff");
      strokeWeight(0.5);
    } else if (properties.highway == "service") {
      stroke("#C8B4E1");
      strokeWeight(0.5);
    } else if (properties.highway == "track") {
      stroke("#27ae60");
      strokeWeight(0.5);
    } else if (properties.highway == "path") {
      stroke("#27ae60");
      strokeWeight(0.5);
    } else if (properties.highway == "steps") {
      stroke("#c0392b");
      strokeWeight(0.5);
    } else if (properties.highway == "cycleway") {
      stroke("#636e72");
      strokeWeight(0.5);
    } else if (properties.highway == "pedestrian") {
      stroke("#6D214F");
      strokeWeight(0.5);
    } else if (properties.highway == "footway") {
      stroke("#2C3A47");
      strokeWeight(0.5);
    } else {
      stroke("#CAD3C8");
      strokeWeight(0.3);
    }

    noFill();
    // fill('rgba(255, 213, 0, 0.1)');
    // noStroke();
    beginShape();
    for (let k = 0; k < roadsCoordinates.length; k++) {
      let roadsCoord = roadsCoordinates[k];
      //console.log(coord);
      let x = map(roadsCoord[0], bounds.left, bounds.right, 0, width);
      let y = map(roadsCoord[1], bounds.top, bounds.bottom, 0, height);
      // let r = random(0, 10);
      // let r = 3;
      vertex(x, y);
      // ellipse(x, y, r);
      // ellipse(x, y, r*2);
      // ellipse(x,y,r*3)
      // ellipse(x, y, r*4);
    }
    endShape();
  }
}

//accident
function drawAccident() {
  for (let i = 0; i < geodata3.features.length; i++) {
    //geodata3.features.length
    let accidentCoordinates = geodata3.features[i].geometry.coordinates;
    let properties = geodata3.features[i].properties;

    // if (properties.AccidentWeekDay_de == "Freitag") {
    //   fill("#ff4adb")
    //   strokeWeight(0.2)
    // } else if (properties.AccidentYear >= "2017") {
    //   fill("#00d9ff")
    //   strokeWeight(0.2)
    // } else {
    //   stroke(1);
    //   strokeWeight(0.1);
    //   fill("red");
    // }

    // console.log(accidentCoordinates)
    fill(104, 66, 239); //violett
    // fill("#E8464E"); //rot
    noStroke();
    // for (let j = 0; j < accidentCoordinates.length; j++) {
    //   let accidentCoord = accidentCoordinates[j];

    let x = map(accidentCoordinates[0], bounds.left, bounds.right, 0, width);
    let y = map(accidentCoordinates[1], bounds.top, bounds.bottom, 0, height);
    // let r = random(0, 10);
    let r = 3.5;

    //ändern des Design der Tastenkombi
    if (properties.AccidentWeekDay_de == filter) {
      ellipse(x, y, r);
    }

    // if (properties.AccidentWeekDay_de == "Sonntag") {
    //   ellipse(x, y, r);
    // }
    // }
  }
}

//bank
function drawBank() {
  for (let i = 0; i < geodata4.features.length; i++) {
    let bankCoordinates = geodata4.features[i].geometry.coordinates;
    let properties = geodata3.features[i].properties;

    for (let j = 0; j < bankCoordinates.length; j++) {
      let bankCoord = bankCoordinates[j];

      fill("green");

      let x = map(bankCoordinates[0], bounds.left, bounds.right, 0, width);
      let y = map(bankCoordinates[1], bounds.top, bounds.bottom, 0, height);
      let r = 1;

      ellipse(x, y, r);
    }
  }
}

//text
function drawText() {
  let x = 100;
  let y = 100;

  fill(0, 0, 0, 40);
  noStroke();
  rect(x, y, 200, 500, 10);
  textSize(25);
  noStroke();
  fill("Black");
  text("Klicke:", x + 20, y + 40);

  textSize(20);
  text(
    "1 für Montag" +
      "\n" +
      "\n" +
      "2 für Dienstag" +
      "\n" +
      "\n" +
      "3 für Mittwoch" +
      "\n" +
      "\n" +
      "4 für Donnerstag" +
      "\n" +
      "\n" +
      "5 für Freitag" +
      "\n" +
      "\n" +
      "6 für Samstag" +
      "\n" +
      "\n" +
      "7 für Sonntag",
    x + 20,
    y + 80
  );
}

//export

function keyTyped() {
  // console.log("saving...");
  // saveCanvas("p5map", "png");

  if (key == "1") {
    filter = "Montag";
  } else if (key == "2") {
    filter = "Dienstag";
  } else if (key == "3") {
    filter = "Mittwoch";
  } else if (key == "4") {
    filter = "Donnerstag";
  } else if (key == "5") {
    filter = "Freitag";
  } else if (key == "6") {
    filter = "Samstag";
  } else if (key == "7") {
    filter = "Sonntag";
  }

  if (key == "d") {
    saveCanvas("accidentMap", "png");
  }

  redraw();
}
