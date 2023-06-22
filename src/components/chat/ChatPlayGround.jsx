import { useParticipants } from "@/hooks/chat/chatHooks";
import useUserId from "@/hooks/useUserId";
import { chatHandler } from "@/redux/features/chat/chatSlice";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BiSend } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../../../contextAPI/chatContext";
import { getIsOnline } from "../../../utils/chatUtil";
import Avatar from "../Avatar";
import Message from "./Massage";

function ChatPlayGroundModal() {
  const [isMounted, setIsMounted] = useState(false);
  // all chat participants of the current user
  let participants = useParticipants();

  // open chat handler participant
  const chatParticipant = useSelector((state) => state.chat.chatHandler);
  const activeUsers = useSelector((state) => state.user.onlineUser);
  const dispatch = useDispatch();
  const data = chatParticipant ? chatParticipant?.data : {};
  // message input from text area
  const [input, setInput] = useState("");
  const { Socket , sendMessage} = useChat();
  const currentUserId = useUserId();
  const [msgData, setMsgData] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();



  // set messages
  useEffect(() => {
    const isParticipant =
      participants?.findIndex(
        (value) => value?.participant?._id === msgData?.sender
      ) > -1;

    msgData && setMessages((prev) => [...prev, msgData]);

    return () => {};
  }, [msgData, participants]);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) return null;

  const messageSendHanlder = () => {
    if (Socket) {
      const DATA = {
        sender: data?.creator?._id,
        receiver: data?.participant?._id,
        created_at: Date.now(),
        text: input,
        conversation_id: data?._id,
      };

      sendMessage(DATA);

      Socket.on("getMessages", (data) => {
        console.log('hi');
        setMsgData(data);
      });

      setMessages([...messages, DATA]);

      // Get messages from server

      if (inputRef?.current) {
        inputRef.current.innerHTML = "";
      }
    }
  };

  if (chatParticipant && !chatParticipant?.isOpen) return null;

  return createPortal(
    <div
      className="w-[350px]   box-border  bg-white   rounded-md shadow-2xl fixed top-[30%] right-[8%] "
      style={{ height: "calc((100% + 450px) - 100%)" }}
    >
      {/* header  */}
      <div className="flex justify-between items-center box-border  h-[60px]  rounded-t-md px-2 py-2 bg-white shadow-md ">
        <div className="flex  items-center gap-2 ">
          <Avatar isOnline={getIsOnline(data?.participant?._id, activeUsers)} />
          <div>
            <p>
              {data?.participant?.firstName + " " + data.participant?.lastName}
            </p>
            <p>Active 3 min ago</p>
          </div>
        </div>
        <button
          type="button"
          className="text-md"
          onClick={() => {
            dispatch(chatHandler({ isOpen: false, data: {} }));
          }}
        >
          <RxCross2 />
        </button>
      </div>
      {/* body  */}
      <div
        className="bg-red-300   "
        style={{ height: "calc(100% - (60px + 80px))" }}
      >
        <div className=" w-full overflow-auto h-full items-end   px-4 py-3 ">
          {messages.map((value, index) => {

            // console.log(participants.findIndex((pr) => pr?._id === data?._id));
            // if (participants.findIndex((pr) => pr?._id === data?._id) > -1)
              return (
                <Message
                  key={index}
                  msg={value?.text}
                  flexPosition={
                    value?.sender === data?.creator?._id ? "end" : "start"
                  }
                />
              );
          })}
        </div>
      </div>
      {/* footer  */}
      <div className="flex items-center pb-3 pt-2 gap-3   px-2 relative  shadow-md  ">
        <div className="self-end min-h-[40px] flex flex-col justify-center">
          <label htmlFor="fileUp" className="cursor-pointer text-[1.5rem]">
            <BsImages />
          </label>
          <input type="file" name="fileUp" id="fileUp" className="hidden" />
        </div>
        {/*==============send massege =============  */}
        <div className="flex items-center gap-2 bg-white  w-full  ">
          <div
            type="text"
            contentEditable
            suppressContentEditableWarning
            className="w-full relative overflow-auto  focus:outline-none px-3  bg-slate-100 min-h-[40px] py-1  max-h-[150px]"
            onInput={(e) => {
              setInput(e.target.innerHTML);
            }}
            ref={inputRef}
            dir="ftl"
          ></div>
          <button
            type="button"
            className="self-end min-h-[40px] cursor-pointer text-[1.5rem]"
            onClick={messageSendHanlder}
          >
            {" "}
            <BiSend />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ChatPlayGroundModal;
