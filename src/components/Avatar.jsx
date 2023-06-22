import Image from "next/image";

function Avatar({ onClick, withName , isOnline , name  , url }) {

  return (
    <div
      className="relative cursor-pointer flex items-center  gap-2"
      onClick={onClick}
    >
    
      <div className="relative">
        {isOnline  && (
          <span className="h-[8px] w-[8px] bg-green-500 rounded-full  absolute top-[2px] left-[1px] z-[1]"></span>
        )}
        <figure className="w-[40px] h-[40px]  rounded-full overflow-hidden relative border-spacing-1 border-2 border-slate-400 ">
          {url ? (
            <Image
              priority
              src={url || ""}
              alt="avatar"
              width={160}
              height={80}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="https://images.unsplash.com/photo-1682495867890-c0f5f045f303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1609&q=80"
              alt="avatar"
            />
          )}
        </figure>
      </div>
      {withName && <p>{name}</p>}
    </div>
  );
}

export default Avatar;
