import React from "react";

const Form = ({ username, setUsername, password, setPassword, name, onSubmit }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="yourgmail@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Password</h2>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="adcd@1234"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">
          {name}
        </button>
      </form>
    </div>
  );
};

export default Form;