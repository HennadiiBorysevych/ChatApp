import "./App.css";
import { useState } from "react";
import Chat from "./Chat";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="John..."
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            onClick={joinRoom}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return joinRoom;
              }
            }}
          >
            Join a room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
}

export default App;
