// This will be the detailed post page
// will include everything about the post -> title, body, likes, user, date, comment
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { CommentView } from './components/CommentView';
import CreateComment from './components/CreateComment';



export function PostView() {
    const [post, setPost] = useState({}); 
    const { postId } = useParams(); // Gets `userId` from URL
    
    useEffect(() => {
        // Fetch post data from the backend API
        axios.get(`/api/posts/${postId}/`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, [postId]); 


    // get the post component from this postId
    return (
        <>
        <h3>hey this is the postview</h3>
        <p>This is the postId: {postId}</p>
        <p>title: {post.title}</p>
        <p>body: {post.body}</p>
        <p>Created by: {post.user}</p>
        <p></p>

        <CreateComment postId={postId} />
        < CommentView postId={postId}/>
        </>
    );
};

export default PostView;