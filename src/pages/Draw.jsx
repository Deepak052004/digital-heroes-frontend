import { useState } from "react";
import API from "../services/api";

const Draw = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDraw = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await API.post("/draw/run");

      // suspense delay
      setTimeout(() => {
        setResult(res.data);
        setLoading(false);
      }, 2000);
    } catch {
      alert("Error running draw");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-center">

      {/* TITLE */}
      <h1 className="text-4xl font-semibold mb-8">
        🎲 Lottery Draw
      </h1>

      <p className="text-gray-400 mb-8">
        Click below to generate winning numbers
      </p>

      {/* BUTTON */}
      <button
        onClick={runDraw}
        disabled={loading}
        className={`px-10 py-4 rounded-lg text-lg font-semibold transition
        ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-purple-500 hover:scale-105 hover:bg-purple-600"
        }`}
      >
        {loading ? "Drawing..." : "Run Draw"}
      </button>

      {/* LOADING UI */}
      {loading && (
        <div className="mt-12 flex flex-col items-center gap-6">

          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Placeholder balls */}
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-gray-700 animate-pulse"
              ></div>
            ))}
          </div>

        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-12">

          {/* DRAW NUMBERS */}
          <h2 className="text-xl mb-4 text-gray-400">
            Drawn Numbers
          </h2>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">

            {result.drawNumbers.map((n, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold shadow-lg"
                style={{
                  animation: "fadeInUp 0.4s ease forwards",
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0,
                }}
              >
                {n}
              </div>
            ))}

          </div>

          {/* WINNERS */}
          <h2 className="text-xl mb-4 text-gray-400">
            Winners
          </h2>

          {result.winners.length === 0 ? (
            <p className="text-red-400 text-lg animate-pulse">
              No winners this time 😢
            </p>
          ) : (
            <div className="space-y-4">

              {result.winners.map((w, i) => (
                <div
                  key={i}
                  className="bg-green-500/10 border border-green-500 p-5 rounded-xl shadow-md"
                >
                  <p className="text-lg font-semibold">
                    🏆 Winner #{i + 1}
                  </p>

                  <p className="text-gray-300 mt-1">
                    User ID: {w.user}
                  </p>

                  <p className="text-green-400 mt-2">
                    Matches: {w.matches}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Draw;