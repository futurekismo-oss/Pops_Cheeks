// Voices
const voice_1 = new Audio("audio/Glados_voicelines/glados_voice_-01.mp3")
const voice_2 = new Audio("audio/Glados_voicelines/glados_voice_-02.mp3")
const voice_3 = new Audio("audio/Glados_voicelines/glados_voice_-03.mp3")
const voice_4 = new Audio("audio/Glados_voicelines/glados_voice_-04.mp3")
// ==================NEEDS REWORK===================== //
const voice_5 = new Audio("audio/Glados_voicelines/glados_voice_-05.mp3")

var stages = [
    "Pip enjoys the cereal.",
    "Pip is slowing down.",
    "Fun Fact: Cocopops weren't desgined for chipmunks!",
    "Pip is tired!!",
    "You have pushed Pip too far!",
    "The chipmunk is hungry!"
]

async function updateText(element, score) {
    var text = "";
    element.classList.remove("fade"); // Remove fade class first
    switch(score) {
        case 0:
            text = stages[-1];
            break;
        case 5:
            text = stages[0];
            voice_1.play();
            break;
        case 10:
            text = stages[1];
            element.classList.add("warning");
            voice_2.play();
            break;
        case 15:
            text = stages[2];
            element.classList.add("shake");
            voice_3.play();
            break;
        case 20:
            text = stages[3];
            element.classList.add("warning", "enlarge");
            voice_4.play();
            break;
    }

    if (score >= 25) {
        endGame();
        text = stages[4];
        setTimeout(() => {
            voice_5.play();
        }, 4000);
    }
    // Updates the text in game
    element.innerText = text
}
