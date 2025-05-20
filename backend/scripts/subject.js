const data_subjects = []

let id = 1

function addSubject() {

    const form = document.querySelector('#formSubject')
    const input_descricao = form.querySelector('input[name="descricao"]')

    const table = document.querySelector('#table_subject')
    const line = document.createElement('tr')
    const col_id = document.createElement('td')
    const col_descricao = document.createElement('td')

    col_descricao.textContent = input_descricao.value
    col_id.textContent = id
    id++

    line.appendChild(col_id);
    line.appendChild(col_descricao);

    table.appendChild(line)

    //select 

    const select = document.querySelector("#select_subject")

    const op = document.createElement("option");

    op.textContent = input_descricao.value

    op.value = input_descricao.value

    select.appendChild(op)

    // form.reset()
}