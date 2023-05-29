import { API_URL } from './js/constant.js';
import { moduleListComponent, infiniteScroll } from './js/component.js';

const search = new URLSearchParams(window.location.search).get('search');
infiniteScroll.observer.observe(document.getElementById("infinite_scroll"));

document.getElementById('navbarSearch').value = search;

setInterval(() => {
  updateModules();
}, 5000);

const fetchModules = async () => {
  return await fetch(`${API_URL}/modules?search=${encodeURIComponent(search ?? '')}&limit=${encodeURIComponent(infiniteScroll.limit)}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return null;
    });
}

const updateModules = async () => {
  const modules = await fetchModules();
  
  infiniteScroll.max = modules.count;
  
  const modulesDiv = document.getElementById('modules');
  modulesDiv.textContent = '';
  modules?.datas?.forEach(module => {
    modulesDiv.appendChild(moduleListComponent(module));
  });
}

updateModules();