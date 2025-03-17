// Tijd functie
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let ampm = h >= 12 ? "PM" : "AM";

  // Zet 12-uurs notatie
  h = h % 12;
  h = h ? h : 12; // 0 uur wordt 12 uur

  h = checkTime(h);
  m = checkTime(m);
  document.getElementById("time").innerHTML = h + ":" + m + " " + ampm;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Elementen selecteren
const projectsIcon = document.querySelector(".projects");
const aboutIcon = document.querySelector(".about");

const projectsWindow = document.querySelector(".projects-open");
const aboutWindow = document.querySelector(".about-open");

const computerIcon = document.querySelector(".computer");
const computerWindow = document.querySelector(".computer-open");

const resumeIcon = document.querySelector(".resume");

// Open vensters op dubbelklik
projectsIcon.addEventListener("dblclick", () => {
  projectsWindow.style.display = "flex";
});
aboutIcon.addEventListener("dblclick", () => {
  aboutWindow.style.display = "flex";
});
computerIcon.addEventListener("dblclick", () => {
  computerWindow.style.display = "flex";
});
resumeIcon.addEventListener("dblclick", () => {
  window.open("/assets/cv.pdf", "_blank");
});

// Voeg exit-functionaliteit toe
const exitButtons = document.querySelectorAll(".exit");
exitButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Zoek het dichtstbijzijnde venster
    const windowElement = btn.closest(".projects-open") || btn.closest(".about-open") || btn.closest(".computer-open");
    if (windowElement) {
      windowElement.style.display = "none";
    }
  });
});

// Open de externe pagina's bij dubbelklik in het Projects venster
const gameJavascript = document.querySelector(".javascript-game");
const gamecraft = document.querySelector(".gamecraft");
const yard = document.querySelector(".yard");
const goedeDoel = document.querySelector(".goede-doel");

gameJavascript.addEventListener("dblclick", () => {
  window.open("/game-in-javascript/index.html", "_blank");
});
gamecraft.addEventListener("dblclick", () => {
  window.open("/gamecraft/homepage/index.html", "_blank");
});
yard.addEventListener("dblclick", () => {
  window.open("/yard/index.html", "_blank");
});
goedeDoel.addEventListener("dblclick", () => {
  window.open("/l1-pro-2-het-goede-doel-cRakhorst/goede-doel.html", "_blank");
});

// Drag & Drop functionaliteit
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Zorg dat alleen de .top-div de drag start
  const header = elmnt.querySelector(".top");
  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    repositionElement();
  }
  
  function repositionElement() {
    const rect = elmnt.getBoundingClientRect();
    let newTop = elmnt.offsetTop;
    let newLeft = elmnt.offsetLeft;
    
    // Zorg dat het element niet buiten de viewport komt
    if (rect.left < 0) {
      newLeft = 0;
    }
    if (rect.top < 0) {
      newTop = 0;
    }
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (rect.right > viewportWidth) {
      newLeft = viewportWidth - rect.width;
    }
    if (rect.bottom > viewportHeight) {
      // Rekening houden met de footer hoogte (64px)
      newTop = viewportHeight - rect.height - 64;
    }
    
    elmnt.style.left = newLeft + "px";
    elmnt.style.top = newTop + "px";
  }
}

// Pas drag-functionaliteit toe op beide vensters
if (projectsWindow) {
  dragElement(projectsWindow);
}
if (aboutWindow) {
  dragElement(aboutWindow);
}
if (computerWindow) {
  dragElement(computerWindow);
}