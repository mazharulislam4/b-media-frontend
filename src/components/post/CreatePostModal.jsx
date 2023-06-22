import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import Photo from "../ui/Photo";
import Tag from "./Tag";

function CreatePostModal({ open, closeHandler, getTitle }) {
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [title, setTitle] = useState("");
  // handler
  // get tags
  const getTags = (tags) => {
    setTags(tags);
  };

  const preview = (url) => {
    setPreviewURL(url);
  };
  // file handler
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  // content change
  const contentChangeHandler = (e) => {
    setIsPlaceholder("");
    setContent(e.target.innerHTML);
  };

  const blurHandler = () => {
    setIsPlaceholder(true);
  };

  // set placeholder on mount
  useEffect(() => {
    if (!content) {
      setIsPlaceholder(true);
    }
  }, [content]);

  return (
    <Modal
      onClose={() => {
        closeHandler();
        if (title) {
          getTitle(title);
        }
      }}
      isOpen={open}
    >
      <form action="">
        {/* title  */}
        <div className="w-full my-3">
          <input
            type="text"
            name="tilte"
            id="title"
            value={title}
            placeholder="Post title"
            className="w-full py-2 px-2 rounded-md focus:outline-slate-500 "
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        {/* post  content   */}
        <div className="relative">
          <div
            contentEditable
            onInput={contentChangeHandler}
            onBlur={blurHandler}
            aria-label="What's on your mind?"
            suppressContentEditableWarning
            className="min-h-[60px] select-none focus:border-none focus:outline-slate-500 bg-white py-2 px-2 rounded-md "
          ></div>
          {isPlaceholder ? (
            <p className="select-none   pointer-events-none text-placeholder overflow-ellipsis overflow-hidden absolute top-[2px] left-0   py-2 px-2">
              What&apos;s on your mind?
            </p>
          ) : (
            ""
          )}
        </div>
        {/* tags  */}
        <div className="my-3">
          <Tag getTags={getTags} maxTags={6}></Tag>
        </div>
        {/* photo  */}
        <div className="my-3">
          <Photo handler={fileHandler} fileUrl={file} getPrview={preview} />

          {previewURL ? (
            <figure className="flex flex-col items-center">
              <Image
                src={previewURL}
                className="w-[250px] h-[250px] "
                alt="post image"
                width={100}
                height={100}
              />
            </figure>
          ) : null}
        </div>

        <div className="mt-8 my-3">
          <input
            type="submit"
            value="Post"
            className="text-center w-full block bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-400
          "
          />
        </div>
      </form>
    </Modal>
  );
}

export default CreatePostModal;
