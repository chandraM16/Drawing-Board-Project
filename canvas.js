let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColorBox = pencilToolsCont.querySelector(".pencil-color");
let pencilWidthBox = pencilToolsCont.querySelector(".pencil-width");
let eraserWidthBox = eraserToolsCont.querySelector(".eraser-width");
let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

//get tool
let tool = canvas.getContext("2d");
tool.lineJoin = "round";
tool.lineCap = "round";
let isMouseDown = false;

let pencilColor = "black";
let eraserColor = "white";
let pencilWidth = pencilWidthBox.value;
let eraserWidth = eraserWidthBox.value;
let undoRedoArr = [];
let tracker = -1;

//mode
let mode = document.querySelector(".mode");
let isDarkMode = localStorage.getItem("isDarkMode");
applyMode();

// change the color of pencil
pencilColorBox.addEventListener("change", (e) => {
  e.stopPropagation();
  pencilColor = e.target.value;
  pencil.style.color = pencilColor;
  tool.strokeStyle = pencilColor;
  tool.lineWidth = pencilWidth;
});

//change the width of pencil
pencilWidthBox.addEventListener("change", (e) => {
  e.stopPropagation();
  pencilWidth = e.target.value;
  tool.lineWidth = pencilWidth;
  tool.strokeStyle = pencilColor;
});

// open and close th eraser control
eraser.addEventListener("click", (e) => {
  console.log(isDarkMode);
  e.stopPropagation();
  if (isEraserOpen) {
    isEraserOpen = false;
    eraserToolsCont.style.display = "none";
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
  } else {
    isEraserOpen = true;
    eraserToolsCont.style.display = "flex";
    console.log("eraser is open");
    if (isDarkMode) {
      tool.strokeStyle = "black";
    } else {
      tool.strokeStyle = eraserColor;
    }
    // tool.strokeStyle = isDarkMode == true ? "black" : eraserColor;
    tool.lineWidth = eraserWidth;
  }
});

//change the width of eraser
eraserWidthBox.addEventListener("change", (e) => {
  console.log(isDarkMode);
  eraserWidth = e.target.value;
  tool.lineWidth = eraserWidth;
  // tool.strokeStyle = isDarkMode == true ? "black" : eraserColor;
  if (isDarkMode) {
    tool.strokeStyle = "black";
  } else {
    tool.strokeStyle = eraserColor;
  }
});

//download the canvas
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL(); // it will generate the url

  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

// undo action
undo.addEventListener("click", (e) => {
  if (tracker > 0) tracker--;
  let trackerObj = {
    trackerValue: tracker,
    undoRedoArr,
  };
  undoRedoFunction(trackerObj);
});

//redo action
redo.addEventListener("click", (e) => {
  if (tracker < undoRedoArr.length - 1) tracker++;
  let trackerObj = {
    trackerValue: tracker,
    undoRedoArr,
  };

  undoRedoFunction(trackerObj);
});

function undoRedoFunction(trackerObj) {
  tracker = trackerObj.trackerValue;
  undoRedoArr = trackerObj.undoRedoArr;

  let url = undoRedoArr[tracker];

  let img = new Image();
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

//mouseDown -> start new path
//mouseMove =  path fill

canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  beginPath(data);
});

canvas.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: isEraserOpen ? eraserColor : pencilColor,
      width: isEraserOpen ? eraserWidth : pencilWidth,
    };
    drawStroke(data);
  }
});

canvas.addEventListener("mouseup", (e) => {
  isMouseDown = false;
  let url = canvas.toDataURL();
  undoRedoArr.push(url);
  tracker = undoRedoArr.length - 1;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  //   tool.strokeStyle = strokeObj.color;
  //   tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

// apply mode
mode.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isDarkMode == false) {
    mode.innerHTML = "light_mode";
    localStorage.setItem("isDarkMode", true);
    tool.fillStyle = "black";
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    tool.lineWidth = pencilWidth;
    tool.strokeStyle = pencilColor;
    isDarkMode = true;
  } else {
    mode.innerHTML = "dark_mode";
    localStorage.setItem("isDarkMode", false);
    tool.fillStyle = "white";
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
    isDarkMode = false;
  }
  console.log(isDarkMode);
});

function applyMode() {
  console.log(isDarkMode);
  if (!isDarkMode) {
    console.log(1);
    mode.innerHTML = "dark_mode";
    localStorage.setItem("isDarkMode", false);
    tool.fillStyle = "white";
    isDarkMode = false;
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
  } else {
    console.log(2);
    mode.innerHTML = "light_mode";
    localStorage.setItem("isDarkMode", true);
    tool.fillStyle = "black";
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    tool.strokeStyle = "white";
  }
}

// tool.strokeStyle = "red"; // have to apply before beginPath
// tool.lineWidth = "9"
// tool.beginPath();//create new path
// tool.moveTo(10, 20); // fix starting point
// tool.lineTo(200, 400); // ending point
// tool.stroke(); // fill the color in line
// tool.lineTo(800, 900);
// tool.stroke()
