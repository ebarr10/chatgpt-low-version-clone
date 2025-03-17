"use client";
import axios from "axios";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Button,
  ChatBox,
  Container,
  Input,
  Speaker,
} from "../../styles/chat.styles";

type MessageProps = {
  role: string;
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you?",
    },
  ]); // Stores chat history
  const [input, setInput] = useState("");

  const chatRef = useRef<HTMLInputElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return; // Ignore empty messages

    // Add user message to chat history
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      // Send request to FastAPI
      const response = await axios.get(
        `http://127.0.0.1:8000/chat?prompt=${input}`
      );

      // Add AI response to chat history
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim() !== "") {
        sendMessage();
        setInput("");
      }
    }
  };

  // Function to check if the user is at the bottom
  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
  };

  // Auto-scroll when massages update
  useEffect(() => {
    if (isAtBottom && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <h1>AI Assistant</h1>
      <ChatBox ref={chatRef} onScroll={handleScroll}>
        {messages.map((msg, index) => (
          <Speaker key={index} role={msg.role}>
            <strong>{msg.role}:</strong>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </Speaker>
        ))}
      </ChatBox>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
      />
      <Button onClick={sendMessage}>Send</Button>
    </Container>
  );
}
