const text = "You were taking a walk in the park, where you found a starving chipmunk. You took it home, and having no other food, you decided to feed it coco pops.";
const textElement = document.getElementById("text_paragraph");
const playButton = document.getElementById("play_button");
const skipButton = document.getElementById("skip_btn")
const title = document.getElementById("title");

// Ambient music
const bg_music = new Audio("../audio/cutscene.wav")
bg_music.volume = 0.4;
bg_music.loop=true;


let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Adjust speed here (milliseconds per character)
    } else {
        // Show the button when typing is done
        playButton.classList.add("visible");
        title.classList.add("visible");
        // Hide skip btn
        skipButton.classList.add("invisible")
    }
}

// Start typing when page loads
typeWriter();
bg_music.play();

// Button click handler
playButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add("fade-out");

    setTimeout(function () {
        window.location.href = "../index.html";
    }, 500); // Wait for fade-out to complete (matches CSS transition time
});

skipButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add("fade-out");

    setTimeout(function () {
        window.location.href = "../index.html";
    }, 500); // Wait for fade-out to complete (matches CSS transition time
});