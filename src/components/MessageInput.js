import { useState } from "react";
import { db } from "../utils/firebase";

import { getDatabase, ref, child, push, update } from "firebase/database";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const db = getDatabase();
    const postData = {
      message: message,
      user_id: 123,
    };

    const newPostKey = push(child(ref(db), "messages")).key;

    const updates = {};
    updates["/messages/" + newPostKey] = postData;
    setMessage('')
    return update(ref(db), updates);
  };

  return (
    <div>
      <input
        type="text"
        className="border-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send message</button>
    </div>
  );
};

export default MessageInput;
