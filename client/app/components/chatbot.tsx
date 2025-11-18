"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/fetchapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
interface IMessage {
  role: "assistant" | "user";
  content?: string;
  documents?: string[];
}

const ChatBot = () => {
  const [message, setMessage] = useState<string>("");
  const [responses, setResponses] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    console.log("submit");
  };
  const handleSubmit = async () => {
    if (!message.trim()) return;
    setResponses((prev) => [...prev, { role: "user", content: message }]);

    setMessage("");
    setLoading(true);
    console.log(message, "submited");
    try {
      const response = await sendMessage(message);

      setResponses((prev) => [
        ...prev,
        { role: "assistant", content: response?.answer || "No response" },
      ]);

      console.log(response, "response");
    } catch (err) {
      console.log(err, "failed to send ");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };
  return (
    <div className="flex flex-col h-full w-full max-w-7xl  p-6 rounded-md border-4 bg-gray-50">
      {" "}
      <h2 className="font-light text-3xl ">Chatbot</h2>
      <div className="flex-1    overflow-y-auto mb-4 p-4 rounded-xl border bg-white shadow font-semibold ">
        {responses.map((msg, index) => (
          <div
            key={index}
            className={`my-3 text-xl flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3  text-xl rounded-2xl max-w-[80%]  ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose max-w-full">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code(props) {
                        const { inline, className, children, ...rest } =
                          props as any;
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                          <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                            {...rest}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-gray-200 px-1 py-0.5 rounded"
                            {...rest}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}{" "}
        {loading && <p className="text-gray-500 italic text-xl">Typing...</p>}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-3">
        {" "}
        <Input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="flex-1 text-xl font-semibold"
        />
        <Button
          disabled={!message.trim() || loading}
          onClick={handleSubmit}
          type="submit"
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
