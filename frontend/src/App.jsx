import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([])
  const [chuckjoke, setChuckJoke] = useState("");

  useEffect(()=> {
    axios.get('/api/jokes').then((response) => {
      setJokes(response.data);
    }).catch((error) => {
      console.log(error);
    }, []);

    fetchNewChuck();
  }, []);

    const fetchNewChuck = () => {
      axios.get('https://api.chucknorris.io/jokes/random').then((response) => {
        setChuckJoke(response.data.value);
      }).catch((error) => {
        console.log(error);
      });
    };



  return (
    <>
      <h2>Hallo</h2>
      <p>{chuckjoke}</p>
      <button onClick={fetchNewChuck}>Get New</button>

      <p>JOKES: {jokes.length}</p>

      {
        jokes.map((joke, index)=> {
          return(
            <div key={joke.id}>
                <p>{joke.content}</p>
            </div>
          )
        })
      }
    </>
  )
}

export default App
