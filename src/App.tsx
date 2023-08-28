import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AddPost from "./pages/AddPost/AddPost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
