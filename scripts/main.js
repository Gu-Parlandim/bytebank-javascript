import { showPriceInDisplay } from "./printPrice.js";

const chartDollar = document.getElementById("graficoDolar");

const graphicDollar = new Chart(chartDollar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dolar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

const updateChart = (graphic, label, data) => {
  graphic.data.labels.push(label);
  graphic.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  graphic.update();
};

const getCurrentTime = () => {
  let date = new Date();
  let currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return currentTime;
};

const workerDollar = new Worker("./scripts/workers/workerDollar.js");
workerDollar.postMessage("usd");

workerDollar.addEventListener("message", (event) => {
  const time = getCurrentTime();
  const value = event.data.ask;

  updateChart(graphicDollar, time, value);
  showPriceInDisplay("Dolar", value);
});
