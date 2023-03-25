import React, { useState, useEffect, useContext } from "react";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import MessageInput from "@/components/MessageInput";
import { useAppContext } from "@/utils/context";
import { useRouter } from "next/router";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter()
  const {user} = useAppContext();
  
  if(user && !user.loggedIn){
    router.push('/login')
  }

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

  return (
    <div>
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
};

export default Index;
