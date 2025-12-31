function update_text(element, score) {
    var text = "The chipmunk is hungry!";
    if (score < 5) {
        text = "The chipmunk is hungry!";
    } else if (score >= 5 && score < 10) {
        element.classList.add("fade");
        text = "The chipmunk is getting full!";
    }
    // Updates the text in game
    element.innerText = text
}
