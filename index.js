import { API_URL } from './js/constant.js';
import { moduleListComponent } from './js/component.js';

const search = new URLSearchParams(window.location.search).get('search');

setInterval(() => {
  updateModules();
}, 5000);

const fetchModules = async () => {
  return await fetch(`${API_URL}/modules?search=${search ?? ''}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateModules = async () => {
  const modules = await fetchModules();
  
  const modulesDiv = document.getElementById('modules');
  modulesDiv.textContent = '';
  modules?.datas?.forEach(module => {
    modulesDiv.appendChild(moduleListComponent(module));
  });
}

updateModules();