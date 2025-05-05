import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('bg-gradient-to-br', 'from-purple-900', 'to-indigo-900', 'min-h-screen');
    return () => {
      document.body.classList.remove('bg-gradient-to-br', 'from-purple-900', 'to-indigo-900', 'min-h-screen');
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_BACKEND}/login`, {
        email,
        pass: password,
      });

      if (response.data.message === 'User does not exist') {
        setError('Email does not exist');
      } else if (response.data.message === 'Email not verified') {
        setError('Verification link sent to your email');
      } else if(response.data.message === "Wrong password")
        {
          setError('Wrong Password');
        }else if (response.data.message === 'Login successful') {
        navigate(`/users/${response.data.userId}`);
      }
    } catch (error) {
      setError('An error occurred during login.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-12">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                Welcome Back
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4"> {/* Added space-y-4 for gap */}
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    {/* Error message displayed directly below the password input */}
              </div>
          </div>

             
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isLoading
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className={`h-5 w-5 text-indigo-500 group-hover:text-indigo-400 ${
                        isLoading ? 'animate-spin' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {isLoading ? 'Logging in...' : 'Sign in'}
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 text-center text-sm text-red-600 bg-red-100 border border-red-400 rounded p-2">
                {error}
              </div>
            )}
            <p className="mt-4 text-center text-sm text-gray-600">
              
                Don't have account?<a href='/signup'>Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
