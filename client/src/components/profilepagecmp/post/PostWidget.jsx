import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  AttachFileOutlined,
  ShareOutlined,
  SendOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FlexBetween from '../../widget/FlexBetween';
import WidgetWrapper from '../../widget/WidgetWrapper';
import Friend from './Friend';
import { Chip } from '@material-tailwind/react';
import axios from 'axios';

const fetchUser = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
const fetchPostComments = async (postId, token) => {
  try {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const PostWidget = ({
  postId,
  postUserId,
  description,
  location,
  picturePath,
  likes,
  comments,
  createdAt,
  topic,
  onCommentAdded,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState(''); // State for the input field
  const [commentsList, setCommentsList] = useState(comments || []); // State for comments
  const [commentUsers, setCommentUsers] = useState([]);
  const Localuser = sessionStorage.getItem('user');
  const loggedInUserId = JSON.parse(Localuser)._id;
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);
  const token = sessionStorage.getItem('token');
  const [componentKey, setComponentKey] = useState(0);
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    const fetchCommentUsers = async () => {
      const users = await Promise.all(
        comments.map(async (comment) => {
          const userData = await fetchUser(comment.userId, token);
          return userData;
        })
      );
      setCommentUsers(users);
    };

    fetchCommentUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, token]);

  const capitalizeEachWord = (text) => {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/posts/${postId}/comment`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // eslint-disable-next-line no-unused-vars
      const addedComment = response.data;

      // Fetch updated comments for the post after adding a comment
      const updatedComments = await fetchPostComments(postId, token);

      // Update the local state with the new comments
      setCommentsList(updatedComments);

      // Call the parent component's function to update its state
      onCommentAdded(updatedComments);

      // Clear the input field
      setComment('');

      // Increment the componentKey to trigger re-render
      setComponentKey(componentKey + 1);

      setForceRerender(!forceRerender);

      setIsComments(true);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${postUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patchLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      const updatedPost = await response.json();
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error('Error patching like:', error);
    }
  };

  return (
    <WidgetWrapper key={componentKey} m='2rem 0'>
      {user ? (
        <Friend
          friendId={postUserId}
          name={`${user.firstName} ${user.lastName}`} // Use user data directly
          subtitle={location}
          userPicturePath={user.profilePicture}
          creation={createdAt}
        />
      ) : (
        <p>Loading user...</p>
      )}

      <Chip
        style={{ marginTop: '1rem', width: 'fit-content' }}
        variant='outlined'
        color='lightBlue'
        value={capitalizeEachWord(topic)}
        className='rounded-md px-3 ml-2.5 border-dashed text-black   bg-[#48ffbf] '
      />
      <Typography
        color={'black'}
        sx={{ textTransform: 'capitalize', mt: '1rem', ml: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <>
          {picturePath.match(/\.(jpeg|jpg|png|gif)$/i) && ( // Image types
            <img
              width='100%'
              height='auto'
              alt='post'
              style={{
                borderRadius: '0.75rem',
                marginTop: '0.75rem',
                maxHeight: '400px',
                objectFit: 'cover',
              }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}

          {picturePath.match(/\.(mp4|mov|avi|mkv)$/i) && ( // Video types
            <video
              width='100%'
              controls
              style={{
                borderRadius: '0.75rem',
                marginTop: '0.75rem',
                maxHeight: '400px',
                objectFit: 'cover',
              }}>
              <source
                src={`http://localhost:3001/assets/${picturePath}`}
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          )}

          {picturePath.match(/\.(pdf|doc|docx|txt)$/i) && ( // Attachment types
            <a
              href={`http://localhost:3001/assets/${picturePath}`}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-36 border-dashed text-center border-2 border-gray-300 cursor-pointer font-medium  py-2 rounded-md text-sm text-gray-500 w-1/2 hover:bg-[#48ffbf] hover:text-black duration-300 ease-in-out  '
              style={{ display: 'block', marginTop: '2rem' }}>
              <AttachFileOutlined
                sx={{ color: 'grey' }}
                className='rotate-45 mr-4 justify-start '
              />
              View Attachment
            </a>
          )}
        </>
      )}

      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Box className='mt-2'>
        <input
          type='text'
          placeholder='Add a comment...'
          value={comment}
          onChange={handleInputChange}
          className='border-dashed border-black mt-5 text-black bg-slate-100 w-5/6 py-2 px-2 mr-2 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleAddComment}
          className=' rounded-md hover:text-[#489dff]  hover:duration-1000  py-1 px-2  focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <SendOutlined />
        </button>
      </Box>

      {isComments && (
        <Box mt='0.5rem'>
          {commentsList.map((comment, i) => (
            <Box key={`comment-${comment._id}`}>
              <Divider />
              <div className='flex bg-slate-100 rounded-md my-2 px-2 border-solid border-slate-400 border '>
                <Avatar
                  src={`http://localhost:3001/assets/${commentUsers[i]?.profilePicture}`}
                  sx={{
                    mt: '0.5rem',
                    mb: '0.5rem',
                    mr: '0.5rem',
                    width: '30px',
                    height: '30px',
                  }}
                />
                <Typography
                  sx={{
                    color: 'black',
                    mt: '0.7rem',
                    mb: '0.5rem',
                    mr: '0.5rem',
                    pl: '1rem',
                  }}>
                  {comment.content}
                </Typography>
              </div>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
