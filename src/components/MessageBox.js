import { useAppContext } from "@/utils/context";
import React from "react";

const MessageBox = ({ messages }) => {
  const { user } = useAppContext();

  console.log(user);

  return (
    <div className="my-2">
      {messages?.map((msg, index) => (
        <div key={index}>
          {msg?.user_email === user.email ? (
            <div className="">
              <div className="flex justify-end">
                <p className="bg-red-100  rounded-full px-2">{msg.user_name}</p>
              </div>
              <div className="flex justify-end">
                <div className="p-2 bg-red-100 rounded-md mt-2 min-w-[250px]">
                  {msg.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="my-2">
              <div className="flex justify-start">
                <p className="bg-slate-100 rounded-full px-2">{msg.user_name}</p>
              </div>
              <div className="flex justify-start">
                <div className="p-2 bg-slate-100 rounded-md mt-2 min-w-[250px]">
                  {msg.message}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
