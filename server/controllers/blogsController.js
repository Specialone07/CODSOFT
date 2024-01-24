const mongoose=require('mongoose')
const Blog = require('../model/blogSchema');
const User = require ('../model/userSchema');

const allBlogs = async (req, res, next) => {
    let blogs;
  
    try {
      // Populate the user field with only the username field
      blogs = await Blog.find().populate('user', 'username');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
  
    return res.status(200).json({ blogs });
};
  const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;

    // Checking if the user exists in our database or not
    try {
        existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid User' });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message || 'Internal Server Error' });
    }

    const blog = new Blog({ title, description, image, user });

    try {
      // Save the blog and populate the user field to get user details
      await blog.save();
      const savedBlog = await Blog.findById(blog._id).populate('user', 'username');
      return res.status(201).json({ blog: savedBlog });
    } catch (err) {
      return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  };
const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description },
        );
    } catch (err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" });
    }

    res.status(200).json({blog}); // Respond with the updated blog
};
const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findOneAndDelete({ _id: id }).populate('user');

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.user) {
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    return res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userBlogs = await Blog.find({ user: userId });
    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ message: 'No User Found or No Blogs for the User' });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
// const addComment = async (req, res, next) => {
//   const { content } = req.body;
//   const { id } = req.params;
//   const userId = req.user.id;
//   try {
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     const newComment = {
//       content,
//       user: userId,
//     };

   
//     blog.comments.push(newComment);

//     await blog.save();

//     return res.status(201).json({ blog });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// const getComments = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     const comments = blog.comments || [];

//     return res.status(200).json({ comments });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



module.exports={  allBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId,  };