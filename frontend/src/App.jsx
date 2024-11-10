import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
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
                <p>title: {post.title}</p>
                <p>body: {post.body}</p>
                <p>likes: {post.likes}</p>
                <p>Created by: {post.user}</p>
            </div>
          )
        })
      }
    </>
  )
}

export default App;
