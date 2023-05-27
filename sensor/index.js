import { API_URL } from '../js/constant.js';

const id = new URLSearchParams(window.location.search).get('id');

setInterval(() => {
  updateGraph();
}, 5000);

const measureGraph = (data) => {
  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        x: {
          type: 'time'
        },
        y: {
          beginAtZero: true
        }
      }
    }
  }
  return config;
}

const fetchMeasure = async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  return await fetch(`${API_URL}/sensors/${id}/measurements`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateGraph = async () => {
  const sensors = await fetchMeasure();
  console.log('sensors:', sensors);
  
  const sensorsDiv = document.getElementById('sensors');
  sensorsDiv.textContent = '';
  sensors?.datas?.forEach(sensor => {
    sensorsDiv.appendChild(measureGraph(sensor));
  });
  
  const chart = new Chart(document.getElementById('sensorChart'), measureGraph(sensors?.data));
}

updateGraph();