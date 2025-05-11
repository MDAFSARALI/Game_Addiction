import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-800 mb-6">🚫 This page does not exist!</p>
            <button
                onClick={() => navigate("/")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl shadow"
            >
                Go to Home
            </button>
        </div>
    );
}
