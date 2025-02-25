import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Api.jsx";

const Chat = () => {
  const { jobId, providerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/worker/chat/${jobId}/${providerId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [jobId, providerId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/worker/chat/${jobId}/${providerId}`,
        { message },
        { withCredentials: true }
      );
      if (res.data.success) {
        setMessages([...messages, res.data.message]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Chat with Employer</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded my-2 ${
                msg.senderId === providerId
                  ? "bg-blue-200 self-start"
                  : "bg-green-200 self-end"
              }`}>
              {msg.message}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
