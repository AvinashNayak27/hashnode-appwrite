'use client'
import React, { useState } from 'react'
import { account } from '@/lib/appwrite'
import { ID } from 'appwrite'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [error, setError] = useState(null) 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  //Signup 
  const signupUser = async (e) => {
    e.preventDefault()

    const promise = account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    promise.then(
      function (response) {
        console.log(response);
        router.push("/") //success
      },
      function (error) {
        console.log(error); // Failure
        setError(error.message)
      }
    )


  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center text-3xl font-bold underline">Sign up</div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-black">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        name: e.target.value
                      })
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        email: e.target.value
                      })
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        password: e.target.value
                      })
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={signupUser}
                >
                  Sign up
                </button>
              </div>

              {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
              <div className="text-sm">
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account? Login
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}