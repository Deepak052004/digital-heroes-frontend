import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-white">

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Digital Heroes
        </h1>

        <p className="text-gray-300 max-w-2xl mb-8 text-lg">
          A smart number-draw system where you pick your numbers,
          test your luck, and compete to become the winner.
        </p>

        <div className="flex gap-6">
          <Link to="/login" className="bg-blue-500 px-8 py-3 rounded-lg hover:scale-105">
            Login
          </Link>

          <Link to="/register" className="bg-purple-500 px-8 py-3 rounded-lg hover:scale-105">
            Register
          </Link>
        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20 px-10 bg-black/40">
        <h2 className="text-4xl text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl mb-3">🎯 Pick Numbers</h3>
            <p className="text-gray-400">
              Choose up to 5 numbers between 1–45.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl mb-3">🎲 Random Draw</h3>
            <p className="text-gray-400">
              System generates winning numbers.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl mb-3">🏆 Win</h3>
            <p className="text-gray-400">
              Match 3+ numbers to win.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;