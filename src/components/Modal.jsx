import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCrossCircled } from 'react-icons/rx';

function Modal({ isOpen , onClose, children, title }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isOpen) return null;

  if (!isMounted) return <></>;

  return createPortal(
<>
<div className ="fixed w-full h-full bg-black-alpha-60 top-0 left-0   transition-opacity z-50" onClick={onClose} ></div>

<div className="md:w-[500px] w-[95%] absolute top-[50%] left-[50%] right-[50%] transform translate-x-[-50%] bg-slate-100  translate-y-[-50%]  px-4 py-2 rounded-md z-50">
  {/* modal header  */}
  <div className="flex justify-between items-center text-[1.5rem] mb-2">
    <h2>{title || "Modal"}</h2>
    <button type="button" onClick={onClose} className="hover:text-slate-600 transition-colors duration-200">
     <RxCrossCircled/>
    </button>
  </div>
  {/* body  */}
  <div>{children}</div>
</div>
</>
,
    document.body
  );
}

export default Modal;
