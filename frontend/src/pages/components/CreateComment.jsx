import { useEffect, useState } from 'react';
import axios from 'axios';


const CreateComment = ({postId}) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(content);
        axios.post(`/api/comments/${postId}`, {
            postId,
            content,
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
                <label>Add Comment: </label>
                <input 
                    type='text' 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required 
                />
                <button type="submit">Post</button>
            </form>

        </>
    );
};

export default CreateComment;