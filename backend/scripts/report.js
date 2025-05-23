const data_reports = []
let idReport = 1;

function addReport(){

    const form = document.querySelector('#formReport')
    const input_date = form.querySelector('input[name="data"]')
    const select_subject = form.querySelector('select[name="assunto"]')
    const select_agent = form.querySelector('select[name="agente"]')

    const table = document.querySelector('#table_report')
    const line = document.createElement('tr')
    const col_id = document.createElement('td')
    const col_date = document.createElement('td')
    const col_subject = document.createElement('td')
    const col_agent = document.createElement('td')

    col_id.textContent = idReport
    col_date.textContent = input_date.value
    col_subject.textContent = select_subject.value
    col_agent.textContent = select_agent.value
    idReport++

    line.appendChild(col_id);
    line.appendChild(col_date);
    line.appendChild(col_subject);
    line.appendChild(col_agent);

    table.appendChild(line)

    form.reset()
}

