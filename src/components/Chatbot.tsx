"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there! I'm here to chat about Srishti's journey, skills, and projects. Curious about something? Just ask!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Format bot messages (bold styling)
  const formatMessage = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // Send user message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage })
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        { text: "Sorry, I'm having trouble connecting right now. Please try again later!", sender: "bot" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg bg-accent transition-transform duration-300 hover:scale-[1.1] hover:shadow-2xl"
        aria-label="Open chat assistant"
      >
        <Image src="/images/chat-icon.svg" alt="Chat" width={55} height={55} className="w-[30px] h-[30px] sm:w-[55px] sm:h-[55px]"/>
      </button>

      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-white p-5 shadow-2xl rounded-xl border border-accent transform transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-primary">Ask Srishti&apos;s AI Assistant</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary hover:text-accent transition-all duration-300"
            aria-label="Close chat"
          >
            ✖
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-secondary">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
              <div
                className={`p-3 rounded-lg text-sm max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-accent bg-opacity-20 text-primary"
                    : "bg-accent text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              ></div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 bg-accent bg-opacity-20 text-primary rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Box */}
        <div className="flex mt-3 space-x-2">
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-primary bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            value={input}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            aria-label="Chat message input"
            disabled={loading}
          />
          <button
            className={`bg-accent text-white px-4 py-2 rounded-lg transition-transform duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            onClick={sendMessage}
            disabled={loading}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}