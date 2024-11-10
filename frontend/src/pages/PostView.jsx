// This will be the detailed post page
// will include everything about the post -> title, body, likes, user, date, comment
import { useParams } from 'react-router-dom';

export function PostView() {
    console.log("hey");
    const { postId } = useParams(); // Gets `userId` from URL
    // get the post component from this postId
    return (
        <>
        <h3>hey this is the postview</h3>
        <p>This is the postId: {postId}</p>
        </>
    );
};

export default PostView;