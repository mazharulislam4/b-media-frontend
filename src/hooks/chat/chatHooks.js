import { useEffect, useState } from "react";
import { useChat } from "../../../contextAPI/chatContext";
import useAuth from "../useAuth";
import useUserId from "../useUserId";


// all chat conversation or participants 
export const useParticipants = () => {
  const { Socket } = useChat();
  const isAuth = useAuth();
  const userId = useUserId();
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    if (isAuth && Socket && userId) {
      Socket.emit("reqParticipants", { id: userId });
      Socket.on("getParticipants", (data) => {
        setParticipants(data);
      });
    }
  } , [isAuth , Socket , userId]);

  return participants;
};
