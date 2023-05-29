import { moduleModal, sensorModal } from './component.js';

searchBarForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const search = new FormData(searchBarForm).get('search');
  const searchParams = new URLSearchParams([['search', search]]);
  
  if(window.location.pathname != '/' || window.location.search != `?${searchParams.toString()}`){
    window.location.href = `${window.location.origin}/?${searchParams.toString()}`;
  }
});

export const modalBootstrap = new bootstrap.Modal('#modal');

document.getElementById("createModuleButton").addEventListener('click', () => {
  moduleModal(modalBootstrap);
  modalBootstrap.show();
});

document.getElementById("createSensorButton").addEventListener('click', () => {
  sensorModal(modalBootstrap);
  modalBootstrap.show();
});

document.getElementById("createMeasureButton").addEventListener('click', () => {
  moduleModal(modalBootstrap);
  modalBootstrap.show();
});

export const toastBootstrap = new bootstrap.Toast('#toast');

export const toast = (message, className = 'text-bg-secondary') => {
  document.getElementById('toast').setAttribute('class', `${className} toast align-items-center border-0 position-fixed bottom-0 end-0 m-3`);
  
  if(toastBootstrap.isShown())
    toastBootstrap.dispose();
  
  document.getElementById("toastBody").innerText = message;
  toastBootstrap.show();
}