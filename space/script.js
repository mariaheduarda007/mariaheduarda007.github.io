let counter = 0;
let val = 0;
let hr = 0;
let min = 0;
let sec = 0;
hrStr = "00";
minStr = "00";
secStr = "00";
function add() {
  val++;

  hr = Math.floor(val / 3600);
  min = Math.floor(val / 60);
  sec = val % 60;

  hrStr = hr < 10 ? "0" + hr : "" + hr;
  minStr = min < 10 ? "0" + min : "" + min;
  secStr = sec < 10 ? "0" + sec : "" + sec;

  document.querySelector("#counter").textContent =
    hrStr + minStr + ":" + secStr;
}

function startCounter() {
  stopCounter();
  counter = setInterval(add, 1000);
}

function stopCounter() {
  clearInterval(counter);
}

document.addEventListener("keyup", function (e) {
  let modal = document.querySelector("#modal");
  if ((e.key === "p" || e.key === "P") && modal.style.display === "none") {
    modal.style.display = "flex";
    stopCounter();
  } else {
    startCounter();
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
    if (left < rightLimit) {
      nave.style.left = left + 20 + "px";
    }
  }
  if (e.key === "ArrowLeft") {
    if (right > leftLimit) {
      nave.style.left = right + "px";
    }
  }
});
