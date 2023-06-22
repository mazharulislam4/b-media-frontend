
function Message({flexPosition  , msg}) {


const justify = `justify-${flexPosition}`;

  return (
    <div className={`flex space-y-5 ${justify} w-full `}>
      <div className=" relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span className="block">{msg}</span>
      </div>
    </div>
  );
}

export default Message;
