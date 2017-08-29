import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import RecipeCard from 'RecipeCard';
import defaultImage from '../../images/default.svg';

describe('<RecipeCard />', () => {
  it('should exist', () => {
    expect(RecipeCard).toExist();
  });

  const props = {
    handleFavClick: f => f,
    id: '53q2',
    isFavorite: false,
    publisher: 'Chow',
    publisherUrl: 'https://chow.com',
    sourceUrl: 'https://chow.com/link/to/recipe',
    thumbnail: 'https://chow.com/img.jpg',
    title: 'Yummy stuff',
  };

  describe('render', () => {
    it('should render a recipe card', () => {
      const card = shallow(<RecipeCard {...props} />);

      expect(card.find('.card').length).toBe(1);
    });

    it('should display the correct title', () => {
      const card = shallow(<RecipeCard {...props} />);
      const title = card.find('.card__title').text();

      expect(title).toBe(props.title);
    });

    it('should display the publisher name if available', () => {
      const card = shallow(<RecipeCard {...props} />);
      const publisher = card.find('.card__publisher a').text();

      expect(publisher).toBe(props.publisher);
    });

    it('should link to the publisher site if available', () => {
      const card = shallow(<RecipeCard {...props} />);
      const publisherUrl = card.find('.card__publisher a').prop('href');

      expect(publisherUrl).toBe(props.publisherUrl);
    });

    it('should display a default message if no publisher provided', () => {
      const card = shallow(
        <RecipeCard
          id={props.id}
          title={props.title}
          handleFavClick={f => f}
        />
      );
      const message = card.find('.card__publisher span').text();
      const defaultMessage = 'Recipe is from unknown source';

      expect(message).toBe(defaultMessage);
    });

    it('should display an image if available', () => {
      const card = shallow(<RecipeCard {...props} />);
      const image = card.find('.card__image img');

      expect(image.length).toBe(1);
      expect(image.prop('src')).toBe(props.thumbnail);
    });

    it('should display a default image if no image provided', () => {
      const card = shallow(
        <RecipeCard
          handleFavClick={f => f}
          id={props.id}
          title={props.title}
        />);
      const image = card.find('.card__image img');

      expect(image.length).toBe(1);
      expect(image.prop('src')).toBe(defaultImage);
    });

    it('should link the image and title to the recipe', () => {
      const card = shallow(<RecipeCard {...props} />);
      const imgLink = card.find('.card__image a');
      const titleLink = card.find('.card__title a');

      expect(imgLink.length).toBe(1);
      expect(imgLink.prop('href')).toBe(props.sourceUrl);

      expect(titleLink.length).toBe(1);
      expect(titleLink.prop('href')).toBe(props.sourceUrl);
    });
  });

  describe('handle click', () => {
    it('should handle click on the favourite button', () => {
      const spy = expect.createSpy();
      const card = shallow(
        <RecipeCard
          id={props.id}
          handleFavClick={spy}
          title={props.title}
        />);
      const submitBtn = card.find('.card__btn');

      expect(submitBtn.length).toBe(1);

      submitBtn.simulate('click');
      expect(spy).toHaveBeenCalledWith(props.id);
    });
  });
});
