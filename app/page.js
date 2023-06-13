"use client";
import React from "react";
import { account } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import "./App.css";
import { useRouter } from "next/navigation";

function Home() {
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
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <img
                  className="h-16 w-auto"
                  src="logo.png"
                  alt="MindFulife Logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/board"
                    className="text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Board
                  </a>
                  <a
                    href="/meditate"
                    className="text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Meditate
                  </a>
                  <a
                    href="/journal"
                    className="text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Journal
                  </a>
                  {!userDetails && (
                    <>
                      <button
                        className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-3 rounded-md"
                        onClick={() => router.push("/login")}
                      >
                        Sign In
                      </button>
                    </>
                  )}
                  {!!userDetails && (
                    <button
                      className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-3 rounded-md "
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                Introducing
              </h2>
              <h3 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                MindFuLiFe
              </h3>
              <p className="mt-2 text-lg text-gray-500">
                With MindFulife, you'll have all the tools you need to take
                control of your mental and emotional well-being. Start your
                journey today and discover a happier, healthier you.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  {!userDetails && (
                    <button
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => router.push("/login")}
                    >
                      Get Started
                    </button>
                  )}
                </div>
                {!!userDetails && (
                <div className="ml-3 inline-flex">
                  <div
                    className="inline-flex items-center justify-center px-5 py-3 border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                   Welcome {userDetails?.name}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto lg:max-w-none">
              <div className="grid grid-cols-2 gap-8">
                <a
                  href="/journal"
                  className="block hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M9.05 9H7.06V6h1.99V4.03H7.06v-1c0-1.11.89-1.99 1.99-1.99h5.98V8l2.47-1.5L20 8V1.04h1c1.05 0 2 .96 2 1.99V17c0 1.03-.95 2-2 2H9.05c-1.05 0-1.99-.95-1.99-2v-1h1.99v-2H7.06v-3h1.99V9M1 18h2v-3H1v-2h2v-3H1V8h2V5h2v3H3v2h2v3H3v2h2v3H3v2h2v1h16v2H5a2 2 0 0 1-2-2v-1H1v-2Z"
                        />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Journal
                      </h4>
                      <div className="flex items-center ">
                        <p className="text-gray-600">
                          Discover the power of self-reflection and
                          self-expression through journaling our feature makes
                          it easy and effortless.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href="/meditate"
                  className="block hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 4c1.11 0 2 .89 2 2s-.89 2-2 2s-2-.89-2-2s.9-2 2-2m9 12v-2c-2.24 0-4.16-.96-5.6-2.68l-1.34-1.6A1.98 1.98 0 0 0 12.53 9H11.5c-.61 0-1.17.26-1.55.72l-1.34 1.6C7.16 13.04 5.24 14 3 14v2c2.77 0 5.19-1.17 7-3.25V15l-3.88 1.55c-.67.27-1.12.95-1.12 1.66C5 19.2 5.8 20 6.79 20H9v-.5a2.5 2.5 0 0 1 2.5-2.5h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.83 0-1.5.67-1.5 1.5v.5h7.21c.99 0 1.79-.8 1.79-1.79c0-.71-.45-1.39-1.12-1.66L14 15v-2.25c1.81 2.08 4.23 3.25 7 3.25Z"
                        />
                      </svg>
                    </div>

                    <div className="ml-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Meditate
                      </h4>
                      <div className="flex items-center ">
                        <p className="text-gray-600">
                          Our guided meditations will help you reduce stress,
                          improve focus, and increase feelings of calm and
                          relaxation
                        </p>
                        <div className="bg-blue-50  py-2 px-7 rounded-md flex">
                          <p className="font-medium">soon </p>
                          <p className="ml-2"> 👀</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href="/board"
                  className="block hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="4"
                        >
                          <path d="M8 7h32v24H8z" />
                          <path
                            strokeLinecap="round"
                            d="M4 7h40M15 41l9-10l9 10M16 13h16m-16 6h12m-12 6h6"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Mood Board
                      </h4>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-600">
                          Whether you want to share your latest insights on a
                          topic you're passionate about, reflect on a personal
                          experience, or simply connect with others
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href="/chat"
                  className="block hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center h-8 w-8 sm:h-12 sm:w-16 rounded-md bg-indigo-500 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995H5z"
                        />
                        <ellipse
                          cx="8.5"
                          cy="12"
                          fill="currentColor"
                          rx="1.5"
                          ry="2"
                        />
                        <ellipse
                          cx="15.5"
                          cy="12"
                          fill="currentColor"
                          rx="1.5"
                          ry="2"
                        />
                        <path fill="currentColor" d="M8 16h8v2H8z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        MindFuL Mentor
                      </h4>
                      <div className="flex items-center ">
                        <p className="text-gray-600">
                          Get guidance and support from our AI-based therapist
                          helping you navigate life's challenges with greater
                          ease and confidence.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
}

export default Home;
