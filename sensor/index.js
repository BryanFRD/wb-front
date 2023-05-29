import { API_URL } from '../js/constant.js';

const id = new URLSearchParams(window.location.search).get('id');
const chart = new Chart(document.getElementById('measureChart'), 
  {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: ''
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          reverse: true,
          display: true,
          title: {
            display: true,
            text: 'Temps'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Mesure'
          }
        },
      }
    }
  });

setInterval(() => {
  updateGraph();
  updateSensor();
}, 5000);

const fetchMeasure = async () => {
  return await fetch(`${API_URL}/sensors/${encodeURIComponent(id)}/measurements`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateGraph = async () => {
  const measurements = await fetchMeasure();
  
  chart.data.labels = measurements?.datas?.map(value => {
    const date = new Date(value.createdAt.date);
    return date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
  });
  
  chart.data.datasets[0].data = measurements?.datas?.map(value => value.measure);
  
  chart.update();
}

const fetchSensor = async () => {
  return await fetch(`${API_URL}/sensors/${encodeURIComponent(id)}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateSensor = async () => {
  const sensor = await fetchSensor();
  
  chart.data.datasets[0].label = sensor.measurementType;
  chart.update();
  
  const moduleDiv = document.getElementById('sensorDetails');
  moduleDiv.textContent = '';
  
  const titleElement = document.createElement('h2');
  moduleDiv.append(titleElement);
  
  if(!sensor?.id){
    titleElement.innerText = `Impossible de trouver un capteur avec l'id : ${id}`;
    return;
  }
  
  const measurementTypeElement = document.createElement('h2');
  measurementTypeElement.innerText = `Mesure : ${sensor.measurementType}`;
  
  const statusElement = document.createElement('h2');
  statusElement.setAttribute('class', sensor.status === 'active' ? 'text-success' : sensor.status === 'inactive' ? 'text-danger' : 'text-warning');
  statusElement.innerText = `(${sensor.status})`;
  
  titleElement.innerText = sensor.name;
  moduleDiv.append(measurementTypeElement, statusElement);
}

updateSensor();
updateGraph();