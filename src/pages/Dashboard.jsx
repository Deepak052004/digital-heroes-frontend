import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch scores
  const fetchScores = async () => {
    try {
      const res = await API.get("/scores");
      setScores(res.data.map((s) => s.score));
    } catch {
      alert("Error fetching scores");
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  // Toggle number selection
  const toggleNumber = (num) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      if (selected.length >= 5) {
        alert("You can only select 5 numbers");
        return;
      }
      setSelected([...selected, num]);
    }
  };

  // Submit numbers
  const submitNumbers = async () => {
    if (selected.length === 0) return;

    try {
      setLoading(true);

      for (let num of selected) {
        await API.post("/scores", {
          score: num,
          date: new Date(),
        });
      }

      setSelected([]);
      fetchScores();
    } catch {
      alert("Error adding numbers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8">

      {/* TITLE */}
      <h1 className="text-4xl font-semibold text-center mb-6">
        🎯 Pick Your Numbers
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Select up to 5 numbers between 1–45
      </p>

      {/* NUMBER GRID */}
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3 mb-10 justify-items-center">

        {[...Array(45)].map((_, i) => {
          const num = i + 1;
          const isSelected = selected.includes(num);

          return (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold 
              transform transition
              ${
                isSelected
                  ? "bg-blue-500 scale-110 shadow-lg"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* SELECTED NUMBERS */}
      <div className="mb-8 text-center">
        <p className="text-gray-400 mb-3">Selected Numbers</p>

        {selected.length === 0 ? (
          <p className="text-gray-500 text-sm">No numbers selected</p>
        ) : (
          <div className="flex justify-center gap-3 flex-wrap">
            {selected.map((n) => (
              <div
                key={n}
                className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center font-semibold"
              >
                {n}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="text-center mb-12">
        <button
          onClick={submitNumbers}
          disabled={selected.length === 0 || loading}
          className={`px-8 py-3 rounded-lg font-semibold
          ${
            selected.length === 0 || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:scale-105"
          }`}
        >
          {loading ? "Saving..." : "Save Numbers"}
        </button>
      </div>

      {/* HISTORY */}
      <h2 className="text-2xl mb-4">Your Previous Numbers</h2>

      {scores.length === 0 ? (
        <p className="text-gray-500">No previous numbers yet</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {scores.map((num, i) => (
            <div
              key={i}
              className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center font-semibold"
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;