import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';  

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/user/${id}`);
        const data = res.data;

        if (data && data.user && Array.isArray(data.user)) {
          return data.user;
        } else {
          console.error('Invalid response format:', data);
          return [];
        }
      } catch (err) {
        console.error('Error fetching user blogs:', err);
        return [];
      }
    };

    const fetchData = async () => {
      const data = await sendRequest();
      setBlogs(data);
    };

    fetchData();
  }, [id]);

  console.log(blogs);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs.map(blog => (
        <Blog
          key={blog._id}
          id={blog._id}  
          isUser={true}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.username}
        />
      ))}
    </div>
  );
};

export default UserBlogs;
