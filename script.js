let isMenuOpen = false;
let optionIcon = document.querySelector(".option-icon-cont");
let toolsCont = document.querySelector(".tools-cont");

//pencil
let pencilToolsCont = document.querySelector(".pencil-tool-cont");
let pencil = document.querySelector(".pencil");
let isPencilOpen = false;

//eraser
let eraser = document.querySelector(".eraser");
let isEraserOpen = false;
let eraserToolsCont = document.querySelector(".eraser-tool-cont");

//note
let note = document.querySelector(".note");

//upload
let upload = document.querySelector(".upload");

//mode
let mode = document.querySelector(".mode");
let isDarkMode = localStorage.getItem("isDarkMode");
console.log(isDarkMode);
let drawBoard = document.querySelector(".draw-board");
applyMode();

//clear all open control
document.querySelector("canvas").addEventListener("dblclick", (e) => {
  isPencilOpen = false;
  pencilToolsCont.style.display = "none";
  isEraserOpen = false;
  eraserToolsCont.style.display = "none";
});

// open and close the menu
optionIcon.addEventListener("click", (e) => {
  console.log(1);
  e.stopPropagation();
  if (isMenuOpen) {
    isMenuOpen = false;
    closeMenu();
  } else {
    isMenuOpen = true;
    openMenu();
  }
});

function openMenu() {
  optionIcon.children[0].innerHTML = "close";
  toolsCont.style.display = "flex";
}
function closeMenu() {
  optionIcon.children[0].innerHTML = "menu";
  toolsCont.style.display = "none";
  pencilToolsCont.style.display = "none";
  eraserToolsCont.style.display = "none";
  isPencilOpen = false;
  isEraserOpen = false;
}

// open and close pencil control
pencil.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isPencilOpen) {
    // close it
    isPencilOpen = false;
    pencilToolsCont.style.display = "none";
  } else {
    isPencilOpen = true;
    pencilToolsCont.style.display = "flex";
    console.log(isPencilOpen);
  }
});


// create the note and apply drag and drop
note.addEventListener("click", (e) => {
  e.stopPropagation();
  let div = document.createElement("div");
  div.className = "note-cont";

  div.innerHTML = `
        <div class="note-heading">
            <div class="note-remove"></div>
            <div class="note-minimize"></div>
        </div>
        <div class="note-text">
            <textarea spellcheck="false" cols="30" rows="10" placeholder="Write Something"></textarea>
        </div>
  `;
  document.body.appendChild(div);

  let noteRemove = div.querySelector(".note-remove");
  let noteMinimize = div.querySelector(".note-minimize");
  noteControl(div, noteMinimize, noteRemove);

  div.onmousedown = function (event) {
    dragDrop(div, event);
  };
  div.ondragstart = function () {
    return false;
  };
});

//note Minimize and close
function noteControl(div, noteMinimize, noteRemove) {
  console.log(noteRemove);
  console.log(noteMinimize);
  noteRemove.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e);
    div.remove();
  });

  let isNoteTextOpen = true;
  noteMinimize.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("JI");
    let noteTextP = div.querySelector(".note-textP");
    let noteText = div.querySelector(".note-text");
    console.log(noteText);
    if (noteText) {
      if (isNoteTextOpen) {
        isNoteTextOpen = !isNoteTextOpen;
        noteText.style.display = "none";
      } else {
        isNoteTextOpen = !isNoteTextOpen;
        noteText.style.display = "block";
      }
    }
    if (noteTextP) {
      if (isNoteTextOpen) {
        isNoteTextOpen = !isNoteTextOpen;
        noteTextP.style.display = "none";
      } else {
        isNoteTextOpen = !isNoteTextOpen;
        noteTextP.style.display = "block";
      }
    }
  });
}

// note darg and drop
function dragDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;
  // document.body.append(element);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

// apply ode
mode.addEventListener("click", (e) => {
  e.stopPropagation();
  isDarkMode = localStorage.getItem("isDarkMode");
  console.log(isDarkMode);
  if (isDarkMode == "true") {
    // make light mode
    mode.innerHTML = "dark_mode";
    // drawBoard.style.backgroundColor = "white";
    localStorage.setItem("isDarkMode", false);
  } else {
    mode.innerHTML = "light_mode";
    localStorage.setItem("isDarkMode", true);
    // drawBoard.style.backgroundColor = "black";
  }
});

// upload the photo
upload.addEventListener("click", (e) => {
  e.stopPropagation();

  let input = document.createElement("input");
  input.type = "file";
  input.click();

  input.addEventListener("change", (e) => {
    e.stopPropagation();
    let file = input.files[0];

    // generate the url of photo
    let url = URL.createObjectURL(file);

    let photo = document.createElement("div");
    photo.className = "note-contP";
    photo.innerHTML = `
        <div class="note-headingP">
          <div class="note-removeP"></div>
          <div class="note-minimizeP"></div>
        </div>
        <div class="note-textP">
          <img src= ${url} alt="" class="file">
        </div>
  `;
    document.body.appendChild(photo);

    let noteRemove = photo.querySelector(".note-removeP");
    let noteMinimize = photo.querySelector(".note-minimizeP");
    noteControl(photo, noteMinimize, noteRemove);

    photo.onmousedown = function (event) {
      dragDrop(photo, event);
    };
    photo.ondragstart = function () {
      return false;
    };
  });
});

function applyMode() {
  isDarkMode = localStorage.getItem("isDarkMode");
  console.log(isDarkMode);
  if (isDarkMode != "true") {
    // make light mode
    mode.innerHTML = "dark_mode";
    // drawBoard.style.backgroundColor = "white";
    localStorage.setItem("isDarkMode", false);
  } else {
    mode.innerHTML = "light_mode";
    localStorage.setItem("isDarkMode", true);
    // drawBoard.style.backgroundColor = "black";
  }
}
