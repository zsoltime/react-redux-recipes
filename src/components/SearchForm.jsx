import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ handleSubmit }) => {
  let search;

  const onSearch = (e) => {
    e.preventDefault();
    handleSubmit(search.value);
  };

  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="search"
        className="search-form__field"
        placeholder="Search by ingredients"
        ref={(node) => { search = node; }}
        required
      />
      <button
        type="submit"
        className="search-form__btn"
      >Search</button>
    </form>
  );
};

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
