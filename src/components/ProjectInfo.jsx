import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
 
export default function ProjectInfo() {
    const navigate = useNavigate();

    const team = [
        {
            role: "Mentor",
            name: "Dr. Moumita Chatterjee",
            email: "moumitachatterjee@aliah.ac.in",
            linkedin: "https://www.linkedin.com/in/moumita-chatterjee-1a5847172/",
            image: "https://aliah.ac.in//upload/people_profile/01-10-19_1569908000.jpg"
        },
        {
            role: "Developer 1",
            name: "Md Afsar",
            email: "afsarmd.official@example.com",
            linkedin: "https://www.linkedin.com/in/md-afsar-429269291/",
            image: "https://avatars.githubusercontent.com/u/141092560?v=4"
        },
        {
            role: "Developer 2",
            name: "Ebn Masud",
            email: "ebnemasud74@gmail.com",
            linkedin: "https://www.linkedin.com/in/ebne-masud-a84917262/",
            image: "https://media.licdn.com/dms/image/v2/D5603AQFV7yc7MsFdpw/profile-displayphoto-shrink_400_400/B56ZZcAebcGoAg-/0/1745300351788?e=1752710400&v=beta&t=LhqErMSf0OO4C8cZBtj-UjOZtK4jhktG8RfbUsVXa8g"
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-200 p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl ">
                <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">🎓 Project Contributors</h1>

                <div className="space-y-6 flex flex-col">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="border border-indigo-200 p-4 rounded-xl shadow-sm bg-indigo-50 flex md:flex-row flex-col justify-between items-center sm:mt-3"
                        >
                            {/* Left side - details */}
                            <div className="flex flex-col space-y-1">
                                <p className="font-semibold text-indigo-700">{member.role}</p>
                                <p className="text-gray-800">👤 {member.name}</p>
                                <p className="text-gray-600">📧 {member.email}</p>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:underline"
                                >
                                    <FaLinkedin className="inline-block mr-2 text-blue-700" /> LinkedIn
                                </a>
                            </div>

                            {/* Right side - image */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-20 h-20 shadow-md border-2 border-indigo-300"
                            />
                        </div>
                    ))}

                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl shadow"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
