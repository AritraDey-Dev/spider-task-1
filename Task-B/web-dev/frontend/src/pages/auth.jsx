// Auth.jsx
import React from "react";
import Register from "../components/register";
import Login from "../components/login";

export default function Auth() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-screen-lg w-full
         bg-white rounded-lg overflow-hidden flex md:mx-auto">
            <div className="w-1/2 p-4">
                <Login />
            </div>
            <div className="w-1/2 p-4">
                <Register />
            </div>
        </div>
    </div>
    );
}