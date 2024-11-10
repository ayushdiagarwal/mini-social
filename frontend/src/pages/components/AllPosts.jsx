import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function AllPosts() {
  
  const [posts, setPosts] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  
  useEffect(() => {
    axios.get('/api/posts/')
      .then((response) => {
        setPosts(response.data)
        const initialLikes = {};
        response.data.forEach(post => {
          initialLikes[post._id] = post.likes;
        });
        setLikesMap(initialLikes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axios.patch(`/api/posts/${postId}/`);
      setLikesMap(prevLikes => ({
        ...prevLikes,
        [postId]: response.data.likes
      }));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  
  
    return (
      <>
        <p>POSTS: {posts.length}</p>
  
        {
          posts.map((post)=> {

            return(
                <div key={post._id} className="post">
                    <Link to={`/posts/${post._id}`}>title: {post.title}</Link>
                    <p>likes: {likesMap[post._id] || post.likes}</p>
                    <button onClick={() => handleLike(post._id)}>Like</button>
                </div>
            )
          })
        }
      </>
    );
  };

export default AllPosts;