import React from 'react';
import Helmet from "rl-react-helmet";
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../components/Loader';
import Post from '../components/post';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Instagram</title>
      </Helmet>
      { loading && <Loader /> }
      {
        !loading &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            caption={post.caption}
            location={post.location}
            createdAt={post.createdAt}
          />
        ))
      }
    </Wrapper>
  );
}