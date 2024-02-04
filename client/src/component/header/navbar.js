import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import logo from './logo.png';
import { authActions } from '../../store/';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
    navigate('/login');
  };

  

  return (
    <nav className="bg-stone-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/'>
            <img src={logo} alt="" className="h-10 md:h-14 w-auto" />
          </Link>
        </div>

       

        <div className="flex items-center">
          <div className="md:hidden ml-2 p-2 focus:outline-none">
            <HiOutlineUserCircle className="w-6 h-6" />
          </div>

          <div className={`md:flex items-center space-x-4 md:space-x-5`}>
            {isLoggedIn ? (
              <>
                <Link to="/myblogs" className="text-black hover:text-red-500">
                  My Blogs
                </Link>
                <Link to="/blogs" className="text-black hover:text-red-500">
                  Blogs
                </Link>
                <Link to="/blogs/add" className="text-black hover:text-red-500">
                  Add Blogs
                </Link>
                <button onClick={handleSignOut} className="text-black hover:text-red-500">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-black hover:text-red-500">
                  <HiOutlineUserCircle className="mr-2 size-6" />
                </Link>
                <Link to="/signup" className="text-black hover:text-red-500">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
