import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Signup from "./pages/Signup";
import Login from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path="/add-user" element={<Signup />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/jobs/:id" element={<JobPage />} />
            <Route path="/edit-job/:id" element={<EditJobPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;