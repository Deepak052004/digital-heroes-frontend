import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center text-center">

      <h1 className="text-5xl font-bold mb-6">
        Digital Heroes
      </h1>

      <p className="mb-8 text-gray-400 max-w-xl">
        Pick your numbers, test your luck, and win.
      </p>

      <div className="flex gap-6">
        <Link to="/login" className="bg-blue-500 px-6 py-3 rounded">
          Login
        </Link>

        <Link to="/register" className="bg-purple-500 px-6 py-3 rounded">
          Register
        </Link>
      </div>

    </div>
  );
};

export default Home;