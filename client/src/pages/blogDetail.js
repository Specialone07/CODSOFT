import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [editStatus, setEditStatus] = useState(null); 

  const { title, description } = inputs;
  const id = useParams().id;

  const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
      const data = res.data;

      if (data && data.blog) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          title: data.blog.title,
          description: data.blog.description,
        }));
      } else {
        console.log('Data or blog not available');
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/blogs/update/${id}`, {
        title,
        description,
        
      });

      setEditStatus('Blog updated successfully!'); 
      setTimeout(() => setEditStatus(null), 3000); 

      // Reset the form
      setInputs({
        title: '',
        description: '',
      });
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {editStatus && <div className="text-green-500 mb-4">{editStatus}</div>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setInputs((prevInputs) => ({ ...prevInputs, title: e.target.value }))}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) =>
            setInputs((prevInputs) => ({ ...prevInputs, description: e.target.value }))
          }
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 focus:outline-none"
      >
        Post Blog
      </button>
    </form>
  );
};

export default BlogDetail;
