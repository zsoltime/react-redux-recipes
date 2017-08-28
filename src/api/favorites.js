const key = 'rrrFavorites';

const FavoriteStorage = {
  get() {
    const strRecipes = localStorage.getItem(key);
    let recipes;

    try {
      recipes = JSON.parse(strRecipes);
    } catch (e) {
      console.error(e.message);
    }

    return Array.isArray(recipes) ? recipes : [];
  },
  set(newRecipes) {
    if (Array.isArray(newRecipes)) {
      localStorage.setItem(key, JSON.stringify(newRecipes));
      return newRecipes;
    }
    return undefined;
  },
  wipe() {
    localStorage.removeItem(key);
  },
};

export default FavoriteStorage;
