import useUserId from "@/hooks/useUserId";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


const url = process.env.ORIGIN_URL || "http://localhost:5000";
// context
const chatContext = React.createContext();

export const useChat = () => React.useContext(chatContext);

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const userId = useUserId();
  const socketRef = useRef();

  useEffect(() => {
    if (!socketRef.current && userId) {
      socketRef.current = io(url, { auth: { id: userId } });

      setSocket(socketRef.current);
    }

    return () => {};
  }, [userId]);

 

  return (
    <chatContext.Provider value={{ Socket: socket }}>
      {children}
    </chatContext.Provider>
  );
};
