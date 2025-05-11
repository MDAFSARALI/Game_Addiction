import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
} from "chart.js";
import userData from "../assets/processedData.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

const randomSuggestions = [
    "Try a new hobby like drawing, reading, or outdoor games.",
    "Limit gaming to weekends and track your time.",
    "Spend quality time with friends and family offline.",
    "Try meditation or mindfulness to reduce screen cravings.",
    "Make a daily schedule with limited gaming hours."
];

export default function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [emoji, setEmoji] = useState("🤔");
    const [dotData, setDotData] = useState([]);
    const resultRef = useRef();

    useEffect(() => {
        if (!state?.avgScore && state?.avgScore !== 0) {
            navigate("/");
            return;
        }

        const avg = state.avgScore;

        const randomIndex = Math.floor(Math.random() * randomSuggestions.length);
        const randomTip = randomSuggestions[randomIndex];

        if (avg > 2) {
            setMessage("⚠️ You may be <strong>Addicted</strong> to gaming.");
            setSuggestion(randomTip);
            setEmoji("⚠️");
        } else if (avg === 2) {
            setMessage("🙂 You are in the <strong>Normal</strong> range.");
            setSuggestion("Maintain this balance and stay aware.");
            setEmoji("🙂");
        } else {
            setMessage("🎉 No signs of addiction. <strong>Well balanced!</strong>");
            setSuggestion("Keep up your healthy habits!");
            setEmoji("🎉");
            confetti();
        }

        const others = userData.map((val, index) => ({
            x: index + 1,
            y: val,
            backgroundColor: "rgba(99, 102, 241, 0.5)",
        }));

        const currentUser = {
            x: userData.length + 1,
            y: avg,
            backgroundColor: "rgb(220, 38, 38)",
        };

        setDotData([...others, currentUser]);
    }, [state]);

    const chartData = {
        datasets: [
            {
                label: "User Scores",
                data: dotData,
                pointRadius: 6,
                pointHoverRadius: 8,
                backgroundColor: dotData.map((d) => d.backgroundColor),
                parsing: { xAxisKey: "x", yAxisKey: "y" },
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Gaming Addiction Score Distribution" },
        },
        scales: {
            x: { title: { display: true, text: "User Index" } },
            y: {
                title: { display: true, text: "Average Score" },
                min: 0,
                max: 4,
            },
        },
    };

   const exportPDF = () => {
    const timestamp = new Date().toLocaleString();
    const pdf = new jsPDF();

    // Title
    pdf.setFontSize(18);
    pdf.text("Gaming Addiction Result Report", 10, 20);

    // Basic Info
    pdf.setFontSize(12);
    pdf.text(`Name: ${state?.name || "N/A"}`, 10, 35);
    pdf.text(`Age: ${state?.age || "N/A"}`, 10, 45);
    pdf.text(`Exported on: ${timestamp}`, 10, 55);

    // Screenshot from page
    html2canvas(resultRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 65, 190, 0);
        pdf.save("GamingAddiction_Result.pdf");
    });
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-300 p-4 dark:from-gray-800 dark:to-gray-900">
            <div ref={resultRef} className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 text-center mb-4">Your Result</h2>

                <div className="text-center text-gray-700 dark:text-white font-medium mb-4">
                    <p className="text-lg">{emoji} <span dangerouslySetInnerHTML={{ __html: message }} /></p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 italic">{suggestion}</p>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Your Score</label>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4 mt-1">
                        <div
                            className={`h-4 rounded-full transition-all duration-500 ease-in-out ${state.avgScore <= 1 ? "bg-green-500" :
                                    state.avgScore === 2 ? "bg-yellow-500" :
                                        "bg-red-500"
                                }`}
                            style={{ width: `${(state.avgScore / 4) * 100}%` }}
                        />
                    </div>
                    <p className="text-center mt-1 text-sm text-gray-600 dark:text-gray-300">{state.avgScore}/4</p>
                </div>

                <Scatter data={chartData} options={options} />

                <div className="flex justify-center mt-6 gap-4 flex-wrap">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
                    >
                        Take Test Again
                    </button>

                    <button
                        onClick={exportPDF}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
                    >
                        Export to PDF
                    </button>
                </div>

                <button
                    onClick={() => navigate("/contributors")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow align-center mt-4 justify-center flex align-center mx-auto"
                >
                    Meet to the Team
                </button>
            </div>
        </div>
    );
}
