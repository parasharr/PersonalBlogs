"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img
            src="/Animation - 1735616653132.gif"
            alt="Loading..."
            className="w-full h-16 mx-auto mb-4"
          />
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
      <div className="p-8 font-sans bg-gray-50">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">About Me</h1>
        </header>
        <section className="space-y-6 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            Hello! I'm Pranjeet Goswami, a passionate MERN Developer, and tech
            enthusiast. Welcome to my personal blog, where I share my journey
            through the world of technology, coding, and project development. My
            goal is to create a space where I can document my experiences, share
            my knowledge, and connect with like-minded individuals.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From a young age, I was captivated by the endless possibilities that
            technology offers. This fascination led me to pursue a career in
            tech, where I've had the opportunity to work on a variety of
            exciting projects. Through this blog, I aim to provide insights into
            these projects, discuss the challenges I faced, the solutions I
            implemented, and the key learnings I gained along the way.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            On this blog, you'll find:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>
              <strong>Project Blogs:</strong> In-depth write-ups on the projects
              I've worked on, including detailed breakdowns of the development
              process, the technologies used, and the outcomes achieved.
            </li>
            <li>
              <strong>Tech Blogs:</strong> Articles covering a wide range of
              topics in technology, including the latest trends, coding
              tutorials, tool reviews, and more.
            </li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed">
            I believe that sharing knowledge is one of the best ways to learn
            and grow. By documenting my experiences and thoughts, I hope to
            inspire and assist others who are on a similar path. Whether you're
            a seasoned developer or just starting out, I believe you'll find
            something of value here.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Outside of tech, I enjoy Playing Games, Watching Anime, Cooking and
            Love to travel. These interests keep me grounded and provide a
            well-rounded perspective on life.
          </p>

          <h1 className="text-lg text-gray-700 font-bold space-y-2">Reach Me Out :</h1>
          <ul className=" list-inside text-lg text-gray-700 space-y-2">
            <li>
              <strong>E-mail : </strong><a className="text-blue-500 hover:underline" href="mailto:your-email@example.com">Click Here</a>
            </li>
            <li>
              <strong>LinkedIn :</strong><Link legacyBehavior href="https://www.linkedin.com/in/pranjeetgoswami/?originalSubdomain=in"><a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Let's Get Connected</a></Link>
            </li>
            <li>
              <strong>Github :</strong><Link legacyBehavior href="https://github.com/parasharr"><a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Follow Me Here</a></Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default About;
