let geodata;
let treeData;

let backgroundImg;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

let accidents = [
  {
    day: "Montag",
  },
  {
    day: "Dienstag",
  },
  {
    day: "Dienstag",
  },
  {
    day: "Mittwoch",
  },
];

let filter = null;

let selection = [];

function preload() {
  geodata = loadJSON("lucerne-trees.json");

  backgroundImg = loadImage("tree_background.png");
}

let quadtree = d3.quadtree();
let highlightObj = null;

function setup() {
  createCanvas(900, 650);

  // console.log(selection);

  treeData = geodata.features;

  quadtree
    .x(function (d) {
      return d.geometry.coordinates[0];
    })
    .y(function (d) {
      return d.geometry.coordinates[1];
    })
    .addAll(treeData);

  noLoop();
}

function draw() {
  background("#2B2F6C");

  image(backgroundImg, 0, 0, width, height);

  if (highlightObj) {
    let lon = highlightObj.geometry.coordinates[0];
    let lat = highlightObj.geometry.coordinates[1];
    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);
    noFill();
    stroke("#E8464E");
    strokeWeight(1.5);
    ellipse(x, y, 20, 20);
    ellipse(x, y, 1, 1);

    let h = highlightObj.properties.BAUMHOEHE;
    let j = +highlightObj.properties.PFLANZJAHR;
    let alter = 2021 - j;
    if (h == null) {
      h = "--";
    }
    if (j == 0) {
      alter = "--";
    }
    fill(0, 0, 0, 60);
    noStroke();
    rect(x + 17, y, 70, -35);
    stroke("#E8464E");
    strokeWeight(1.5);
    line(x + 17, y, x + 17, y - 35);
    fill("#E8464E");
    textSize(12);
    noStroke();
    text("Höhe: " + h + "m" + "\n" + "Alter: " + alter, x + 22, y - 20);
  }
  // drawTrees();
}

function mouseMoved() {
  // console.log("mouseMoved", mouseX, mouseY);
  let lon = map(mouseX, 0, width, bounds.left, bounds.right);
  let lat = map(mouseY, 0, height, bounds.top, bounds.bottom);

  highlightObj = quadtree.find(lon, lat);
  // console.log(highlightObj);
  redraw();
}

function keyTyped() {
  // saveCanvas("tree_background", "png");
  console.log("keyTyped", key);

  if (key == "1") {
    filter = "Montag";
  } else if (key == "2") {
    filter = "Dienstag";
  } else if (key == "3") {
    filter = "Mittwoch";
  }

  selection = accidents.filter(function (d) {
    return d.day == filter;
  });

  console.log(selection);
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;
    // console.log(properties);
    let coordinates = geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    noStroke();
    fill(222, 151, 143, 22);
    ellipse(x, y, 6);
    // ellipse(x, y, 5, 5);
    // ellipse(x, y, 3, 3);
  }
}
