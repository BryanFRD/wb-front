export const moduleListComponent = (module) => {
  const container = document.createElement('a');
  container.setAttribute('class', 'd-flex flex-column flex-lg-row align-items-center shadow-sm rounded p-3 bg-body-tertiary text-dark text-decoration-none flex-wrap gap-3');
  container.setAttribute('href', `/module/?id=${module?.id}`);
  
  const statusElement = document.createElement('div');
  const statusElementBg = module?.status === 'active' ? 'bg-success' : module?.status === 'inactive' ? 'bg-danger' : 'bg-warning';
  statusElement.setAttribute('class', `rounded-circle p-2 h-auto ${statusElementBg}`);
  
  const titleElement = document.createElement('span');
  titleElement.setAttribute('class', 'text-break');
  titleElement.innerText = module?.name;
  
  const sensorsCountElement = document.createElement('span');
  sensorsCountElement.setAttribute('class', 'ms-lg-auto');
  sensorsCountElement.innerText = `Nombre de capteur : ${module?.sensorCount}`;
  
  container.append(statusElement, titleElement, sensorsCountElement);
  
  return container;
}

export const sensorListComponent = (sensor) => {
  const container = document.createElement('a');
  container.setAttribute('class', 'd-flex flex-column flex-lg-row align-items-center shadow-sm rounded p-3 bg-body-tertiary text-dark text-decoration-none flex-wrap gap-3');
  container.setAttribute('href', `/sensor/?id=${sensor?.id}`);
  
  const statusElement = document.createElement('div');
  const statusElementBg = sensor?.status === 'active' ? 'bg-success' : sensor?.status === 'inactive' ? 'bg-danger' : 'bg-warning';
  statusElement.setAttribute('class', `rounded-circle p-2 h-auto ${statusElementBg}`);
  
  const titleElement = document.createElement('span');
  titleElement.setAttribute('class', 'text-break');
  titleElement.innerText = sensor?.name;
  
  const measurementTypeCountElement = document.createElement('span');
  measurementTypeCountElement.innerText = `(${sensor?.measurementType})`;
  
  const measurementsCountElement = document.createElement('span');
  measurementsCountElement.setAttribute('class', 'ms-lg-auto');
  measurementsCountElement.innerText = `Nombre de mesure : ${sensor?.measurementCount}`;
  
  container.append(statusElement, titleElement, measurementTypeCountElement, measurementsCountElement);
  
  return container;
}