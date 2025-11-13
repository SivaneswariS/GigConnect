
import { useState, useEffect, useRef } from "react";
import socket from "../services/socket";
import API from "../services/api";

function Chat({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const boxRef = useRef();

  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("join", currentUserId);

    socket.on("receiveMessage", (msg) => {
      setMessages((p) => [...p, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;
      try {
        const { data } = await API.get(`/chat/${receiverId}`);
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const msg = { senderId: currentUserId, receiverId, content };
    socket.emit("sendMessage", msg);
    setMessages((p) => [...p, msg]);
    setContent("");
    try {
      await API.post("/chat", { receiverId, content });
    } catch (err) {
      console.error("save failed", err);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 w-full max-w-2xl">
      <h3 className="text-cyan-300 font-bold mb-3">Chat</h3>

      <div ref={boxRef} className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-800 rounded">
        {messages.map((m, i) => {
          const sender = m.sender?._id || m.senderId || m.sender;
          const mine = sender === currentUserId;
          return (
            <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-lg ${mine ? "bg-cyan-500 text-black" : "bg-gray-700 text-gray-100"}`}>
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} className="mt-3 flex gap-3">
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700" />
        <button className="px-4 py-2 bg-cyan-500 rounded">Send</button>
      </form>
    </div>
  );
}

export default Chat;
