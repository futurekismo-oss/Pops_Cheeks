var stages = [
    "Pip is hungry!",
    "Pip enjoys the cereal.",
    "Pip is getting full",
    "Fun Fact: Cocopops weren't designed for chipmunks!",
    "Pip is tired!!",
    "You have pushed Pip too far!",
]

const voices = [
    null,
    new Audio("audio/Glados_voicelines/glados_voice_-01.mp3"),
    new Audio("audio/Glados_voicelines/glados_voice_-02.mp3"),
    new Audio("audio/Glados_voicelines/glados_voice_-03.mp3"),
    new Audio("audio/Glados_voicelines/glados_voice_-04.mp3"),
    new Audio("audio/Glados_voicelines/glados_voice_endgame.wav")
]

const stateClasses = [
    [],
    [],
    ["warning"],
    ["warning", "shake"],
    ["warning", "enlarge"],
    []
]

const stateTresholds = [
    0,
    5,
    10,
    20,
    30,
    35
];


var bgMusic = new Audio("audio/game_bg_audio.wav");
bgMusic.loop = true;
bgMusic.volume = 0.4; // Adjust to taste

// Start on page load or first user interaction
window.addEventListener('load', () => {
    bgMusic.play().catch(e => {
        // Browser might block autoplay, so play on first click
        document.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
});


let currentStateIndex = 0;

function getCurrentState(score) {
    for (let i = stateTresholds.length - 1; i >= 0; i--) {
        if (score >= stateTresholds[i]) {
            return i;
        }
    }
    return 0;
}

function updateState(score) {
    const newStateIndex = getCurrentState(score);

    if (newStateIndex !== currentStateIndex) {
        currentStateIndex = newStateIndex;
        applyStateClasses(newStateIndex)
    }
}

function applyStateClasses(index) {
    const text = document.getElementById('text');
    text.className = ''; // Reset classes
    stateClasses[index].forEach(cls => {
        text.classList.add(cls);
    });

    text.innerText = stages[index];

    text.classList.remove("fade");
    void text.offsetWidth; // Trigger reflow
    text.classList.add("fade");


    if (voices[index]) {
        bgMusic.volume = 0.2; // Dim for voiceline
        voices[index].play();

        voices[index].addEventListener('ended', () => {
            bgMusic.volume = 0.4; // Restore after voiceline
        });
    }

    if (index == 3) {
        crtStg = true;
        bgMusic.pause();
        bgMusic = new Audio("audio/critical_stage.wav");
        bgMusic.play();
        critical(score);
        startInactivityWatch();
    }

    if (index === stateTresholds.length - 1) {
        endGame(1);
        setTimeout(() => {
            voices[voices.length - 1].play();
        }, 4000);
    }
}

async function critical(score) {
    const choice = new Audio("audio/Glados_voicelines/choice.wav");
    choice.volume = 0.7;
    await wait(6000);
    choice.play();

}