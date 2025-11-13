"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { sendMessage } from "../services/fetchapi";

const ChatBot = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    console.log(e.target.value, "submit");
  };
  const handleSubmit = async () => {
    console.log(message, "submited");
    try {
      const response = await sendMessage(message);
      setResponse(response?.answer || "No response");

      setMessage("");
    } catch (err) {
      console.log(err, "failed to send ");
    }
  };

  return (
    <div className="p-4">
      <div className="flex  fixed  w-100 p-2 gap-4">
        {" "}
        <Input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={handleChange}
        />
        <Button disabled={!message.trim()} onClick={handleSubmit} type="submit">
          Send
        </Button>
      </div>
      <div className="mt-20 p-4">
        <p className="text-gray-700">🤖 {response}</p>
      </div>
    </div>
  );
};

export default ChatBot;
