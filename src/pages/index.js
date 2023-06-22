import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import useUserId from "@/hooks/useUserId";
import { onlineUser } from "@/redux/features/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import useAuth from "@/hooks/useAuth";
import { useChat } from "../../contextAPI/chatContext";
// home page
function HomePage() {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const { Socket } = useChat();
  const isAuthorized = useAuthCheck();
  const currentUserId = useUserId();
  // const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (isAuth && Socket) {
    
      //  activeUser
      Socket.on("activeStatus", (user) => {
        dispatch(onlineUser(user));
      });
    }

    return () => {
      if (Socket) {
        Socket.on("disconnect", () => {

        });
      }
    };
  }, [isAuth, dispatch, Socket]);

  if (!isAuthorized) return <div>Authorization chacking....</div>;

  if (isAuthorized) return <>{isAuth ? <Main /> : <Login />}</>;
}

export default HomePage;
