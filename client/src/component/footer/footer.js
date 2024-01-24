import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import logo from "./logo.png";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto flex justify-center items-center flex-col py-10">
        <div className="text-[#959EAD] text-sm mt-3 space-y-2 text-center">
          {/* ... your list items ... */}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-primary text-white p-2 rounded-full">
            <AiFillHeart className="w-5 h-auto" />
          </div>
          <img src={logo} alt="logo" className="invert h-8 w-auto" />
          <p className="text-sm text-dark-light text-center mt-2">
            Build a modern and creative Blog with Memory Lane.
          </p>
          <ul className="flex justify-center items-center mt-3 space-x-3 text-gray-300">
            <li><a href="/"><AiOutlineTwitter className="w-5 h-auto" /></a></li>
            <li><a href="/"><AiFillYoutube className="w-5 h-auto" /></a></li>
            <li><a href="/"><AiFillInstagram className="w-5 h-auto" /></a></li>
            <li><a href="/"><FaFacebook className="w-5 h-auto" /></a></li>
            <li><a href="/"><BsTelegram className="w-5 h-auto" /></a></li>
          </ul>
          <p className="font-semi-bold text-dark-light">
            Copyright © 2023. Memory Lane.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
