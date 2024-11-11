import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPosts from './pages/components/AllPosts';
import PostView from './pages/PostView';
import Login from "./pages/Login";

function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<AllPosts />} /> 
            <Route path="/login" element={<Login/>} />
            <Route path="/posts/:postId" element={<PostView />}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;
