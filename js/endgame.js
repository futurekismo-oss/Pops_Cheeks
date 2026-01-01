async function endGame() {
    const chipmunk = document.getElementById('chipmunk');
    const body = document.body;
    
    // 1. Chipmunk shakes violently
    chipmunk.classList.add('death-shake');
    await wait(2000); // 2 seconds of shaking
    
    // 2. Start fading chipmunk + darkening screen simultaneously
    chipmunk.style.transition = "opacity 3s ease";
    chipmunk.style.opacity = "0";
    
    body.style.transition = "background 3s ease";
    body.style.background = "#000"; // fade to black
    
    await wait(3000); // wait for fades to complete
    
    // 3. INSTANT CUT - remove chipmunk, full black
    chipmunk.remove();
    
    
    // 4. GLaDOS speaks over black screen
}