import dynamic from "next/dynamic";
import Avatar from "../Avatar";
const CreatePostModal = dynamic(() => import('@/components/post/CreatePostModal'), {
  ssr: false
});

import useUserId from "@/hooks/useUserId";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getIsOnline } from "../../../utils/chatUtil";

function PostLabel() {
  const activeUser = useSelector((state)=>state.user.onlineUser) 
  const [isOpen  , setIsOpen] = useState(false);
  const [title , setTitle] = useState('')
  const userId = useUserId()
  //  modal handler 
  
  const modalOpen = ()=>{
     setIsOpen(true)
  }
  
  const modalClose = ()=>{
    setIsOpen(false)
  }


  const getTitle = (value)=>{
    setTitle(value)
  }
  return (
    <>
    <div className="flex gap-1 border-b-[1px] border-b-slate-300 py-3 px-2 bg-slate-100 cursor-pointer select-none" onClick={modalOpen}>
      <div>
        <Avatar isOnline={getIsOnline(userId, activeUser)} />
      </div>

      <div className="px-2 py-3 w-full rounded-3xl bg-white">
        <span className="text-lg"> {title ? title : `What's on your mind? `}</span>
      </div>
    </div>
    <CreatePostModal open={isOpen} closeHandler={modalClose} getTitle = {getTitle} />
    </>
  );
}



export default PostLabel;
