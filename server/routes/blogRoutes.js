const express = require('express');
const blogsController = require('../controllers/blogsController');
const { allBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } = blogsController;

const blogRouter = express.Router();

blogRouter.get('/', allBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.get('/:id', getById);
blogRouter.delete('/:id', deleteBlog);
blogRouter.get('/user/:id', blogsController.getByUserId);
// blogRouter.post('/:id/comments', addComment); 
// blogRouter.get('/:id/comments', getComments); 

module.exports = blogRouter;
