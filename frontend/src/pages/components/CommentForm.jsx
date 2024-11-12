import { useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom'; 
import axios from 'axios';


const Login = () => {
    const [comment, setComment] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('/api/posts/:id/', {
            email: email,
            password: password,
          })
          .then(function (response) {
            console.log(response);
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <label>Password: </label>
                <input 
                    type='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit">Login</button>
            </form>

        </>
    );
};

export default Login;