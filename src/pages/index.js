import React, { useState, useEffect, useContext } from "react";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import MessageInput from "@/components/MessageInput";
import { useAppContext } from "@/utils/context";
import { useRouter } from "next/router";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    const query = ref(db, "messages");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      setMessages([]);
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setMessages((messages) => [...messages, project]);
        });
      }
    });
  }, []);

  if (!user) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-xl mx-auto border p-4">
        {messages?.map((msg, index) => (
          <div key={index}>
            <p>{msg.user_id}</p>
            <p>{msg.message}</p>
          </div>
        ))}
        <div>
          <MessageInput />
        </div>
      </div>
    );
  }
};

export default Index;
