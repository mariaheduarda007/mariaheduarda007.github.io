function drawChart() {
    var data = google.visualization.arrayToDataTable([
          ['Categoria', 'Valor', { role: 'style' }],
          ['Agentes',    idAgent-1, 'color: #a6d854'],
          ['Assuntos',   idSubject-1, 'color:rgb(102, 159, 194); opacity: 0.5'],  
          ['Regionais',  idRegional-1, 'color: #ffd92f'],
          ['Relatórios', idReport-1, 'color: #fc8d62']
        ]);

        var options = {
          legend: 'none',
          vAxis: {
            minValue: 0,
            maxValue: 1
          }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        chart.draw(data, options);
}
