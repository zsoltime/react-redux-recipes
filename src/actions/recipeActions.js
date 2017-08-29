import axios from 'axios';

import favoriteStorage from '../api/favorites';
import * as actions from './types';

const API_URL = 'https://zsolti.co/recipes/';

// should move to the API wrapper ??
function renameProps(fetchedRecipes) {
  return fetchedRecipes.map(recipe => ({
    id: recipe.recipe_id,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    publisher: recipe.publisher,
    publisherUrl: recipe.publisher_url,
    thumbnail: recipe.image_url,
  }));
}

export const requestRecipes = () => ({
  type: actions.REQUEST_RECIPES,
});

export const receiveRecipes = data => ({
  type: actions.RECEIVE_RECIPES,
  payload: renameProps(data),
});

export const fetchError = err => ({
  type: actions.RECEIVE_RECIPES_ERROR,
  payload: `Can't fetch recipes: ${err}`,
});

export const fetchRecipes = q => (
  (dispatch) => {
    dispatch(requestRecipes());

    axios.get(API_URL, { params: { q } })
      .then((res) => {
        // @todo handle res.status !== 200 ?
        if (res.data.err) {
          dispatch(fetchError(res.data.err));
        } else if (res.data.recipes) {
          dispatch(receiveRecipes(res.data.recipes));
        } else {
          dispatch(fetchError('Unknown error'));
        }
      })
      .catch((err) => {
        dispatch(fetchError(err.message));
      });
  }
);

export const addToFavorites = (recipe) => {
  const favoriteRecipes = favoriteStorage.get();
  const isDuplicate = favoriteRecipes.filter(
    x => x.id === recipe.id
  ).length > 0;

  if (!isDuplicate) {
    favoriteStorage.set([
      ...favoriteRecipes,
      recipe,
    ]);
  }

  return {
    type: actions.ADD_TO_FAVORITES,
    payload: recipe,
  };
};

export const removeFromFavorites = (id) => {
  favoriteStorage.set(
    favoriteStorage.get().filter(x => x.id !== id)
  );

  return {
    type: actions.REMOVE_FROM_FAVORITES,
    payload: id,
  };
};
