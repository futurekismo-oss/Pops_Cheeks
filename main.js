class Draggable {
    constructor(text) {
        this.text = text;
        // Creates a draggable div
        var draggable = document.createElement('div');

        // Slot in the text the new draggable should have
        draggable.innerHTML = "<p>" + text + "</p>";
        draggable.className = "draggable";

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
      alert("chomp, chomp");
      elmnt.remove(); // remove the coco pop
    }
  }
}

// Collision detection function
function checkCollision(pop) {
  const chipmunk = document.getElementById('chipmunk'); // your chipmunk element ID
  const popRect = pop.getBoundingClientRect();
  const chipRect = chipmunk.getBoundingClientRect();
  
  return !(popRect.right < chipRect.left || 
           popRect.left > chipRect.right || 
           popRect.bottom < chipRect.top || 
           popRect.top > chipRect.bottom);
}



var coco = new Draggable("1cocopops1");
var pops = new Draggable("2cocopops2");
