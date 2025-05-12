import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  "Do you spend a lot of time thinking about games or planning your next session?",
  "Do you feel restless, irritable, or sad when you can’t play?",
  "Do you try to play games secretly or lie about your gaming time?",
  "Do you lose interest in hobbies or activities because of gaming?",
  "Do you risk relationships or studies/work because of gaming?",
  "Do you play games to escape negative feelings?",
  "Have you unsuccessfully tried to control or cut back your gaming?"
];

const options = [
  { label: "Very Often", value: 4 },
  { label: "Often", value: 3 },
  { label: "Sometimes", value: 2 },
  { label: "Rarely", value: 1 },
  { label: "Never", value: 0 },
];

export default function QuestionForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [answers, setAnswers] = useState(Array(7).fill(""));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = Number(value);
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !age) {
      alert("Please enter your name and age.");
      return;
    }

    if (age < 18 || age > 25) {
      alert("Age must be between 18 and 25.");
      return;
    }

    if (answers.includes("")) {
      alert("Please answer all the questions.");
      return;
    }

    const avgScore = answers.reduce((sum, val) => sum + val, 0) / 7;

    navigate("/result", {
      state: {
        name,
        age,
        avgScore,
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Game Addiction Project (18-25)</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Age (18-25)</label>
          <input
            type="number"
            value={age}
            placeholder="Enter your age"
            min="18"
            max="25"
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {questions.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{q}</label>
            <select
              required
              className="w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={answers[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
            >
              <option value="">-- Select an option --</option>
              {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold shadow-md transition"
        >
          Submit & Check Result
        </button>
      </form>
    </div>
  );
}
  