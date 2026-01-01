function update_text(element, score) {
    var text = "The chipmunk is hungry!";
    element.classList.remove("fade"); // Remove fade class first
    if (score < 5) {
        text = "The chipmunk is hungry!";
    } else if (score >= 5 && score < 10) {
        element.classList.add("fade");
        text = "The chipmunk is getting full!";
    } else if (score >= 10 && score < 100) {
        text = "The chipmunk is very full!";
    } else {
        text = "The chipmunk has exploded!";
    }
    // Updates the text in game
    element.innerText = text
}
