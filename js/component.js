import { modalBootstrap, toast } from './common.js';
import { API_URL } from './constant.js';

export const moduleListComponent = (module, refreshCallback) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'd-flex overflow-hidden rounded bg-light');
  
  const aContainer = document.createElement('a');
  aContainer.setAttribute('class', 'd-flex flex-column flex-lg-row align-items-center shadow-sm rounded p-3 text-dark text-decoration-none flex-wrap gap-3 btn btn-light rounded-0 flex-grow-1');
  aContainer.setAttribute('href', `/module/?id=${module?.id}`);
  
  const statusElement = document.createElement('div');
  const statusElementBg = module?.status === 'active' ? 'bg-success' : module?.status === 'inactive' ? 'bg-danger' : 'bg-warning';
  statusElement.setAttribute('class', `rounded-circle p-2 h-auto ${statusElementBg}`);
  
  const titleElement = document.createElement('span');
  titleElement.setAttribute('class', 'text-break');
  titleElement.innerText = module?.name;
  
  const sensorsCountElement = document.createElement('span');
  sensorsCountElement.setAttribute('class', 'ms-lg-auto');
  sensorsCountElement.innerText = `Nombre de capteur : ${module?.sensorCount}`;
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('class', 'd-flex');
  
  const updateElement = document.createElement('button');
  updateElement.setAttribute('class', 'bi bi-pen text-white btn btn-primary rounded-0');
  updateElement.addEventListener('click', () => {
    moduleModal(modalBootstrap, module, refreshCallback);
    modalBootstrap.show();
  });
  
  const deleteElement = document.createElement('button');
  deleteElement.setAttribute('class', 'bi bi-x text-white btn btn-danger rounded-0');
  deleteElement.addEventListener('click', () => {
    fetch(`${API_URL}/modules/${module?.id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(() => toast('Module supprimé !', 'text-bg-success'))
      .catch(() => toast('Erreur lors de la suppression du module !', 'text-bg-danger'))
      .finally(() => {
        if(refreshCallback)
          refreshCallback();
      });
  });
  
  buttonsDiv.append(updateElement, deleteElement);
  
  aContainer.append(statusElement, titleElement, sensorsCountElement);
  
  container.append(aContainer, buttonsDiv)
  
  return container;
}

export const sensorListComponent = (sensor, refreshCallback) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'd-flex overflow-hidden rounded bg-light');
  
  const aContainer = document.createElement('a');
  aContainer.setAttribute('class', 'd-flex flex-column flex-lg-row align-items-center shadow-sm rounded p-3 text-dark text-decoration-none flex-wrap gap-3 btn btn-light rounded-0 flex-grow-1');
  aContainer.setAttribute('href', `/sensor/?id=${sensor?.id}`);
  
  const statusElement = document.createElement('div');
  const statusElementBg = sensor?.status === 'active' ? 'bg-success' : sensor?.status === 'inactive' ? 'bg-danger' : 'bg-warning';
  statusElement.setAttribute('class', `rounded-circle p-2 h-auto ${statusElementBg}`);
  
  const titleElement = document.createElement('span');
  titleElement.setAttribute('class', 'text-break');
  titleElement.innerText = sensor?.name;
  
  const measurementTypeCountElement = document.createElement('span');
  measurementTypeCountElement.innerText = `(${sensor?.measurementType})`;
  
  aContainer.append(statusElement, titleElement, measurementTypeCountElement);
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('class', 'd-flex');
  
  const updateElement = document.createElement('button');
  updateElement.setAttribute('class', 'bi bi-pen text-white btn btn-primary rounded-0');
  updateElement.addEventListener('click', () => {
    sensorModal(modalBootstrap, sensor, refreshCallback);
    modalBootstrap.show();
  });
  
  const deleteElement = document.createElement('button');
  deleteElement.setAttribute('class', 'bi bi-x text-white btn btn-danger rounded-0');
  deleteElement.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    fetch(`${API_URL}/modules/${module?.id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(() => toast('Module supprimé !', 'text-bg-success'))
      .catch(() => toast('Erreur lors de la suppression du module !', 'text-bg-danger'))
      .finally(() => {
        if(refreshCallback)
          refreshCallback();
      });
  });
  
  buttonsDiv.append(updateElement, deleteElement);
  
  container.append(aContainer, buttonsDiv);
  
  return container;
}

export const infiniteScroll = {
  offset: 1,
  limit: 50,
  step: 50,
  max: 50,
  shown: false,
  observer: new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !infiniteScroll.shown){
        infiniteScroll.shown = true;
        infiniteScroll.limit = Math.min(infiniteScroll.step * infiniteScroll.offset, infiniteScroll.max);
        infiniteScroll.offset += Math.floor(Math.min(infiniteScroll.max / infiniteScroll.step, infiniteScroll.offset + 1));
      } else {
        infiniteScroll.shown = false;
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })
}

