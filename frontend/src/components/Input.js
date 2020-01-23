import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({ type="text", placeholder, required = false, value, onChange }) => <Container type={type} placeholder={placeholder} required={required} value={value} onChange={onChange}></Container>;

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;