import React from 'react';
import bgImage from '../assets/bg.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={bgImage}
          alt="Background"
          className="mt-6 w-80% h-80% ml-36"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-gradient-to-r from-sky-200 via-indigo-100 to-indigo-100/0 shadow-lg p-8 text-black font-medium text-center backdrop-blur-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to Memory Lane</h1>
          <p className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-lg mb-8">Discover interesting articles and stories</p>
          <Link to="/blogs">
            <button className="bg-sky-600 hover:bg-red-600 text-black font-bold py-2 px-4 rounded">
              Discover
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
