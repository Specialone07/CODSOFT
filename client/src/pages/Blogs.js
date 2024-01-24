import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/blogs');
      const data = res.data;
      console.log('Received data:', data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      console.log('Blog deleted successfully!');
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest();
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      {filteredBlogs.map((blog) => (
        <Link key={blog._id} to={`/blogs/${blog._id}`}>
          <Blog
            id={blog._id}
            isUser={localStorage.getItem('userId') === blog.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username || 'Unknown User'}
            handleDelete={() => handleDelete(blog._id)}
          />
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
