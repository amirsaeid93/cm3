import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-job">Add Job</Link>
        <Link to="/add-user">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

const API_URL = process.env.REACT_APP_BACKEND_URL; // Ensure this is set in Render

const fetchJobs = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the stored JWT token

    const response = await fetch(`${API_URL}/api/jobs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Attach token to request
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

// Call this function where needed, e.g., inside useEffect
useEffect(() => {
  fetchJobs();
}, []);



export default Navbar;