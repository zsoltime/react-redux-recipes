import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Message from 'Message';

describe('<Message />', () => {
  it('should exist', () => {
    expect(Message).toExist();
  });

  describe('render', () => {
    it('should render a message with the correct role and class names', () => {
      const infoMessage = shallow(<Message type="info" />).find('.alert');
      const successMessage = shallow(<Message type="success" />).find('.alert');
      const warningMessage = shallow(<Message type="warning" />).find('.alert');
      const errorMessage = shallow(<Message type="error" />).find('.alert');

      expect(infoMessage.hasClass('alert--info')).toBe(true);
      expect(infoMessage.prop('role')).toBe('status');
      expect(successMessage.hasClass('alert--success')).toBe(true);
      expect(successMessage.prop('role')).toBe('status');
      expect(warningMessage.hasClass('alert--warning')).toBe(true);
      expect(warningMessage.prop('role')).toBe('status');
      expect(errorMessage.hasClass('alert--error')).toBe(true);
      expect(errorMessage.prop('role')).toBe('alert');
    });

    it('should render an "info" message if there is no type prop', () => {
      const message = shallow(<Message />).find('.alert');

      expect(message.hasClass('alert--info')).toBe(true);
      expect(message.prop('role')).toBe('status');
    });

    it('should render children elements', () => {
      const expectedChild = (
        <p>This is only a test. I repeat, this is only a test.</p>
      );
      const message = shallow(
        <Message>{expectedChild}</Message>
      ).find('.alert');
      const children = message.children();
      const actualChild = message.childAt(0);

      expect(children.length).toBe(1);
      expect(actualChild.type()).toBe('p');
      expect(actualChild.text()).toBe('This is only a test. I repeat, this is only a test.');
    });
  });
});
