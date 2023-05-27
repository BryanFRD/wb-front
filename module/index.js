import { API_URL } from '../js/constant.js';
import { sensorListComponent } from '../js/component.js';

const id = new URLSearchParams(window.location.search).get('id');

setInterval(() => {
  updateSensors();
}, 5000);

const fetchModule = async () => {
  return await fetch(`${API_URL}/modules/${id}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateModule = async () => {
  const module = await fetchModule();
  
  const moduleDiv = document.getElementById('moduleDetails');
  moduleDiv.textContent = '';
  
  const titleElement = document.createElement('h2');
  moduleDiv.append(titleElement);
  
  if(!module){
    title.innerText = `Impossible de trouver un module avec l'id : ${id}`;
    return;
  }
  
  titleElement.innerText = module.name;
}

const fetchSensors = async () => {
  const id = new URLSearchParams(window.location.search).get('id');
  return await fetch(`${API_URL}/modules/${id}/sensors`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateSensors = async () => {
  const sensors = await fetchSensors();
  
  const sensorsDiv = document.getElementById('sensors');
  sensorsDiv.textContent = '';
  sensors?.datas?.forEach(sensor => {
    console.log('sensor:', sensor);
    sensorsDiv.appendChild(sensorListComponent(sensor));
  });
}

updateModule();
updateSensors();