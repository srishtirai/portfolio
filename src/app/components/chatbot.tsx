"use client";

"use client";

import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hi! Ask me about my skills, projects, or experience.", sender: "bot" }]);
  const [input, setInput] = useState("");

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
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 shadow-lg rounded-lg border">
      <div className="h-60 overflow-y-auto mb-2">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "text-left" : "text-right"}>
            <p className={`p-2 my-1 rounded-lg ${msg.sender === "bot" ? "bg-gray-200" : "bg-purple-300"}`}>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded w-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
