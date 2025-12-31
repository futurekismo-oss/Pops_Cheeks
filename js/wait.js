// Reusable Timer Function

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    console.log("waited")
}