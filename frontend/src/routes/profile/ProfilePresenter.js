import React from 'react';
import styled from 'styled-components';
import Helmet from 'rl-react-helmet';
import Loader from '../../components/Loader';
import Avatar from '../../components/Avatar';
import FatText from '../../components/FatText';
import FollowButton from '../../components/followButton/';
import SquarePost from '../../components/SquarePost';

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  display: block;
  font-size: 26px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0;
`;

const Count = styled.li`
  font-size: 16px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0;
`;

const Posts = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;

    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Instagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{' '}
              {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => {
              return (
                <SquarePost
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0].url}
                />
              )
            })}
          </Posts>
      </Wrapper>
    );
  }

  return null;
};