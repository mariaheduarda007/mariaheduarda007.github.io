
function ex01() {
    
    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value
    
    let array = input.split(" ")

   resolve01(...array)

    form.reset()
}

function resolve01() {

    let sum = 0;

    for(a in arguments){
        sum += Number(arguments[a])
        alert(arguments[a])
    }

    let output = document.querySelector('#output')
    output.textContent = "Média: " + (sum/arguments.length).toFixed(2)

    

} 





