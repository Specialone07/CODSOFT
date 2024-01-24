import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        const data = res.data;

        if (data && data.blog) {
          setBlog(data.blog);
        } else {
          console.log('Data or blog not available');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold  text-center ">{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="mt-6 w-full h-auto" />
      <p className="text-gray-700 mt-2">{blog.description}</p>
    </div>
  );
};

export default SingleBlog;
