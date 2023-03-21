google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
const inicio = () => {
  window.location.href = './index.html';
}
const buscar = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    const tipos = [];
    const urls = [];
    const cantidad = [];

    data.results.forEach((result) => {
      tipos.push(result.name.charAt(0).toUpperCase() + result.name.slice(1));
      urls.push(result.url);
    });

    const typeData = await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    );

    typeData.forEach((data) => {
      cantidad.push(data.pokemon.length);
    });

    return tipos.map((tipo, index) => [tipo, cantidad[index]]);
  } catch (error) {
    console.error(error);
  }
};

function drawChart() {
  buscar().then((resultado) => {
    const data = google.visualization.arrayToDataTable([
      ["Tipo", "Cantidad"],
      ...resultado,
    ]);
    const options = {
      legend: "none",
      width: 700,
      height: 700,
      pieHole: 0.1,
      pieSliceText: "none", // Ocultar las etiquetas de texto
      backgroundColor:'transparent',
      pieSliceText: "label",
      pieSliceTextStyle: { // Establecer estilo de la etiqueta de cada segmento
        fontSize: 12,
        color: "black"
      }
    };
    

    const chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
    );

    chart.draw(data, options);
  });
}
