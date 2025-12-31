// How many coco pops the chipmunk can eat before he explodes.
const chipmunk_max_diet = 10;

// How many coco pops the chipmunk has eaten so far.
var score = 0;

var pops_on_screen = 0;
const max_pops_on_screen = 4;
var respawn_counter = 0;

// Timer func

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Draggable {
    constructor(text) {
        this.text = text;
        // Creates a draggable div
        var draggable = document.createElement('div');

        // Slot in the text the new draggable should have
        draggable.innerHTML = "<p>" + text + "</p>";
        draggable.className = "draggable";

        const maxX = window.innerWidth - 100; // assuming draggable width is 100px
        const maxY = window.innerHeight - 100; // assuming draggable height is 100px

        // Random position
        draggable.style.position = "absolute";
        draggable.style.left = Math.floor(Math.random() * maxX) + "px";
        draggable.style.top = Math.floor(Math.random() * maxY) + "px";

        // Make the draggable in html
        document.body.appendChild(draggable);

        dragElement(draggable);
        
    }
}

// Makes element draggable
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
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
    
    // Final collision check on drop
    if (checkCollision(elmnt)) {
      feedChipmunk(elmnt);
    }
  }
}

// Collision detection function
function checkCollision(pop) {
  const chipmunk = document.getElementById('chipmunk'); // your chipmunk element ID
  const popRect = pop.getBoundingClientRect();
  const chipRect = chipmunk.getBoundingClientRect();
  
  return !(popRect.right < chipRect.left || popRect.left > chipRect.right || popRect.bottom < chipRect.top || popRect.top > chipRect.bottom);
}
// Check if chipmunk has reached max diet and explode
function checkCchipmunkDiet() {

  if (score >= chipmunk_max_diet) {
    alert("The chipmunk has exploded!");
  } else {

    if (respawn_counter == 2) {
      spawnPops();
      respawn_counter = 0;
    }
    
  }
}

// Create coco pops

async function spawnPops() {
  while (pops_on_screen < max_pops_on_screen) {
    new Draggable("coco pops")
    pops_on_screen++
    await wait(1000);
  }
}

spawnPops();

// Feed chipmunk

function feedChipmunk(pop) {
  score++;
  pops_on_screen--;
  respawn_counter++;
  document.getElementById("score").innerText = "Score: " + score;
  document.body.removeChild(pop);
  checkCchipmunkDiet();
}
