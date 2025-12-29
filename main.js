var chipmunk = document.getElementById('chipmunk');
var btn1 = document.getElementById('btn1');
var btn50 = document.getElementById('btn50');
var clear = document.getElementById('clear');

clear.onclick = () => {
    chipmunk.textContent = "chipmunk here"
    i = 0
}

var i = 0

btn1.onclick = () => {
    chipmunk.textContent = "chipmunk clicked: " + i
    i++
}

btn50.onclick = () => {
    chipmunk.textContent = "chipmunk clicked: " + i
    i += 50
}