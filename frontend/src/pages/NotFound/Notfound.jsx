const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-500 hover:underline">Go back to Home</a>
    </div>
    </div>
  );
};

export default NotFound;
