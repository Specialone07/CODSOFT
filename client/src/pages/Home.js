import React from 'react';
import bgImage from '../assets/bg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="bg-gradient-to-r from-sky-200 via-indigo-100 to-indigo-100/0 shadow-lg p-8 text-black font-medium text-center backdrop-blur-md rounded-lg ml-24">
            <div className="mt-5 max-w-2xl">
              <h2 className="block font-semibold text-black-800 text-2xl md:text-2xl lg:text-4xl text-center dark:text-gray-200">
                Welcome to <span className="text-purple-600">Memory</span> <br/>Lane
              </h2>
            </div>
            <div className="mt-8 gap-3 flex flex-col items-center">
              <Link to="/blogs" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-200 text-black hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
