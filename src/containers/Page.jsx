import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeList from 'RecipeList';
import SearchForm from 'SearchForm';
import * as actions from '../actions/recipeActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onFavorite = this.onFavorite.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchRecipes());
  }
  onSearch(q) {
    const query = q.replace(/\s*,\s*/g, ',');
    this.props.dispatch(actions.fetchRecipes(query));
  }
  onFavorite(id) {
    const { recipes } = this.props;
    const index = recipes.findIndex(recipe => recipe.id === id);
    const recipe = recipes[index];

    if (recipe.isFavorite) {
      this.props.dispatch(actions.removeFromFavorites(id));
    } else {
      this.props.dispatch(actions.addToFavorites(recipe));
    }
  }
  render() {
    return (
      <div className="wrapper">
        <SearchForm handleSubmit={this.onSearch} />
        <RecipeList handleClick={this.onFavorite} />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
});

export default connect(mapStateToProps)(HomePage);
