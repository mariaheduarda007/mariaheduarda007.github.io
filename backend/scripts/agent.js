const data_agents = []

let idAgent = 1;

function addAgent(){

    const form = document.querySelector('#formAgent')
    const input_nome = form.querySelector('input[name="nome"]')
    const select_regional = form.querySelector('select[name="regional"]')

    const table = document.querySelector('#table_agent')
    const line = document.createElement('tr')
    const col_id = document.createElement('td')
    const col_nome = document.createElement('td')
    const col_regional = document.createElement('td')

    col_id.textContent = idAgent
    col_nome.textContent = input_nome.value
    col_regional.textContent = select_regional.value
    idAgent++

    line.appendChild(col_id);
    line.appendChild(col_nome);
    line.appendChild(col_regional);

    table.appendChild(line)

    //select 

    const select = document.querySelector("#select_agent")

    const op = document.createElement("option");

    op.textContent = input_nome.value

    op.value = input_nome.value

    select.appendChild(op)

    form.reset()
}
