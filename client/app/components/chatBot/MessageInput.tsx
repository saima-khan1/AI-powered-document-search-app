"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  message: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const MessageInput: React.FC<Props> = ({
  message,
  loading,
  onChange,
  onKeyPress,
  onSubmit,
}) => {
  return (
    <div className="flex gap-3 mb-6">
      <Input
        type="text"
        placeholder="Type your message here"
        value={message}
        onChange={onChange}
        onKeyDown={onKeyPress}
        className="flex-1 text-xl font-semibold h-16 px-4"
      />

      <Button
        disabled={!message.trim() || loading}
        onClick={onSubmit}
        type="submit"
        className="h-16 px-6"
      >
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};
export default MessageInput;
