import View from './View.js';
import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks found! Please bookmark a recipe :)';

  _generateMarkup() {
return this._data.map(result => this._generateMarkupPreview(result)).join('');
  }

  addHandlerBookmark(handler) { 
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(result) {
    const id=window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${result.id===id?'preview__link--active':''}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.publisher}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }
}
export default new BookmarksView();
