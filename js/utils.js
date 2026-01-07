if (!sessionStorage.getItem('cutsceneSeen')) {
    sessionStorage.setItem('cutsceneSeen', 'true');
    window.location.href = "cutscene/cutscene.html";
}

// Reusable Timer Function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function enterFullscreen() {
    const elem = document.documentElement; // or a specific element
    if (elem.requestFullscreen) {            
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }
}

// Fade in when page loads
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(function () {
        document.body.style.opacity = '1';
    }, 10);
});
document.addEventListener('click', () => {
    enterFullscreen();
}, { once: true }); // Only triggers once

