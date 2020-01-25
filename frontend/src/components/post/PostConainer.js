import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import PostPresenter from './PostPresenter';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';

const PostContainer =  ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput('');
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const slide = useCallback(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  }, [currentItem, files]);
  useEffect(() => {
    slide();
  });
  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedState) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
  };
  const commentKeyPressHandler = async e => {
    const { which } = e;
    if (which === 13) {
      try {
        e.preventDefault();
        const text = comment.value;
        comment.setValue('');
        const { data: { addComment } } = await addCommentMutation({
          variables: {
            postId: id,
            text
          }
        });
        setSelfComments([...selfComments, addComment]);
      } catch {
        toast.error(`Can't send comment`);
      }
    }
  }

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      location={location}
      caption={caption}
      isLiked={isLikedState}
      comments={comments}
      selfComments={selfComments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      commentKeyPressHandler={commentKeyPressHandler}
    />
  );
}

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
      PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;