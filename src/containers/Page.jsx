import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from 'SearchForm';
import RecipeCard from 'RecipeCard';

import favoriteStorage from '../api/favorites';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.onFavorite = this.onFavorite.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {
    this.fetchRecipes();
  }
  onSearch(q) {
    const query = q.replace(/\s*,\s*/g, ',');
    this.fetchRecipes(query);
  }
  onFavorite(id) {
    let updatedRecipe;

    function saveToLocalStorage() {
      const favoriteRecipes = favoriteStorage.get();

      if (updatedRecipe.isFavorite) {
        const isDuplicate = favoriteRecipes.filter(
          x => x.id === updatedRecipe.id
        ).length > 0;

        if (!isDuplicate) {
          favoriteStorage.set([
            ...favoriteRecipes,
            updatedRecipe,
          ]);
        }
      } else {
        favoriteStorage.set(
          favoriteRecipes.filter(x => x.id !== updatedRecipe.id)
        );
      }
    }

    this.setState((prev) => {
      const recipes = prev.recipes.map((recipe) => {
        if (recipe.id === id) {
          updatedRecipe = Object.assign({}, recipe, {
            isFavorite: !recipe.isFavorite,
          });

          return updatedRecipe;
        }
        return recipe;
      });

      return { recipes };
    }, saveToLocalStorage);
  }
  fetchRecipes(q = '') {
    // should move to the API wrapper
    const renameProps = fetchedRecipes => (
      fetchedRecipes.map(recipe => ({
        id: recipe.recipe_id,
        title: recipe.title,
        sourceUrl: recipe.source_url,
        publisher: recipe.publisher,
        publisherUrl: recipe.publisher_url,
        thumbnail: recipe.image_url,
      }))
    );

    axios.get('https://zsolti.co/recipes/', { params: { q } })
      .then((res) => {
        if (res.status !== 200 || res.data.err) {
          // @todo: handle error
          console.log(res.data.err);
        } else if (res.data.recipes.length > 0) {
          this.setState({
            recipes: renameProps(res.data.recipes),
          });
        }
      });
  }
  render() {
    const renderedRecipes = this.state.recipes.map(recipe => (
      <RecipeCard
        key={recipe.id}
        {...recipe}
        handleFavClick={this.onFavorite}
      />
    ));
    return (
      <div className="page">
        <h1 className="page__title">React Recipe Finder</h1>
        <SearchForm handleSubmit={this.onSearch} />
        <div className="results">
          {renderedRecipes}
        </div>
      </div>
    );
  }
}

export default HomePage;
