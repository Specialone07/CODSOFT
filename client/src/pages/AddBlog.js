import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImageURL] = useState('');

  const sendRequest = async () => {
    try {
      const user = localStorage.getItem('userId');

      if (!user) {
        console.error('User not found in localStorage. Unable to post blog.');
        return;
      }

    
      const res = await axios.post('http://localhost:4000/api/blogs/add', {
        title: title,
        description: description,
        image: image,
        user: user,
      });

      const data = res.data;
      console.log('Blog posted successfully:', data);

      // Reset the form fields after successful submission
      setTitle('');
      setDescription('');
      setImageURL('');

      // Navigate to the blogs page
      navigate('/blogs');
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Post a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImageURL(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 focus:outline-none"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;