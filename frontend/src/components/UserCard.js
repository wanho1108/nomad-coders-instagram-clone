import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avartar from './Avatar';
import FatText from './FatText';
import Button from './Button';

const Card = styled.div``;

const UserCard = ({ username, isFollowing, url, isSelf }) => {
  return (
    <Card>
      <Avartar url={url} />
      <FatText text={username} />
      {!isSelf && <Button text={isFollowing ? 'Unfollow' : 'Follow'} />}
    </Card>
  );
};


UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;