export const setModal = (title, form) => {
  const modal = document.getElementById("modal");
  document.getElementById('modalTitle').innerText = title;
  const body = document.getElementById('modalBody');
  body.textContent = '';
  body.append(form);
  
  return modal;
}

export const moduleModal = (modal, data, refreshCallback) => {
  const form = document.createElement('form');
  form.setAttribute('class', 'd-flex flex-column gap-3');
  form.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData);
    
    fetch(`${API_URL}/modules${data?.id ? `/${data.id}` : ''}`, {
      method: data?.id ? 'PUT' : 'POST',
      body: JSON.stringify(entries)
    })
      .then(resp =>  resp.json())
      .then(() => {
        modal.hide();
        toast(`Module ${data?.id ? 'mis à jour' : 'créé'}`, 'text-bg-success');
      })
      .catch(error => {
        toast(`Impossible de ${data?.id ? 'mettre à jour le' : 'créer un'} module`, 'text-bg-danger');
        return error;
      })
      .finally(() => {
        if(refreshCallback)
          refreshCallback();
      });
  });
  
  const inputsContainer = document.createElement('div');
  inputsContainer.setAttribute('class', 'd-flex flex-column gap-3');
  
  const statusDiv = document.createElement('div');
  statusDiv.setAttribute('class', 'd-flex');
  const statusLabel = document.createElement('label');
  statusLabel.setAttribute('class', 'col-4');
  statusLabel.innerText = 'Status';
  const statusSelect = document.createElement('select');
  statusSelect.setAttribute('class', 'form-select');
  statusSelect.setAttribute('name', 'status');
  
  ['active', 'faulty', 'inactive'].forEach((value) => {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = value;
    
    if(value === data?.status)
      option.setAttribute('selected', 'selected');
    
    statusSelect.appendChild(option);
  });
  
  statusDiv.append(statusLabel, statusSelect);
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.setAttribute('class', 'd-flex gap-3 justify-content-end');
  
  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'btn btn-success');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = data?.id ? 'Mettre à jour' : 'Créer';
  
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'btn btn-danger');
  cancelButton.setAttribute('type', 'button');
  cancelButton.setAttribute('data-bs-dismiss', 'modal');
  cancelButton.innerText = 'Annuler';
  
  buttonsContainer.append(cancelButton, submitButton);
  
  inputsContainer.append(createInputDiv('Nom', 'string', 'name', data?.name ?? ''), statusDiv);
  
  form.append(inputsContainer, buttonsContainer);
  
  setModal('Module', form);
}

