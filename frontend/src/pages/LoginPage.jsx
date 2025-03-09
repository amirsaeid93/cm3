import useField from '../hooks/useField';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for styling

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = useField('text');
  const password = useField('password');
  const { login, isLoading, error } = useLogin('/api/users/login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ username: username.value, password: password.value });
    if (result) {
      alert('Login successful!');
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Username:</label>
        <input {...username} placeholder="Username" />
        <label>Password:</label>
        <input {...password} placeholder="Password" type="password" />
        <button type="submit" disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;