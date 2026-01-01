// Webpage elements
const coco_pops_image = "img/coco_pops.png";
const chipmunk = document.getElementById('chipmunk');
const text = document.getElementById('text');

// Audio element
const feed_sound = new Audio("audio/chipmunk.mp3");

// How many coco pops the chipmunk can eat before he explodes.
const chipmunk_max_diet = 100;

// How many coco pops the chipmunk has eaten so far.
var score = 0;

update_text(text, score);

var pops_on_screen = 0;
const max_pops_on_screen = 4;
var respawn_counter = 0;

// coco pops class
class CocoPops {
    constructor() {
        // Creates a draggable div
        var coco_pops = document.createElement('div');

        // Slot in the text the new draggable should have
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
    if (checkCollision(elmnt)) {
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
// Check if chipmunk has reached max diet and explode
function checkChipmunkDiet() {

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
    new CocoPops();
    pops_on_screen++
    await wait(1000);
  }
}

spawnPops();

// Feed chipmunk

function feedChipmunk(pop) {
  const rect = pop.getBoundingClientRect();
  crunch(rect.left + rect.width / 2, rect.top + rect.height / 2);
  feed_sound.play();

  pops_on_screen--;
  respawn_counter++;

  score++;
  update_text(text, score);

  document.body.removeChild(pop);
  checkChipmunkDiet();

  chipmunk.classList.add("shake");
  
  setTimeout(() => {
    chipmunk.classList.remove("shake");
  }, 400);
}


// Chipmunk click animation
chipmunk.addEventListener("click", () => {
  chipmunk.classList.add("shake");
  setTimeout(() => {
    chipmunk.classList.remove("shake");
  }, 400);
});

