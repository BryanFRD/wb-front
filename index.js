setInterval(() => {
  updateModule();
}, 5000);

const fetchModule = async () => {
  const search = new URLSearchParams(window.location.search).get('search');
  return await fetch(`https://127.0.0.1:8000/modules?search=${search}`)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(error => {
      console.log('error:', error);
      return [];
    });
}

const updateModule = async () => {
  const modules = await fetchModule();
  console.log('modules:', modules);
}

updateModule();