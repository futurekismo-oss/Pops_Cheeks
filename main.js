// Webpage elements
const coco_pops_image = "img/coco_pops.png";
const chipmunk = document.getElementById('chipmunk');
const text = document.getElementById('text');
const feed_sound = new Audio("audio/chipmunk.mp3");
const click_sound = new Audio("audio/chipmunk_laugh.mp3");

var score = 0;

window.addEventListener('load', () => {
  updateState(0);
});

var pops_on_screen = 0;
const max_pops_on_screen = 4;
var respawn_counter = 0;

// coco pops class
class CocoPops {
  constructor() {
    var coco_pops = document.createElement('div');

    coco_pops.innerHTML = "<img src='" + coco_pops_image + "' width='100px' height='auto'>";
    coco_pops.className = "coco_pops";

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    // Random position
    coco_pops.style.position = "absolute";
    coco_pops.style.left = Math.floor(Math.random() * maxX) + "px";
    coco_pops.style.top = Math.floor(Math.random() * maxY) + "px";

    // Make the draggable in html
    document.body.appendChild(coco_pops);

    dragElement(coco_pops);

  }
}

// Makes element draggable
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    elmnt.classList.add("shake"); // Add shake on drag start
    crackle();
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    // Check collision while dragging
    checkCollision(elmnt);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.classList.remove("shake"); // Remove shake on drag end

    // Final collision check on drop
    if (checkCollision(elmnt) && !endgameBool) {
      feedChipmunk(elmnt);
    }
  }
}

// Collision detection function
function checkCollision(pop) {
  const popRect = pop.getBoundingClientRect();
  const chipRect = chipmunk.getBoundingClientRect();

  return !(popRect.right < chipRect.left || popRect.left > chipRect.right || popRect.bottom < chipRect.top || popRect.top > chipRect.bottom);
}

// Create coco pops
async function spawnPops() {
  while (pops_on_screen < max_pops_on_screen) {
    new CocoPops();
    pops_on_screen++
    await wait(1000);
  }
}
spawnPops();

// Remove coco pops
function remove_pop(pop) {
  document.body.removeChild(pop);
  if (respawn_counter == 2) {
    spawnPops();
    respawn_counter = 0;
  }
}

function updateUI(pop) {
  const rect = pop.getBoundingClientRect();
  crunch(rect.left + rect.width / 2, rect.top + rect.height / 2);
  feed_sound.play();

  chipmunk.classList.add("shake");

  setTimeout(() => {
    chipmunk.classList.remove("shake");
  }, 400);
}

// Feed chipmunk
function feedChipmunk(pop) {
  pops_on_screen--;
  respawn_counter++;
  score++;

  updateUI(pop);
  remove_pop(pop);
  updateState(score);
}

function crackle() {
  const crackles = [
    new Audio("audio/crackle_sounds/crackle01.wav"),
    new Audio("audio/crackle_sounds/crackle02.wav"),
    new Audio("audio/crackle_sounds/crackle03.wav"),
    new Audio("audio/crackle_sounds/crackle04.wav")
  ];

  const randomIndex = Math.floor(Math.random() * crackles.length);
  crackles[randomIndex].play();
}

// Chipmunk click animation
chipmunk.addEventListener("click", () => {
  if (critStg != true) {
    chipmunk.classList.add("shake");
    click_sound.play();
    setTimeout(() => {
      chipmunk.classList.remove("shake");
    }, 1200);
  }
});
