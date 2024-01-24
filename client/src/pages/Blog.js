import React, { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ image, title, description, username, isUser, id }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/blogs/${id}`);
      const data = response.data;

      console.log('Blog deleted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

    if (confirmDelete) {
      try {
        const data = await deleteRequest();
        console.log('Handle delete success:', data);
        alert('Blog deleted successfully');
        navigate('/blogs');
      } catch (error) {
        console.error('Handle delete error:', error);
      }
    }
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded shadow-l hover:shadow-xl transition duration-300">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{title}</div>
        <div className={`text-gray-700 text-base ${expanded ? '' : 'overflow-hidden h-20'}`}>
          {description}
        </div>
        {!expanded && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            See More
          </button>
        )}
        <div className="mt-4">
          <span className="text-gray-500 text-sm">{username}</span>
        </div>
      </div>

      {isUser && (
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            <BsTrash size={20} />
          </button>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            <BsPencil size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
