import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getSize = size => {
  let number;

  if (size === 'sm') {
    number = 30;
  } else if (size === 'md') {
    number = 50;
  } else if (size === 'lg') {
    number = 100;
  }

  return `
    width: ${number}px;
    height: ${number}px;
  `;
}

const Container = styled.div`
  ${props => getSize(props.size)}
  background-color: ${props => props.theme.bgColor};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = 'sm', url, className }) => <Container size={size} url={url} className={className} />;

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string
}

export default Avatar;