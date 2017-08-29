import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div
    className={`alert alert--${props.type}`}
    role={props.type === 'error' ? 'alert' : 'status'}
  >
    {props.children}
  </div>
);

Message.defaultProps = {
  type: 'info',
};

Message.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default Message;
