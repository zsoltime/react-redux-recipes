import React from 'react';

import SearchForm from 'SearchForm';

const HomePage = () => (
  <div className="page">
    <h1 className="page__title">React Recipe Finder</h1>
    <SearchForm handleSubmit={(f) => { console.log(f); }} />
  </div>
);

export default HomePage;
