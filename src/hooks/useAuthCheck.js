import { loggedInUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export function useAuthCheck() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = Cookies.get("auth");
 
    if (cookie) {
      const data = JSON.parse(cookie);
      if (data instanceof Object && data?.token) {
        dispatch(loggedInUser(data));
      }
    }
    setIsAuthorized(true);
  }, [dispatch]);

  return isAuthorized ;
}
