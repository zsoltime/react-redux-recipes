import React from 'react';
import PropTypes from 'prop-types';

import defaultImage from '../images/default.svg';

const RecipeCard = props => (
  <div className="card">
    <div className="card__image">
      <a
        href={props.sourceUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={props.thumbnail} alt="" />
      </a>
    </div>
    <h2 className="card__title">
      <a
        href={props.sourceUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.title}
      </a>
    </h2>
    <div className="card__publisher">
      {props.publisher ? (
        <span>Recipe is from <a
          href={props.publisherUrl}
          rel="noopener noreferrer"
          target="_blank"
        >{props.publisher}</a></span>
      ) : (
        <span>Recipe is from unknown source</span>
      )}
    </div>
    <div className="card__actions">
      <button
        className="card__btn"
        onClick={() => props.handleClick(props.id)}
        aria-label="Add to favourites"
        aria-pressed={props.isFavorite}
      >
        {props.isFavorite
          ? <span aria-hidden>&#9733;</span>
          : <span aria-hidden>&#9734;</span>
        }
      </button>
    </div>
  </div>
);

RecipeCard.defaultProps = {
  isFavorite: false,
  publisher: '',
  publisherUrl: '',
  thumbnail: defaultImage,
};

RecipeCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  publisher: PropTypes.string,
  publisherUrl: PropTypes.string,
  sourceUrl: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
