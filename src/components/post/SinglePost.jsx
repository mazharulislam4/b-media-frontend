import { useGetPostQuery } from "@/redux/features/post/postAPI";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getIsOnline } from "../../../utils/chatUtil";
import Avatar from "../Avatar";

function SinglePost() {
  const { data, isError, isLoading } = useGetPostQuery();
  const [seemore, setSeeMore] = useState(false);
    const activeUser = useSelector((state)=>state.user.onlineUser) 


  let content = null;

  const seemoreHandler = () => {
    if (seemore) {
      setSeeMore(false);
    } else {
      setSeeMore(true);
    }
  };

  if (!isLoading && !isError && data instanceof Object) {
    content = data?.data.map((post, index) => {
      return (
        <div className="w-full bg-white rounded-lg py-2 px-3 my-6" key={index}>
          {/* header  */}
          <div className="flex gap-2 items-center">
            <div>
              <Avatar isOnline={getIsOnline(post?.user?._id , activeUser)} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black-alpha-60 text-md font-bold ">{post?.user?.firstName} </p>
              <button
                type="button"
                className="bg-blue-400 text-sm text-white rounded-sm w-fit py-[4px] px-3"
              >
                follow
              </button>
            </div>
          </div>

          {/* post content  */}
          <div className="min-h-[100px] overflow-hidden overflow-ellipsis my-5">
            <p className="mb-2">{post?.title}</p>

            {!seemore ? post?.description.substring(0, 200) : post?.description}

            <button
              type="button"
              onClick={seemoreHandler}
              className="block my-1 font-bold text-black-alpha-60"
            >
              See {!seemore ? "more" : "less"} .....
            </button>
          </div>

          <figure className="relative">
            <Image src={"/"} alt="post img" fill className="relative" />
          </figure>
          {/* like comments shares */}
          <div className="flex justify-between items-center text-sm text-black-alpha-60 py-1 pb-2">
            <div>
              <p>200 likes</p>
            </div>
            <div className="flex gap-[10px] text-sm text-black-alpha-60">
              <p>100 comments</p>
              <p>10 share</p>
            </div>
          </div>
          {/* comment section  */}
          <div className="flex justify-between items-center border-t-[1px] border-t-slate-200 pt-4 ">
            <button
              type="button"
              className="bg-slate-200 py-1 px-10 rounded-sm text-md hover:bg-slate-300 cursor-pointer "
            >
              Like
            </button>
            <button
              type="button"
              className="bg-slate-200 py-1 px-10 rounded-sm text-md hover:bg-slate-300 cursor-pointer"
            >
              Comment
            </button>
            <button
              type="button"
              className="bg-slate-200 py-1 px-10 rounded-sm text-md hover:bg-slate-300 cursor-pointer"
            >
              Share
            </button>
          </div>
        </div>
      );
    });
  }

  return <>{content}</>;
}

export default SinglePost;
