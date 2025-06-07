import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message
    setChatLog((prev) => [...prev, { type: "user", text: message }]);

    // Fetch response from API
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"message": message }),
    });
    const data = await res.json();

    // Add bot reply
    setChatLog((prev) => [...prev, { type: "bot", text: data?.reply }]);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Chat With Hitesh chaudhary</h2>
      <div className="chat-box">
        {chatLog.map((entry, idx) => (
          <div key={idx} className={`chat-message ${entry.type}`}>
            <strong>{entry.type === "user" ? "You" : "Hitesh"}:</strong>{" "}
            {entry.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
