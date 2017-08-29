import * as actions from '../actions/types';

export default function recipeReducer(state = {
  error: null,
  isFetching: false,
  recipes: [],
}, action) {
  switch (action.type) {
    case actions.REQUEST_RECIPES :
      return Object.assign({}, state, {
        isFetching: true,
      });

    case actions.RECEIVE_RECIPES :
      return {
        isFetching: false,
        recipes: action.payload,
      };

    case actions.RECEIVE_RECIPES_ERROR :
      return {
        error: action.payload,
        isFetching: false,
        recipes: [],
      };

    case actions.ADD_TO_FAVORITES :
      return Object.assign({}, state, {
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.id) {
            // eslint-disable-next-line no-param-reassign
            recipe.isFavorite = !recipe.isFavorite;
          }
          return recipe;
        }),
      });

    case actions.REMOVE_FROM_FAVORITES :
      return Object.assign({}, state, {
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload) {
            // eslint-disable-next-line no-param-reassign
            recipe.isFavorite = !recipe.isFavorite;
          }
          return recipe;
        }),
      });

    default :
      return state;
  }
}
