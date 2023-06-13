'use client';
import React from 'react'
import { account } from '@/lib/appwrite';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

function Profile() {
  const [userDetails, setUserDetails] = useState();
  const router = useRouter();
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
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center p-4">
    <div className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center">
      <h3 className=" font-bold text-green-800">
        Welcome {userDetails?.name}
      </h3>
    </div>
    <button
      onClick={handleLogout}
      className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
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
      Logout
    </button>
      <button
        onClick={() => router.push("/")}
        className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        Home
      </button>
      <button
        onClick={() => router.push("/chat")}
        className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        Chat
      </button>
      <button
        onClick={() => router.push("/board")}
        className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        Board
      </button>

      </div>
    
  )
}

export default Profile