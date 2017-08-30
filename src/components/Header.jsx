import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <h1 className="page__title">
    <NavLink to="/">React Recipe Finder</NavLink>
  </h1>
);

export default Header;
