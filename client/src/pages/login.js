import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/api/user').then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/user/login', {
        username,
        password,
      });
  
      const { token, User } = response.data;
  
      const userId = User._id;
  
      alert('Login successful');
      setUsername('');
      setPassword('');
      fetchUsers();
      dispatch(authActions.login());
      navigate('/home');
    
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Login Error', error);
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-iceWhite">
      <div className="relative">
        <div className="bg-white p-8 rounded-md shadow-md w-96 relative overflow-hidden">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none ml-32"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className="absolute inset-0 border-1 border-gradient"></div>
      </div>
    </div>
  );
};

export default Login;
