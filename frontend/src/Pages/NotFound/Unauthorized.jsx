const Unauthorized = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
      {/* Icon (using Heroicons) */}
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Unauthorized Access
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        You don't have permission to view this page. Please contact your
        administrator if you believe this is an error.
      </p>

      {/* Optional: Home Link */}
      <a
        href="/"
        className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        Return to Homepage
      </a>
    </div>
  </div>
);

export default Unauthorized;
