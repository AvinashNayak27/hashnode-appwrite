"use client";
import React, { useState, useEffect } from "react";
import { account, board } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Query } from "appwrite";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getData = account.get();

    getData.then(
      function (response) {
        setUserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (userDetails) {
      console.log(userDetails.$id);
      const getPosts = board.listDocuments(
        "6481da603d9c884350a7",
        "6488883e0efe3e6c0ed5",
        [Query.equal("userID", userDetails.$id)]
      );

      getPosts.then(
        function (response) {
          console.log(response.documents);
          setEntries(response.documents);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    setNewEntry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = board.createDocument(
      "6481da603d9c884350a7",
      "6488883e0efe3e6c0ed5",
      uuidv4(),
      {
        userID: userDetails?.$id,
        journal: newEntry,
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
    setNewEntry("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">My Journal</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded cursor-pointer mb-4 ml-12"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>

      <p className="mb-4 font-semibold">
        Welcome to your journal, {userDetails?.name}. Here you can write down
        your thoughts and feelings. This is a space for you to express yourself.
      </p>

      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2 w-full"
          placeholder="Write a new entry..."
          value={newEntry}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Add Entry
        </button>
      </div>

      <ul className="list-disc pl-6">
        {entries.map((entry, index) => (
          <li key={index} className="mb-2 font-serif font-medium">
            {entry.journal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
