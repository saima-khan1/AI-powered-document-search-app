import ChatBot from "./components/Chat/Chat";
import FileUpload from "./components/UploadingFile/FileUpload";
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

        <footer className="fixed bottom-0 left-0 w-full text-center text-xs text-gray-1000 p-2 bg-gray-200">
          Documind can be inaccurate; please double-check its responses.
        </footer>
      </div>
    </div>
  );
}
