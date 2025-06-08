<script>
  export let display = "";
  let opArray = [];
  let cleanForm = false;
  let init = true;

  const isNumber = (value) => !isNaN(Number(value));
  const sumOp = (a, b) => Number(a) + Number(b);
  const subtractOp = (a, b) => Number(a) - Number(b);
  const divideOp = (a, b) => Number(a) / Number(b);
  const multiplyOp = (a, b) => Number(a) * Number(b);

  function digit(d) {
    if (init) {
      display = "";
    }
    init = false;
    if (isNumber(d)) {
      if (cleanForm) {
        display = d;
        cleanForm = false;
      } else {
        display += d.toString();
      }
    } else if (d === "C") {
      opArray.length = 0;
      display = "0";

      init = true;
    } else if (d === "=") {
      opArray.push(display);
      calculate();
      display = opArray[0]
      opArray.length = 0;
    } else if (!isNumber(d)) {
      if (!cleanForm) {
        opArray.push(display);
      }
      if (!isNumber(opArray[opArray.length - 1])) {
        opArray.pop();
      }
      cleanForm = true;

      display = d;
      opArray.push(display);
    }
  }

  function calculate() {
    while (opArray.length > 1) {
      for (let i = 0; i < opArray.length; i++) {
        if (opArray[i] == "*") {
          opArray[i - 1] = multiplyOp(opArray[i - 1], opArray[i + 1]);
          opArray.splice(i, 2);
          i--;
        } else if (opArray[i] == "/") {
          opArray[i - 1] = divideOp(opArray[i - 1], opArray[i + 1]);
          opArray.splice(i, 2);
          i--;
        }
      }
      for (let i = 0; i < opArray.length; i++) {
        if (opArray[i] == "+") {
          opArray[i - 1] = sumOp(opArray[i - 1], opArray[i + 1]);
          opArray.splice(i, 2);
          i--;
        } else if (opArray[i] == "-") {
          opArray[i - 1] = subtractOp(opArray[i - 1], opArray[i + 1]);
          opArray.splice(i, 2);
          i--;
        }
      }
    }

  }
</script>

<div>
  <button on:click={() => digit(1)}><p>1</p></button>
  <button on:click={() => digit(2)}><p>2</p></button>
  <button on:click={() => digit(3)}><p>3</p></button>
  <button on:click={() => digit("+")}><p>+</p></button>
  <button on:click={() => digit(4)}><p>4</p></button>
  <button on:click={() => digit(5)}><p>5</p></button>
  <button on:click={() => digit(6)}><p>6</p></button>
  <button on:click={() => digit("-")}><p>-</p></button>
  <button on:click={() => digit(7)}><p>7</p></button>
  <button on:click={() => digit(8)}><p>8</p></button>
  <button on:click={() => digit(9)}><p>9</p></button>
  <button on:click={() => digit("*")}><p>*</p></button>
  <button on:click={() => digit("=")}><p>=</p></button>
  <button on:click={() => digit(0)}><p>0</p></button>
  <button on:click={() => digit("C")}><p>C</p></button>
  <button on:click={() => digit("/")}><p>/</p></button>
</div>

<style>
  div {
    width: 255px;
    height: 250px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }

  button {
    all: unset;
    width: 54px;
    height: 54px;
    background-color: black;
    color: white;
    font-size: 22px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    text-align: center;
    line-height: 5%;
    margin: 0;
    border-radius: 10px;
  }

  button:hover {
    background-color: rgb(39, 39, 39);
  }
</style>
