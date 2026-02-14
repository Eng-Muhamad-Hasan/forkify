import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _successMessage = '';

  /**
   * Rendering The Recived Data
   * @param {Object | Object[]} data 
   * @returns 
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(this._errorMessage);
    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Way 1 : using replaceChildren which will remove all the children of the parent element
    // and replace them with the new children :
    // this._parentElement.replaceChildren(newDOM);
    //? Way 2 : using diffing algorithm :
    //? which will compare the new DOM with the current DOM and only update the elements that have changed
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*'),
    );
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // update the text content of the element
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // update the attributes of the element
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const spinner = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMessage) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
