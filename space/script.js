let counter
let val = 0
function add() {
    val++
    if (val > 60) {
        let min = val/60
        let sec = val - (min * 60)
        document.querySelector("#counter").textContent = "00:" + min + ":" + sec
    
    }
    else {

        document.querySelector("#counter").textContent = "00:00:" + val
    }
}
function startCounter() {
    counter = setInterval(add, 1000)
}


function stopCounter() {
    clearInterval(counter);
}
