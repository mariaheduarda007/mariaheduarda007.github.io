let counter;
let counterText;
let val = 0;
let hr = 0;
let min = 0;
let sec = 0;
hrStr = "00";
minStr = "00";
secStr = "00";
let display = "";
function add() {
  val++;
  sec = val;

  if (val > 3600) {
    hr = Math.floor(min / 60);
  }

  if (val > 60) {
    min = Math.floor(val / 60);
    sec = val - min * 60;

    if (min >= 10) {
      minStr = min;
    } else {
      minStr = "0" + min;
    }
  }

  if (sec >= 10) {
    secStr = sec;
  } else {
    secStr = "0" + sec;
  }

  display = "00:" + minStr + ":" + secStr;

  document.querySelector("#counter").textContent = display;
}

function startCounter() {
  counter = setInterval(add, 1000);
}

function stopCounter() {
  clearInterval(counter);
}

document.addEventListener("keyup", function (e) {
  let modal = document.querySelector("#modal");
  if ((e.key === "p" || e.key === "P") && modal.style.display === "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", function (e) {
    let leftLimit = 200;
    let rightLimit = 1400;

  let nave = document.querySelector("#nave");
  let left = parseInt(getComputedStyle(nave).left);
  let right = left - 20;
  if (e.key === "ArrowRight") {
    if (left < rightLimit){

        nave.style.left = left + 20 + "px";
    }
  }
  if (e.key === "ArrowLeft") {
    if (right > leftLimit) {
      nave.style.left = right + "px";
    }
  }
});
