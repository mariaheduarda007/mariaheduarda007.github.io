function drawChart() {
    var data = google.visualization.arrayToDataTable([
          ['Categoria', 'Valor', { role: 'style' }],
          ['Agentes',    0.01, 'color: #a6d854'],
          ['Assuntos',   1.00, 'color:rgb(102, 159, 194); opacity: 0.5'],  
          ['Regionais',  0.02, 'color: #ffd92f'],
          ['Relatórios', 0.01, 'color: #fc8d62']
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
