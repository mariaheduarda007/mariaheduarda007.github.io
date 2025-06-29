
function ex02() {

    const form = document.querySelector('#form02')
    const input = form.querySelector('input[name="in_02"]').value
    let array = input.split(" ")

    resolve02(...array)
    form.reset()
}

function resolve02(...numbers) {
    let sum = 0;

    numbers.forEach(e => {
        sum += Number(e)
    });

    let output = document.querySelector('#output')
    output.textContent = "Média: " + (sum / numbers.length).toFixed(2)


}



