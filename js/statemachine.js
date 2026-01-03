var stages = [
    "Pip is hungry!",
    "Pip enjoys the cereal.",
    "Pip is slowing down.",
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
    // ==================NEEDS REWORK===================== //
    new Audio("audio/Glados_voicelines/glados_voice_-05.mp3")
]

const stateClasses = [
    [],
    [],
    ["warning"],
    ["shake"],
    ["warning", "enlarge"],
    []
]

const stateTresholds = [
    0,
    5,
    10,
    15,
    20,
    25
];

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


    if (voices[index + 1]) {
        voices[index + 1].play();
    }

    if (index === stateTresholds.length - 1) {
        endGame();
        setTimeout(() => {
            voices[voices.length - 1].play();
        }, 4000);
    }
}