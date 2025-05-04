const chartFrequency = document
  .getElementById("chartFrequency")
  .getContext("2d");
new Chart(chartFrequency, {
  type: "bar",
  data: {
    labels: ["1º BIM", "2º BIM", "3º BIM", "4º BIM"],
    datasets: [
      {
        label: "Frequência (%)",
        data: [89.5, 90.5, 86.5, 87.5],
        backgroundColor: ["black", "gray", "black", "gray"],
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        min: 86,
        max: 91,
        ticks: {
          stepSize: 1.0,
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "FREQUÊNCIAS",
        align: "start",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
        color: "black",
      },
    },
  },
});

google.charts.load("current", {
  packages: ["corechart"],
});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Conceito", "Quantidade"],
    ["A", 21.6],
    ["B", 21.6],
    ["C", 24.3],
    ["D", 32.4],
  ]);


  var options = {
    title: "CONCEITOS",
    is3D: true,
    pieHole: 0.8,
    legend: { position: "right" },
    colors: [
      "rgb(220, 220, 220)",
      "rgb(160, 160, 160)",
      "rgb(100, 100, 100)",
      "rgb(50, 50, 50)",
    ],
    backgroundColor: "transparent",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("chartPie")
  );
  chart.draw(data, options);
}

google.charts.load("current", {
  packages: ["geochart"],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ["Country", "Frequência"],
    ["France", 600],
    ["Brazil", 500],
    ["Japan", 550],
    ["United States", 400],
  ]);

  var options = {
    colorAxis: { colors: ["#ccc", "#000"] },
  };

  var chart = new google.visualization.GeoChart(document.getElementById("map"));
  chart.draw(data, options);
}

function showCanvas() {
  const select = document.getElementById("menuSelect");
  const option = select.value;

  if (option == "menu") {
    var offcanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvas")
    );
    offcanvas.show();
  } else if (option == "map") {
    var modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
  }
}
