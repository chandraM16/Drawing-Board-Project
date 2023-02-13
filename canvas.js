let canvas = document.querySelector("canvas");
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(window.innerHeight);

let pencilColorBox = pencilToolsCont.querySelector(".pencil-color");
let pencilWidthBox = pencilToolsCont.querySelector(".pencil-width");
let eraserWidthBox = eraserToolsCont.querySelector(".eraser-width");
let download = document.querySelector(".download");

//get tool
let tool = canvas.getContext("2d");
let isMouseDown = false;

let pencilColor = "black";
let eraserColor = "white";
let pencilWidth = pencilWidthBox.value;
let eraserWidth = eraserWidthBox.value;

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
  e.stopPropagation();
  if (isEraserOpen) {
    isEraserOpen = false;
    eraserToolsCont.style.display = "none";
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
  } else {
    isEraserOpen = true;
    eraserToolsCont.style.display = "flex";
    console.log(isEraserOpen);
    tool.strokeStyle = eraserColor;
}
});

//change the width of eraser
eraserWidthBox.addEventListener("change", (e) => {
    eraserWidth = e.target.value;
    tool.strokeStyle = eraserColor;
  tool.lineWidth = eraserWidth;
});


//download the canvas
download.addEventListener("click", (e)=>{
    let url = canvas.toDataURL(); // it will generate the url 

    let a = document.createElement("a")
    a.href = url;
    a.download = board.jpg;
    a.click();

});

//mouseDown -> start new path
//mouseMove =  path fill

canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  beginPath({ x: e.clientX, y: e.clientY });
});
canvas.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    drawStroke({
      x: e.clientX,
      y: e.clientY,
      color: isEraserOpen ? eraserColor : pencilColor,
      width: isEraserOpen ? eraserWidth : pencilWidth,
    });
  }
});
canvas.addEventListener("mouseup", (e) => {
  isMouseDown = false;
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



// tool.strokeStyle = "red"; // have to apply before beginPath
// tool.lineWidth = "9"
// tool.beginPath();//create new path
// tool.moveTo(10, 20); // fix starting point
// tool.lineTo(200, 400); // ending point
// tool.stroke(); // fill the color in line
// tool.lineTo(800, 900);
// tool.stroke()
