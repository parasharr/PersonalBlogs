"use client";

import Navbar from "./components/Navbar";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { Client, Databases } from "appwrite";


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("677421ac00001f35d16e");

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  
  useEffect(() => {
    document.title = "Home : Blogs by Pranjeet";
    const databases = new Databases(client);

    const fetchPosts = async () => {
      try {
        const response = await databases.listDocuments(
          "67742276002e9dce38fd",
          "6774229f000dabac44ed",
        );
        setBlogPosts(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#111827] rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <img className="w-full h-48 object-cover" src={post.image} alt={post.title} />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-blue-100">{post.title}</h2>
                  <p className="mt-2 text-gray-400">{post.metadesc}</p>
                  <div className="mt-4">
                    <Link href={`/blog/${post.slug}`} legacyBehavior>
                      <a className="text-blue-600 hover:text-blue-400">Read More...</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>

  );
}