export const sensorModal = async (modal, data, refreshCallback) => {
  const form = document.createElement('form');
  form.setAttribute('class', 'd-flex flex-column gap-3');
  form.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData);
    
    fetch(`${API_URL}/sensors${data?.id ? `/${encodeURIComponent(data.id)}` : ''}`, {
      method: data?.id ? 'PUT' : 'POST',
      body: JSON.stringify(entries)
    })
      .then(resp =>  resp.json())
      .then(() => {
        modal.hide();
        toast(`Capteur ${data?.id ? 'mis à jour' : 'créé'}`, 'text-bg-success');
      })
      .catch(error => {
        toast(`Impossible de ${data?.id ? 'mettre à jour le' : 'créer un'} module`, 'text-bg-danger');
        return error;
      })
      .finally(() => {
        if(refreshCallback)
          refreshCallback();
      });;
  });
  
  const inputsContainer = document.createElement('div');
  inputsContainer.setAttribute('class', 'd-flex flex-column gap-3');
  
  const statusDiv = document.createElement('div');
  statusDiv.setAttribute('class', 'd-flex');
  const statusLabel = document.createElement('label');
  statusLabel.setAttribute('class', 'col-4');
  statusLabel.innerText = 'Status';
  const statusSelect = document.createElement('select');
  statusSelect.setAttribute('class', 'form-select');
  statusSelect.setAttribute('name', 'status');
  
  ['active', 'faulty', 'inactive'].forEach((value) => {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = value;
    
    if(value === data?.status)
      option.setAttribute('selected', 'selected');
      
      statusSelect.appendChild(option);
    });
  
  const simulatedDiv = document.createElement('div');
  simulatedDiv.setAttribute('class', 'd-flex');
  const simulatedLabel = document.createElement('label');
  simulatedLabel.setAttribute('class', 'col-4');
  simulatedLabel.innerText = 'Simuler';
  const simulatedInput = document.createElement('input');
  simulatedInput.setAttribute('type', 'checkbox');
  simulatedInput.setAttribute('class', 'form-check-input');
  simulatedInput.setAttribute('name', 'simulated');
  simulatedInput.setAttribute('checked', data?.simulated ?? false);
  
  simulatedDiv.append(simulatedLabel, simulatedInput);
  
  const moduleDiv = document.createElement('div');
  moduleDiv.setAttribute('class', 'd-flex');
  const moduleLabel = document.createElement('label');
  moduleLabel.setAttribute('class', 'col-4');
  moduleLabel.innerText = 'Module';
  const moduleSelect = document.createElement('select');
  moduleSelect.setAttribute('class', 'w-100');
  moduleSelect.setAttribute('name', 'moduleId');
  moduleSelect.setAttribute('id', 'moduleSelect');
  
  moduleDiv.append(moduleLabel, moduleSelect);
  
  statusDiv.append(statusLabel, statusSelect);
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.setAttribute('class', 'd-flex gap-3 justify-content-end');
  
  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'btn btn-success');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = data?.id ? 'Mettre à jour' : 'Créer';
  
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'btn btn-danger');
  cancelButton.setAttribute('type', 'button');
  cancelButton.setAttribute('data-bs-dismiss', 'modal');
  cancelButton.innerText = 'Annuler';
  
  buttonsContainer.append(cancelButton, submitButton);
  
  inputsContainer.append(
    createInputDiv('Nom', 'string', 'name', data?.name ?? ''),
    statusDiv,
    createInputDiv('Type de mesure', 'string', 'measurementType', data?.measurementType ?? ''),
    simulatedDiv,
    createInputDiv('Simulation min', 'number', 'simulationMinimum', data?.simulationMinimum ?? ''),
    createInputDiv('Simulation max', 'number', 'simulationMaximum', data?.simulationMaximum ?? ''),
    moduleDiv
  );
  
  form.append(inputsContainer, buttonsContainer);
  
  setModal('Capteur', form);
  
  let sensorModule = {};
  if(data?.moduleId){
    console.log('data:', data);
    sensorModule = await fetch(`${API_URL}/modules/${encodeURIComponent(data?.moduleId)}`)
      .then(resp => resp.json())
      .then(resp => resp)
      .catch(() => null);
  }
  
  new TomSelect('#moduleSelect', {
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    preload: true,
    options: [{id: sensorModule?.id, name: sensorModule?.name}],
    items: [sensorModule?.id],
    load: (query, callback) => {
      fetch(`${API_URL}/modules/?search=${encodeURIComponent(query)}`)
        .then(resp => resp.json())
        .then(resp => callback(resp?.datas))
        .catch(() => callback());
    }
  });
}

