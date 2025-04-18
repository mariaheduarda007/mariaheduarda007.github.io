let colorsArray = [
  "#pink-box",
  "#blue-box",
  "#salmon-box",
  "#white-box",
  "#green-box",
  "#orange-box",
];
let formatsArray = ["#format-round", "#format-square"];

function selectColor(color) {
  for (let i = 0; i < colorsArray.length; i++) {
    const colorBox = document.querySelector(colorsArray[i]);
    colorBox.classList.remove("box-selection");
  }

  const colorBox = document.querySelector(color);
  colorBox.classList.add("box-selection");

  const flexDivs = document.querySelectorAll(".flex-box");
  const colorStyle =
    getComputedStyle(colorBox).getPropertyValue("background-color");
  flexDivs.forEach((div) => {
    div.style.setProperty("background-color", colorStyle);
  });
}

function selectFormat(format) {
  for (let i = 0; i < formatsArray.length; i++) {
    const formatBox = document.querySelector(formatsArray[i]);
    formatBox.classList.remove("box-selection");
  }

  const formatBox = document.querySelector(format);
  formatBox.classList.add("box-selection");

  const flexDivs = document.querySelectorAll(".flex-box");
  const formatStyle =
    getComputedStyle(formatBox).getPropertyValue("border-radius");

  if (formatStyle.match("50%")) {
    flexDivs.forEach((div) => {
      div.style.setProperty("border-radius", formatStyle);
    });
  } else {
    flexDivs.forEach((div) => {
      div.style.setProperty("border-radius", "0px");
    });
  }
}

function inputSize() {
  const inputBox = document.querySelector("#size-options");
  const flexDivs = document.querySelectorAll(".flex-box");

  const value = Number(inputBox.value);

  if (Number(inputBox.value) <= 180 && Number(inputBox.value) >= 100) {
    flexDivs.forEach((div) => {
      div.style.setProperty("width", value + "px");
      div.style.setProperty("height", value + "px");
    });
  }
}

function selectFlexDirection() {
  const box = document.querySelector("#flex-direction");
  const flexDivs = document.querySelector("#simulator");

  const value = box.value;
  const valueMin = value.toLowerCase()
  
  flexDivs.style.setProperty('flex-direction', valueMin);

}

function selectJustifyContent() {
    const box = document.querySelector("#justify-content");
    const flexDivs = document.querySelector("#simulator");
  
    const value = box.value;
    const valueMin = value.toLowerCase()
    
    flexDivs.style.setProperty('justify-content', valueMin);
  
  }

  function selectAlignItems() {
    const box = document.querySelector("#align-items");
    const flexDivs = document.querySelector("#simulator");
  
    const value = box.value;
    const valueMin = value.toLowerCase()
    
    flexDivs.style.setProperty('align-items', valueMin);
  
  }
