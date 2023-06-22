import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useUserId(){
    const [userId , setUserId] = useState(null)
    useEffect(()=>{
        const cookie = Cookies.get("auth");
        if (cookie && typeof window !== "undefined") {
          const data = JSON.parse(cookie);
          setUserId(data?.user?._id )
        }
    }, [])


    return userId;
}