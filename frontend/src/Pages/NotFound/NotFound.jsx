import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <img
          src="/notFound.svg"
          alt="404 Not Found"
          className="w-64 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We can't seem to find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition duration-200"
        >
          Back to Home <HiOutlineArrowNarrowRight className="ml-2 text-xl" />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
