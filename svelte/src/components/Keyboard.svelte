<script>
  export let display = "";
  let expression = ""; // SER nUMERO IR FAZENDO CONTA DINAMICANTE
  let cleanForm = false;
  let init = true

  function digit(d) {
  if(init){
    display = "";
  }
  init = false
    if (typeof d === "number") {
      if (cleanForm) {
        display = d;
        cleanForm = false;
      } else {
        display += d.toString();
      }
      expression += d;
    } else if (d === "C") {
      display = "0";
      expression = "";
      init = true
    } else if (d === "=") {
      alert(calcExpression(expression));
      expression = "";
      display = "0";
      init = true 

    } else if (typeof d !== "number") {
      cleanForm = true;
      expression += d;
      display = d;
    }
  }

  function calcExpression(expression) {
    return expression;
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

  .number {
    width: 54px;
    height: 54px;
    background-color: black;
    color: white;
    font-size: 22px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    line-height: 50%;
    margin: 0;
    border-radius: 10px;
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
