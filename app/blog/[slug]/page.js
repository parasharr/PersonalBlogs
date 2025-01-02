"use client";

// pages/blog/[slug].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/app/components/Navbar";
import { Client, Databases, Query } from "appwrite";
import { useParams } from "next/navigation";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("677421ac00001f35d16e");

const Blog = ({ params: { params } }) => {
  const [blogPost, setBlogPosts] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [dateTime, setDateTime] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    document.title = "Blog : Blogs by Pranjeet";
    const fetchData = async () => {
      try {
        const databases = new Databases(client);
        const response = await databases.listDocuments(
          "67742276002e9dce38fd",
          "6774229f000dabac44ed",

          [Query.equal("slug", slug)]
        );
        setBlogPosts(response.documents[0]); // Assuming 'documents' contains one item
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    // Load comments from localStorage

    const storedComments = localStorage.getItem(`comments-${slug}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
    // Load or set the post date and time
    const storedDateTime = localStorage.getItem(`datetime-${slug}`);
    if (storedDateTime) {
      setDateTime(storedDateTime);
    } else {
      const now = new Date();
      const nowString = now.toLocaleString();
      setDateTime(nowString);
      localStorage.setItem(`datetime-${slug}`, nowString);
    }
  }, [slug]);

  useEffect(() => {
    if (blogPost) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [blogPost]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") return;
    // Do not add empty comments
    const now = new Date();
    const newComment = {
      text: comment,
      timestamp: now.toLocaleString(),
    };
    const newComments = [...comments, newComment];
    setComments(newComments);
    setComment("");
    localStorage.setItem(`comments-${slug}`, JSON.stringify(newComments));
  };

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img
            src="\Animation - 1735616653132.gif"
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
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-1">{blogPost.title}</h1>
        <p className="text-zinc-500 mb-4">by @pranjeet</p>
        <img
          src={blogPost.image}
          alt="Blog Image"
          className="w-full h-auto mb-4 rounded-md"
        />
        <p className="text-gray-600 mb-4">{dateTime}</p>
        <p
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: blogPost.intro }}
        ></p>

        <h2 className="text-2xl font-bold mb-1">Language :</h2>
        <p className="text-zinc-500 mb-4">
          The primary languages and technologies I used for this project include
        </p>
        <p
          className="text-lg mb-4"
          dangerouslySetInnerHTML={{ __html: blogPost.lang }}
        ></p>

        <h2 className="text-2xl font-bold mb-1">Functionality :</h2>
        <p className="text-zinc-500 mb-4">
          My e-commerce website includes several key functionalities
        </p>
        <p
          className="text-lg mb-10"
          dangerouslySetInnerHTML={{ __html: blogPost.func }}
        ></p>

        <h2 className="text-2xl font-bold mb-1">Errors :</h2>
        <p className="text-zinc-500 mb-4">
          Potential Errors During Project Creation
        </p>
        <p
          className="text-lg mb-10"
          dangerouslySetInnerHTML={{ __html: blogPost.problems }}
        ></p>

        <h2 className="text-2xl font-bold mb-1">Solutions :</h2>
        <p className="text-zinc-500 mb-4">
          Their Solutions During Project Creation
        </p>
        <p
          className="text-lg mb-10"
          dangerouslySetInnerHTML={{ __html: blogPost.solution }}
        ></p>

        <h2 className="text-2xl font-bold mb-1">Project Links :</h2>
        <p className="text-zinc-500 mb-4">
          GitHub link and Live preview of Project{" "}
        </p>
        <p className="text-lg mb-2">
          GitHub :{" "}
          <a
            href="https://github.com/parasharr/E-commerce-clothe-website"
            target="_blank"
            className="text-blue-500 underline"
          >
            Visit Repository
          </a>
        </p>

        <p className="text-lg mb-10">
          Live Demo :{" "}
          <a
            href="https://fashion-adda-site.netlify.app/"
            target="_blank"
            className="text-blue-500 underline"
          >
            Fashion Adda
          </a>
        </p>

        <h2 className="text-2xl font-bold mb-2">Conclusion:</h2>
        <p
          className="text-lg mb-8"
          dangerouslySetInnerHTML={{ __html: blogPost.conc }}
        ></p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <hr className="my-8 border-black" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full p-2 border border-gray-300 rounded mb-2 bg-white"
              rows="4"
              placeholder="Write your comment here..."
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>
          <ul>
            {comments.map((cmt, index) => (
              <li key={index} className="border-b border-gray-300 py-2">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">{cmt.text}</p>
                  <span className="text-gray-500 text-sm">{cmt.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Blog;
