import ChatSearch from "./ChatSearch";
import Participants from "./Participants";


function ChatModal({ open, closeHandler }) {




  if (!open) return null;

  if (open)
    return (
      <>
        <div
          className="fixed w-full h-full bg-black-alpha-20 top-0 left-0   transition-opacity z-50"
          onClick={closeHandler}
        ></div>

        <div className="w-[300px] h-[clc(100vh-80px)] absolute top-[60px] right-0   bg-white   rounded-md z-50 shadow-lg">
          {/* head */}
          <div className="px-2">
            <h3 className="my-2 text-[1.2rem]">Chat</h3>
          </div>
          {/* body  */}
          <div className="w-full">
            {/* search box  */}
            <div className="px-2">
              <ChatSearch />
            </div>
            {/* chat participants  */}
             <Participants/>
          </div>
        </div>
      </>
    );
}

export default ChatModal;
