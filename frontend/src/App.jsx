import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostView, Login, Home, Profile } from './pages';


function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login/>} />
            <Route path="/posts/:postId" element={<PostView />}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
