import { useEffect, useState } from 'react';
import axios from 'axios';


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('/api/posts/', {
            title,
            body,
          })
          .then(function (response) {
            console.log(response);
            setContent("");
          })
          .catch(function (error) {
            console.log(error);
          });

          // now add the accesstoken got back to cookies using httpOnly cookie
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Add Title: </label>
                <input 
                    type='text' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <label>Add body: </label>
                <input 
                    type='text' 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required 
                />
                <button type="submit">Post</button>
            </form>

        </>
    );
};

export default CreatePost;