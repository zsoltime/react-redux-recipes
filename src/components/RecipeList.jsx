import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeCard from 'RecipeCard';
import Message from 'Message';
import Preloader from 'Preloader';

const RecipeList = (props) => {
  const { recipes, isFetching, error, handleClick } = props;

  const renderRecipes = () => {
    if (error) {
      return (
        <Message type="error">{error}</Message>
      );
    }
    if (isFetching) {
      return (
        <Message type="info">
          <Preloader />
          <span className="visuallyhidden">Searching for recipes...</span>
        </Message>
      );
    }
    if (recipes.length === 0) {
      return (
        <Message type="info">
          There are no recipes matching your search.
        </Message>
      );
    }
    return recipes.map(recipe => (
      <RecipeCard
        key={recipe.id}
        {...recipe}
        handleClick={handleClick}
      />
    ));
  };

  return (
    <div className="results" aria-atomic="true">
      {renderRecipes()}
    </div>
  );
};

RecipeList.defaultProps = {
  error: null,
};

RecipeList.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.recipes.error,
  recipes: state.recipes.recipes,
  isFetching: state.recipes.isFetching,
});

export default connect(mapStateToProps)(RecipeList);
