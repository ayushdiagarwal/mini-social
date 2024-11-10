import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export function AllPosts() {
  
    const [posts, setPosts] = useState([]);
  
    useEffect(()=> {
      axios.get('/api/posts/').then((response) => {
        setPosts(response.data);
      }).catch((error) => {
        console.log(error);
      }, []);
  
    }, []);
  
    return (
      <>
        <p>POSTS: {posts.length}</p>
  
        {
          posts.map((post, index)=> {
            return(
                <div key={index} className="post">
                    <Link to={`/posts/${post._id}`}>title: {post.title}</Link>
                    <p>Post Id: {post._id}</p>
                    <p>body: {post.body}</p>
                    <p>likes: {post.likes}</p>
                    <p>Created by: {post.user}</p>
                </div>
            )
          })
        }
      </>
    );
  };

export default AllPosts;