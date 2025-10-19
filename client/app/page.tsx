import FileUpload from "./components/file-upload";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {" "}
      <Navbar />
      <div className="flex flex-row">
        <div className="w-[40vh] min-h-screen ">
          <FileUpload />
        </div>
        <div className="w-[60vh] min-h-screen border-l-1">Chatbot</div>
      </div>
    </div>
  );
}
