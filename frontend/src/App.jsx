import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostView from './pages/PostView';
import Login from "./pages/Login";
import Home from './pages/Home';

function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login/>} />
            <Route path="/posts/:postId" element={<PostView />}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;
