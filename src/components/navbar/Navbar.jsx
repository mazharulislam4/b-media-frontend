import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsOnline } from "../../../utils/chatUtil";
import Avatar from "../Avatar";
import Brand from "../Brand";
import withPrivateRoute from "../PrivateRoute";
import ChatModal from "../chat/ChatModal";
import Logout from "../ui/Logout";
import Nav from "./Nav";
export function DropDown({ className, style, isOpen, isOnline, name, url }) {
  if (!isOpen) return null;

  return (
    <div
      className={`${className} bg-white absolute top-[110%] right-0 z-[99]  shadow-md rounded-sm `}
      style={style}
    >
      <ul className="flex flex-col gap-2 ">
        <li className="hover:bg-slate-200 py-1 px-2 rounded-sm ">
          <Link href={"#"} legacyBehavior>
            <a className="py-1 w-full block px-2">
              <Avatar
                withName={true}
                isOnline={isOnline}
                name={name}
                url={url}
              />
            </a>
          </Link>
        </li>

        <li className="hover:bg-slate-200 py-1 px-2 rounded-sm">
          <Logout className=" px-2  py-1 w-full text-left " />
        </li>
      </ul>
    </div>
  );
}

function NavbarComponent() {
  const [isAvatarDropDown, setAvatarDropDown] = useState(false);
  const user = useSelector((state) => state.auth.loggedInUser?.user);

  const activeUser = useSelector((state) => state?.user.onlineUser);
  const [isChatOpen , setIsChatOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("click", function (e) {
      setAvatarDropDown(false);
    });
  }, []);
  // avatar drop down onclick function
  const avatarDrodownHandler = (e) => {
    e.stopPropagation();
    if (isAvatarDropDown) {
      setAvatarDropDown(false);
    } else {
      setAvatarDropDown(true);
    }
  };

  return (
    <div className="py-3 md:px-8 px-2 shadow-sm fixed top-0 w-full h-[70px] left-0 z-10 bg-white">
      <div className="flex justify-between items-center">
        {/* brand  */}
        <div>
          <Brand />
        </div>
        {/* nav  */}
        <div>
          <Nav />
        </div>
        {/* avatar  */}
        <div className="relative flex items-center gap-2">
          <div>
            <p onClick={()=>{setIsChatOpen(true)}}>chat</p>
            <ChatModal open={isChatOpen} closeHandler={()=>{setIsChatOpen(!isChatOpen)}} />
          </div>
          {/* avatar  */}
          <Avatar
            onClick={avatarDrodownHandler}
            isOnline={getIsOnline(user?._id , activeUser)}
            name={user.firstName}
            url={user.avatar.url}
          />
          <DropDown
            className="w-[200px] "
            isOpen={isAvatarDropDown}
            isOnline={getIsOnline(user?._id , activeUser)}
            name={user.firstName}
            url={user.avatar.url}
          />
        </div>
      </div>
    </div>
  );
}

const Navbar = withPrivateRoute(NavbarComponent);

export default Navbar;
