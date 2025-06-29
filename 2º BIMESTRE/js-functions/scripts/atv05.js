
function ex05() {
    
    const form = document.querySelector('#form05')
    const input = form.querySelector('input[name="in_05"]').value
    const obj = construtora(input)
    resolve05(obj)
    form.reset()
}

function resolve05(obj) {

    let output = document.querySelector('#output')
    output.innerHTML = "id: " + obj.id + "<br>" 
    + "nome: " + obj.nome + "<br>" 
    + "media: " + obj.media
    


}

function construtora(data) {
    const obj = JSON.parse(data)

    return {
        id: obj.id,
        nome: obj.nome,
        media: obj.media
    }
}
