"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Chat = () => {
  const [messages, setMessages] = useState<{ content: string; role: string }[]>(
    []
  );
  const userInputRef = useRef<HTMLTextAreaElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userInput = userInputRef.current;

    if (userInput) {
      userInput.addEventListener("input", () => {
        userInput.style.height = "auto";
        userInput.style.height = userInput.scrollHeight + "px";
      });

      userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      });
    }
  });

  const handleSubmit = async () => {
    const userInput = userInputRef.current;
    if (!userInput) return;

    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";
    userInput.style.height = "auto";

    // Instead of querying embeddings, return a static message
    const response = "hello, this is a message from the bot";
    addMessage(`Answer: ${response}`, "bot");
  };

  const addMessage = (content: string, role: string) => {
    setMessages((prevMessages) => [...prevMessages, { content, role }]);
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  return (
    <div className="w-screen bg-white h-screen">
      <div className="max-w-[60%] mx-auto h-screen flex flex-col items-center bg-white">
        <div
          className="flex-1 w-full overflow-y-auto p-5 flex flex-col gap-5"
          id="chat-messages"
          ref={chatMessagesRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[85%] p-4 rounded-lg flex items-center gap-2 ${
                message.role === "user"
                  ? "bg-white border border-gray-300 self-end flex-row-reverse"
                  : "bg-gray-100 self-start animate-fadeIn"
              }`}
            >
              <Image
                src={`/${message.role}-icon.svg`}
                alt={`${message.role} icon`}
                width={24}
                height={24}
                className="bg-blue-500 w-7 h-7 p-1.5 rounded-full"
              />
              <span>{message.content}</span>
            </div>
          ))}
        </div>
        <form
          className="w-4/5 flex gap-2 p-5 border-t border-gray-300 bg-white"
          id="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            id="user-input"
            rows="1"
            placeholder="Type your message here..."
            autoComplete="off"
            autoFocus
            ref={userInputRef}
            className="flex-1 p-3 border border-gray-300 rounded resize-none text-base max-h-52 overflow-y-auto focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white w-12 flex items-center justify-center rounded"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </form>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Chat;
