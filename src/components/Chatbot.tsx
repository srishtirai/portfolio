"use client";

import { useState } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me about my **skills, projects, or experience**.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Format bot messages (bold styling)
  const formatMessage = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // Send user message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input })
    });

    const data = await res.json();
    setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg bg-accent transition-transform duration-300 hover:scale-[1.1] hover:shadow-2xl"
      >
        <Image src="/images/chat-icon.svg" alt="Chat" width={55} height={55} className="w-[30px] h-[30px] sm:w-[55px] sm:h-[55px]"/>
      </button>

      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-white p-5 shadow-2xl rounded-xl border border-accent transform transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* 🆕 Updated Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-primary">Let’s Chat!</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary hover:text-accent transition-all duration-300"
          >
            ✖
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-secondary">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
              <p
                className={`p-3 rounded-lg text-sm ${
                  msg.sender === "bot"
                    ? "bg-accent bg-opacity-20 text-primary"
                    : "bg-accent text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              ></p>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <p className="p-3 bg-accent bg-opacity-20 text-primary rounded-lg text-sm">...</p>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="flex mt-3 space-x-2">
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-primary bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button
            className="bg-accent text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}