
function ex04() {

    const form = document.querySelector('#form04')
    const input = form.querySelector('input[name="in_04"]').value

    let array = input.split(" ")
    resolve04(...array)

    form.reset()
}

function resolve04(...array) {

    let result = array.filter(e => {

        return filter_perfect(Number(e))
    })

    alert(result)

}

const filter_perfect = (val) => {

    let div = 1
    let sumDiv = 0

    while (sumDiv < val) {
        if (val % div == 0 && div != val) {
            sumDiv += div
        }
        div++
    }


    if (sumDiv == val){
        return true
    }

}