export const measureModal = async (modal, data, refreshCallback) => {
  const form = document.createElement('form');
  form.setAttribute('class', 'd-flex flex-column gap-3');
  form.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData);
    console.log('entries:', entries);
    
    fetch(`${API_URL}/measurements${data?.id ? `/${encodeURIComponent(data.id)}` : ''}`, {
      method: data?.id ? 'PUT' : 'POST',
      body: JSON.stringify(entries)
    })
      .then(resp =>  resp.json())
      .then(() => {
        modal.hide();
        toast(`Mesure ${data?.id ? 'mise à jour' : 'créée'}`, 'text-bg-success');
      })
      .catch(error => {
        toast(`Impossible de ${data?.id ? 'mettre à jour la' : 'créer une'} mesure`, 'text-bg-danger');
        return error;
      })
      .finally(() => {
        if(refreshCallback)
          refreshCallback();
      });;
  });
  
  const inputsContainer = document.createElement('div');
  inputsContainer.setAttribute('class', 'd-flex flex-column gap-3');
  
  const measureDiv = document.createElement('div');
  measureDiv.setAttribute('class', 'd-flex');
  const measureLabel = document.createElement('label');
  measureLabel.setAttribute('class', 'col-4');
  measureLabel.innerText = 'Mesure';
  const measureInput = document.createElement('input');
  measureInput.setAttribute('type', 'number');
  measureInput.setAttribute('class', 'form-control');
  measureInput.setAttribute('name', 'measure');
  measureInput.setAttribute('step', '0.01');
  
  measureDiv.append(measureLabel, measureInput);
  
  const sensorDiv = document.createElement('div');
  sensorDiv.setAttribute('class', 'd-flex');
  const sensorLabel = document.createElement('label');
  sensorLabel.setAttribute('class', 'col-4');
  sensorLabel.innerText = 'Capteur';
  const sensorSelect = document.createElement('select');
  sensorSelect.setAttribute('class', 'w-100');
  sensorSelect.setAttribute('name', 'sensorId');
  sensorSelect.setAttribute('id', 'sensorSelect');
  
  sensorDiv.append(sensorLabel, sensorSelect);
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.setAttribute('class', 'd-flex gap-3 justify-content-end');
  
  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'btn btn-success');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = data?.id ? 'Mettre à jour' : 'Créer';
  
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'btn btn-danger');
  cancelButton.setAttribute('type', 'button');
  cancelButton.setAttribute('data-bs-dismiss', 'modal');
  cancelButton.innerText = 'Annuler';
  
  buttonsContainer.append(cancelButton, submitButton);
  
  inputsContainer.append(
    measureDiv,
    sensorDiv
  );
  
  form.append(inputsContainer, buttonsContainer);
  
  setModal('Capteur', form);
  
  let measureSensor = {};
  if(data?.sensorId){
    measureSensor = await fetch(`${API_URL}/sensors/${encodeURIComponent(data?.sensorId)}`)
      .then(resp => resp.json())
      .then(resp => resp)
      .catch(() => null);
  }
  
  new TomSelect('#sensorSelect', {
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    preload: true,
    options: [{id: measureSensor?.id, name: measureSensor?.name}],
    items: [measureSensor?.id],
    load: (query, callback) => {
      fetch(`${API_URL}/sensors/?search=${encodeURIComponent(query)}`)
        .then(resp => resp.json())
        .then(resp => callback(resp?.datas))
        .catch(() => callback());
    }
  });
}

export const createInputDiv = (label, type, name, defaultValue) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'd-flex');
  
  const labelInput = document.createElement('label');
  labelInput.setAttribute('class', 'col-4');
  
  const nameInput = document.createElement('input');
  nameInput.setAttribute('class', 'form-control');
  nameInput.setAttribute('type', type ?? 'string');
  nameInput.setAttribute('name', name);
  nameInput.setAttribute('value', defaultValue);
  
  labelInput.innerText = label;
  
  container.append(labelInput, nameInput);
  
  return container;
}