
function ex03() {
    
    const form = document.querySelector('#form03')
    const input = form.querySelector('input[name="in_03"]').value
    let array = input.split(" ")
    resolve03(...array)
    form.reset()
}

function resolve03(...array) {
    let result = array.map(e => {
        return isEven(Number(e))
    })

    
    let output = document.querySelector('#output')
    output.innerHTML = result.join("<br>")

}

function isEven(val) {
    
    if (val%2 == 0){
        return "PAR"
    }
    else {
        return "IMPAR"
    }
}


