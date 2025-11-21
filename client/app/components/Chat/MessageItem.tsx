"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

interface IMessage {
  role: "assistant" | "user";
  content?: string;
}

const MessageItem: React.FC<{ msg: IMessage }> = ({ msg }) => {
  return (
    <div
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
                  const { inline, className, children, ...rest } = props as any;
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
                    <code className="bg-gray-200 px-1 py-0.5 rounded" {...rest}>
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
  );
};

export default MessageItem;
