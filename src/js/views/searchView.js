import View from './View.js';


class SearchView extends View {
_parentElement = document.querySelector('.search');
_errorMessage = 'We could not find that recipe. Please try another one!';
_successMessage = '';

  getQuery() {const query =
    this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) { 
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  }




export default new SearchView();