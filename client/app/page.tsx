import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      {/* Left half */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        Upload Section
      </div>

      {/* Right half */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        Chatbot
      </div>
    </div>
  );
}
