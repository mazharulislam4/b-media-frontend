import { useParticipants } from "@/hooks/chat/chatHooks";
import { chatHandler } from "@/redux/features/chat/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../../../contextAPI/chatContext";
import { getIsOnline } from "../../../utils/chatUtil";
import Avatar from "../Avatar";

function Participants() {
  let participants = useParticipants();
  const activeUser = useSelector((state) => state.user.onlineUser);
  const dispatch = useDispatch();





  if (participants && participants.length > 0) {
    return participants.map((data, index) => {
      return (
          <ul key={index} className="w-full">
            <li
              className="grid grid-flow-row grid-cols-2 items-center  w-full  my-2 hover:bg-slate-100 bg-origin-content px-2 py-1 cursor-pointer "
              onClick={() => {
                dispatch(chatHandler({ isOpen: true, data }));
              }}
            >
              <div className="justify-self-start flex gap-2">
                <Avatar
                  isOnline={getIsOnline(data?.participant?._id, activeUser)}
                />
                {/*  name and last massege  */}
                <div className="justify-self-start w-full text-sm">
                  <p className="w-full">
                    {data?.participant?.firstName +
                      " " +
                      data?.participant?.lastName}
                  </p>
                  <p>
                    <span className="text-bold text-[14px] ">You:</span>
                    <span className="indent-1 inline-block text-[14px] text-bold">
                      Hello
                    </span>
                    <span className="indent-2 inline-block text-[11px]">
                      30m
                    </span>
                  </p>
                </div>
              </div>
              {/* is massege read or unseen  */}
              <div className="justify-self-end">seen</div>
            </li>
          </ul>
      );
    });
  }

  return <p className="text-sm ">create a conversation</p>;
}

export default Participants;
