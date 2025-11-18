import ChatBot from "./components/chatbot";
import FileUpload from "./components/file-upload";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col  overflow-hidden ">
      <Navbar />

      <div className="flex flex-1 flex-row  overflow-hidden">
        <div className="w-[40vh] h-full flex justify-center items-start   rounded-md border-4  overflow-hidden">
          <FileUpload />
        </div>

        <div className="flex-1 h-full    overflow-hidden">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}
