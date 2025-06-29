let counter = 0;
let val = 0;
var missilLeftLaunch = false
var missilRightLaunch = false



function add() {
  val++;
  let hr = 0;
  let min = 0;
  let sec = 0;
  hrStr = "00";
  minStr = "00";
  secStr = "00";

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
  if ((e.code === "KeyP") && modal.style.display === "none") {
    modal.style.display = "flex";
    stopCounter();
  } else {
    startCounter();
    modal.style.display = "none";
  }
});


document.addEventListener("keydown", function (e) {
  
  const _LEFTLIMIT = 250;
  const _RIGHTLIMIT = 1400;
  const _OFFSETRIGHT = 60
  const _OFFSETLEFT = 10 
  const _BOTTOM = 620
  const _TOP = 0


  let nave = document.querySelector("#nave");
  let missilLeft = document.querySelector("#missilLeft");
  let missilRight = document.querySelector("#missilRight");
  

  let left = parseInt(getComputedStyle(nave).left);
  let right = left - 20;


  if (e.code === "ArrowRight") {
    if (left <  _RIGHTLIMIT) {
      if (missilLeftLaunch === false) {
        missilLeft.style.left = left + 20 + _OFFSETLEFT + "px";      
      }
      if (missilRightLaunch === false) {
      missilRight.style.left = left + 20 + _OFFSETRIGHT + "px"
      }
      
      nave.style.left = left + 20 + "px";
    }
  }
  if (e.code === "ArrowLeft") {
    if (right > _LEFTLIMIT) {
      if (missilLeftLaunch === false) {
      missilLeft.style.left = right + _OFFSETLEFT + "px"
      }
      if (missilRightLaunch === false) {
      missilRight.style.left = right + _OFFSETRIGHT + "px"
      }
      
      nave.style.left = right + "px";
    }
  }

  const topMissilLeft =  parseInt(window.getComputedStyle(missilLeft).top)
  const topMissilRight =  parseInt(window.getComputedStyle(missilRight).top)
  const leftNave =  parseInt(window.getComputedStyle(nave).left)

  
  if (e.code === "Space" && missilLeftLaunch === false) {
    setTimeout(() => {
      missilLeft.style.top =  _TOP + 'px'; 
      missilLeftLaunch = true
    }, 10);
  }
  else if (e.code === "Space" && missilRightLaunch === false) {
    setTimeout(() => {
      missilRight.style.top = _TOP + 'px'; 
      missilRightLaunch = true
    }, 10);
  }
  else if (e.code === "Space" ){
    missilLeft.style.top = _BOTTOM + "px" 
    missilLeft.style.left = leftNave + _OFFSETLEFT + "px"
    missilRight.style.left = leftNave + _OFFSETRIGHT  + "px"
    missilRight.style.top = _BOTTOM + "px"
    
    missilRightLaunch = false
    missilLeftLaunch = false


  }

});

document.addEventListener("keydown", function (e) {

  if (e.code === 'Digit1'){

    const body = document.querySelector("body")
    body.style.backgroundImage = "url('images/background.png')"
  }
  else if (e.code === 'Digit2'){
    const body = document.querySelector("body")
    body.style.backgroundImage = "url('images/background2.jpg')"
  }
  else if (e.code === 'Digit3'){
    const body = document.querySelector("body")
    body.style.backgroundImage = "url('images/background3.jpg')"
  }
  else if (e.code === 'Digit4'){
    const body = document.querySelector("body")
    body.style.backgroundImage = "url('images/background4.jpg')"
  }

});


//e.code = "nome"
// e.key = "value"







// document.addEventListener("keydown", function (e) {
//   const missilLeft = document.querySelector('#missilLeft')
//   // const missilRight = document.querySelector('#missilRight')
  
//   if (e.code === "Space" ) {
//     setTimeout(() => {
//       const posLeft =  parseInt(window.getComputedStyle(missilLeft).top)
//       missil.style.top = posLeft - 630 + 'px'; 
//     }, 10);
//   }

// });




// document.addEventListener("keydown", function (e) {
//   const nave = document.querySelector('#nave')
//   const posLeft =  parseInt(window.getComputedStyle(nave).left)
//   const posRight =  parseInt(window.getComputedStyle(nave).right)
//   const posTop =  parseInt(window.getComputedStyle(nave).top)


//   let missil = document.createElement('img')
//   missil.src = 'images/missil.png'
//   missil.style.height = '100px'
//   missil.style.width = '70px'
//   missil.style.position = 'absolute'
//   missil.style.left = posLeft + 'px'
//   missil.style.right = posRight + 'px'
//   missil.style.top = posTop + 'px'
//   missil.style.transition = 'top 0.5s ease-in-out'
  
//   if (e.code === "Space") {
//     document.body.appendChild(missil)
//   }
//   setTimeout(() => {
//     missil.style.top = posTop - 600 + 'px'; 
//   }, 10);

// });


