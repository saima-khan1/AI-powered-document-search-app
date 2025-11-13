import ChatBot from "./components/chatbot";
import FileUpload from "./components/file-upload";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {" "}
      <Navbar />
      <div className="flex flex-1 flex-row">
        <div className="w-[40vh] min-h-screen flex  justify-center py-30 ">
          <div>
            {" "}
            <h1 className="font-bold text-3xl text-center">Hello, User</h1>
            <FileUpload />
          </div>
        </div>
        <div className="w-[60vh] min-h-screen border-l-1">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}
