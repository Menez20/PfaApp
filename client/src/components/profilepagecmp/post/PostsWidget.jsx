import { useEffect, useState } from 'react';

import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const [posts, setPosts] = useState([]); // Change this to an array
  const token = sessionStorage.getItem('token');
  const [commentAdded, setCommentAdded] = useState(false);

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    setPosts(data); // Set the array of posts directly
  };

  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/feed`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    setPosts(data); // Set the array of posts directly
  };

  useEffect(
    () => {
      // if (isProfile) {
      //   getUserPosts();
      // } else {
      getPosts();
    },
    // }
    []
  );
  console.log('getUserPosts', posts);
  console.log('getFeed', posts);

  
  const handleCommentAdded = (postId, updatedComments) => {
    // Find the post in the posts array and update its comments
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, comments: updatedComments } : post
    );

    setPosts(updatedPosts);
    setCommentAdded(!commentAdded);
  };

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          content,
          topic,
          location,
          image,
          userPicturePath,
          likes,
          comments,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            description={content}
            location={location}
            picturePath={image}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
            topic={topic}
            onCommentAdded={(updatedComments) =>
              handleCommentAdded(_id, updatedComments)
            }
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
