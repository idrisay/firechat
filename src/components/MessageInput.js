import { useState } from "react";
import { db } from "../utils/firebase";

import { getDatabase, ref, child, push, update } from "firebase/database";
import { useAppContext } from "@/utils/context";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { user } = useAppContext();

  const handleSendMessage = () => {
    const db = getDatabase();
    const postData = {
      message: message,
      user_id: `${user.firstName} ${user.lastName}`,
    };

    const newPostKey = push(child(ref(db), "messages")).key;

    const updates = {};
    updates["/messages/" + newPostKey] = postData;
    setMessage('')
    return update(ref(db), updates);
  };

  return (
    <div className="flex flex-col">
      <textarea
        type="text"
        className="border-2 rounded-md p-2"
        placeholder="message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="p-2 border-green-400 border mt-2 rounded-md text-green-600" onClick={handleSendMessage}>Send message</button>
    </div>
  );
};

export default MessageInput;
