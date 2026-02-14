import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// if (module.hot) {
//   module.hot.accept();
// }
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
//* MVC Pattern : 
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // update results view to mark selected search result as active
    resultsView.update(model.getSearchPageResults());
    
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    model.state.search.page = 1;
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchPageResults());
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchPageResults(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // Update the recipe bookmarked state (in state)
model.state.recipe.bookmarked ?
    model.removeBookmark(model.state.recipe.id):
    model.addBookmark(model.state.recipe);
  
    // Update the bookmarks view
    bookmarksView.render(model.state.bookmarks);
    
    // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);

};

const controlAddRecipe = async function (recipeData) {
  try {
    addRecipeView.renderSpinner();
    // upload the recipe
    await model.uploadRecipe(recipeData);
    console.log(model.state.recipe);
    // add the recipe to the bookmarks
    bookmarksView.render(model.state.bookmarks);
    // update the recipe view
    recipeView.render(model.state.recipe);
    // display success message
    addRecipeView.renderSuccess();
    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);

  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
};

init();
