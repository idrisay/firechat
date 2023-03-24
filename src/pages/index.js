import React, {useState, useEffect} from 'react'
import { db } from '../utils/firebase';
import { onValue, ref } from 'firebase/database';
import MessageInput from '@/components/MessageInput';

const index = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const query = ref(db, "messages");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      setMessages([])
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setMessages((messages) => [...messages, project]);
        });
      }
    });
  }, []);

  return (
    <div>
      {
        messages?.map((msg, index) => (
          <div key={index}>
            <p>{msg.user_id}</p>
            <p>{msg.message}</p>
          </div>
        ))
      }
      <div>
        <MessageInput/>
      </div>
    </div>
  )
}

export default index