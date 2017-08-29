import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Message from 'Message';
import Preloader from 'Preloader';
import RecipeCard from 'RecipeCard';
import SearchForm from 'SearchForm';
import * as actions from '../actions/recipeActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onFavorite = this.onFavorite.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {
    this.props.fetchRecipes();
  }
  onSearch(q) {
    const query = q.replace(/\s*,\s*/g, ',');
    this.props.fetchRecipes(query);
  }
  onFavorite(id) {
    const { recipes } = this.props;
    const index = recipes.findIndex(x => x.id === id);
    const recipe = recipes[index];

    if (recipe.isFavorite) {
      this.props.removeFromFavorites(id);
    } else {
      this.props.addToFavorites(recipe);
    }
  }
  render() {
    const renderRecipes = () => {
      const { error, isFetching, recipes } = this.props;
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
          handleFavClick={this.onFavorite}
        />
      ));
    };

    return (
      <div className="page">
        <h1 className="page__title">
          <span>React Recipe Finder</span>
        </h1>
        <SearchForm handleSubmit={this.onSearch} />
        <div className="results" aria-atomic="true">
          {renderRecipes()}
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  error: null,
  isFetching: false,
  recipes: [],
};

HomePage.propTypes = {
  error: PropTypes.string,
  fetchRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  recipes: PropTypes.arrayOf(
    PropTypes.object,
  ),
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.recipes.error,
  recipes: state.recipes.recipes,
  isFetching: state.recipes.isFetching,
});

export default connect(mapStateToProps, actions)(HomePage);
