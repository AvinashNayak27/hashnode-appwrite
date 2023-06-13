"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { account, board } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

const initialPositions = (posts) => {
  const minRadius = 10;
  const maxRadius = 400;

  return posts.map((post, i) => {
    const radius = Math.random() * (maxRadius - minRadius) + 200;
    const angle = (i / posts.length) * 3 * Math.PI;
    let x = Math.max(Math.cos(angle) * radius + 300, 60);
    let y = Math.max(Math.sin(angle) * radius + 300, 60);
    for (let j = 0; j < i; j++) {
      if (x - posts[j].x < 100) {
        x += 100;
        break;
      }
    }
    for (let k = 0; k < i; k++) {
      if (y - posts[k].y < 100) {
        y -= 100;
        break;
      }
    }
    return { x, y };
  });
};

export default function Board() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [positionsX, setPositionsX] = useState([]);
  const [positionsY, setPositionsY] = useState([]);

  useEffect(() => {
    setLoader(true);
    const getPosts = board.listDocuments(
      "6481da603d9c884350a7",
      "6481da69aab60f54ac93"
    );

    getPosts.then(
      function (response) {
        console.log(response.documents);
        setPosts(response.documents);
        setPositionsX(
          initialPositions(response.documents).map((position) => position.x)
        );
        setPositionsY(
          initialPositions(response.documents).map((position) => position.y)
        );
      },
      function (error) {
        console.log(error);
      }
    );
    setLoader(false);
  }, []);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-blue-50");
    return () => {
      document.body.classList.remove("bg-blue-50");
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = board.createDocument(
      "6481da603d9c884350a7",
      "6481da69aab60f54ac93",
      uuidv4(),
      {
        text: newPost,
      }
    );
    console.log(promise);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
    e.target.reset();
    closeModal();
  };
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (response) {
        setUserDetails(response);
        console.log(userDetails);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const mappedPosts = posts.map((post, i) => (
    <div
      key={post.id}
      className="absolute rounded-full bg-blue-500 text-white text-center p-4 cursor-pointer transform hover:scale-110 transition duration-300 shadow-lg"
      style={{
        left: `${positionsX[i]}px`,
        top: `${positionsY[i]}px`,
      }}
    >
      <p className="font-serif text-lg">{post.text}</p>
    </div>
  ));

  return (
    <div className="relative h-screen bg-yellow">
      {userDetails ? (
        <>
          <div className="flex justify-between items-center p-4">
            <div className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center">
              <h3 className=" font-bold text-gray-800">
                Welcome {userDetails.name}
              </h3>
            </div>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 11.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 1h-8A1.5 1.5 0 0 0 0 2.5v9A1.5 1.5 0 0 0 1.5 13h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.354 8.354a.5.5 0 0 0-.708-.708L13 9.293V7.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1h-1.293l1.646-1.647a.5.5 0 0 0 0-.707z"
                />
              </svg>
              Go Home
            </button>
          </div>
          {mappedPosts}
          <button
            onClick={openModal}
            className="fixed bottom-8 right-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
            <span className="ml-2 text-lg font-semibold">write ...</span>
          </button>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Create Post"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "400px",
                height: "auto",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <form onSubmit={handleSubmit}>
              <label
                className="block font-serif font-bold text-lg mb-2 text-gray-700"
                htmlFor="content"
              >
                Post content
              </label>
              <textarea
                className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border border-yellow-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="content"
                value={newPost}
                onChange={handleInputChange}
                placeholder="Write your post here"
                style={{ height: "235px" }}
                rows="5"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 shadow-lg"
              >
                Cancel
              </button>
            </form>
          </Modal>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              You are not logged in
            </h1>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
