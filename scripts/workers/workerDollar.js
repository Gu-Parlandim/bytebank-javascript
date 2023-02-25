const getApiData = async () => {
  const res = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  );
  const resToJson = await res.json();

  postMessage(resToJson.USDBRL);
};

addEventListener("message", () => {
  getApiData();
  setInterval(getApiData, 5000);
});
