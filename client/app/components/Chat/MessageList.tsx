"use client";
import React, { RefObject } from "react";
import MessageItem from "./MessageItem";
interface IMessage {
  role: "assistant" | "user";
  content?: string;
}
interface Props {
  responses: IMessage[];
  loading: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<Props> = ({ responses, loading, chatEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-xl border bg-white shadow font-semibold">
      {responses.map((msg, index) => (
        <MessageItem key={index} msg={msg} />
      ))}

      {loading && <p className="text-gray-500 italic text-xl">Typing...</p>}

      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageList;
