"use client";

import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../services/fetchapi";

import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import MessageList from "./MessageList";
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
    <div className="flex flex-col h-full w-full max-w-8xl  p-6 rounded-md border-4 bg-gray-50">
      {" "}
      <h2 className="font-light text-3xl ">Chatbot</h2>
      <MessageList
        responses={responses}
        loading={loading}
        chatEndRef={chatEndRef}
      />
      <MessageInput
        message={message}
        loading={loading}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBot;
