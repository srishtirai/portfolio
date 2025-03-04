"use client";

import { useState } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me about my skills, projects, or experience.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  // Function to format bot responses with **bold** text
  const formatMessage = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // Send user input to chatbot API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input })
    });

    const data = await res.json();
    setMessages([...newMessages, { text: data.response, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-transform duration-300"
      >
        <Image src="/images/chat-icon.svg" alt="Chat" width={24} height={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white p-4 shadow-xl rounded-lg border border-gray-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-primary">Curious? Ask Me!</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-60 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "bot" ? "text-left" : "text-right"}>
                <p
                  className={`p-2 my-1 rounded-lg ${
                    msg.sender === "bot" ? "bg-gray-200 text-primary" : "bg-accent text-white"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                ></p>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <input
            type="text"
            className="w-full p-2 border rounded text-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button className="mt-2 bg-accent text-white px-4 py-2 rounded w-full" onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
