searchBarForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const search = new FormData(searchBarForm).get('search');
  const searchParams = new URLSearchParams([['search', search]]);
  
  if(window.location.pathname != '/' || window.location.search != `?${searchParams.toString()}`){
    window.location.pathname = '/';
    window.location.search = searchParams.toString();
  }
});