import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../components/FatText';

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading }) => {
  return (
    <Wrapper>
      {searchTerm === '' && <FatText text={'Search for something'} />}
    </Wrapper>
  )
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
}

export default SearchPresenter;