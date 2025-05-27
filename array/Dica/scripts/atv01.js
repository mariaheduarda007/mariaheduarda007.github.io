
function ex01() {
    
    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value
    
    let array = input.split(" ")
    resolve01(array)

    form.reset()
}

function resolve01(...args) {
    alert("args = " + args)
    let sum = 0;
    args.forEach((a) => sum += a)

    alert("sum = " + sum)


    let res = sum/args.length

    alert(res)

} 





