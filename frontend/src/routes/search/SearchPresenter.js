import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../components/FatText';
import Loader from '../../components/Loader';
import UserCard from '../../components/UserCard';

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div``;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === '') {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            data.searchUser.map(user => {
              return (
                <UserCard
                  username={user.username}
                  isFollowing={user.isFollowing}
                  url={user.url}
                  isSelf={user.isSelf}
                />
              );
            })
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map(post => null)
          )}
        </Section>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
}

export default SearchPresenter;