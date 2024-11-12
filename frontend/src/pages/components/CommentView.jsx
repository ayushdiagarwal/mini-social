import axios from 'axios';
import { useEffect, useState } from 'react';

export function CommentView({postId}) {
  
  const [comments, setComments] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${postId}`);
        setComments(response.data);
        console.log(response.data);
        const initialLikes = {};
        response.data.forEach(comment => {
          initialLikes[comment._id] = comment.likes;
        });
        setLikesMap(initialLikes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
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
        <p>Comments: {comments.length}</p>
        <p>{postId}</p>
  
        {
          comments.map((comment)=> {

            return(
                <div key={comment._id} className="comment">
                    <p>body: {comment.content} </p>
                    <p>likes: {likesMap[comment._id] || comment.likes}</p>
                    <button onClick={() => handleLike(comment._id)}>Like</button>
                </div>
            )
          })
        }
      </>
    );
  };

export default CommentView;