import { useEffect, useState } from "react";

function Tag({ getTags, maxTags = 5, maxLength = 30, maxWords = 3 }) {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [tagError, setTagError] = useState("");

  let error;

  useEffect(() => {
    getTags(tags);
  }, [getTags, tags]);

  // handler
  const inputChangeHandler = (e) => {
    if (e.target.value === ",") {
      e.target.value = "";
    }
    setTagError('')
    setInput(e.target.value);
    // max words and length
    if (input.length >= maxLength || input.trim().split(" ").length > maxWords) {
      setTagError("Maximum 30 charachters or  3 words allowed");
    } 
  };

  const commaKeyHandler = (e) => {
    if (e.code === "Comma" || (e.code === "Enter" && !tagError && input.length > 0)) {
      setInput("");
      setTags([
        ...tags,
        input.indexOf(",") > -1 ? input.replace(",", "").trim() : input.trim(),
      ]);
    }
  };

  // remove tags
  const removeTagHandler = (e) => {
    setTags(tags.filter((value) => value.trim() !== e.target.innerText.trim()));
  };

  //   validation

  if (maxTags <= tags.length) {
    error = `Maximum ${maxTags} allowd`;
  } else {
    error = "";
  }

  return (
    <div>
      <div className="bg-white px-1 py-3 rounded-md flex gap-3 flex-shrink flex-wrap">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <p
              className="bg-slate-200 px-2 py-1 cursor-pointer rounded-md inline-block h-fit w-fit "
              key={index}
              onClick={removeTagHandler}
            >
              {tag}
            </p>
          ))}
        {/* input  */}
        <input
          type="text"
          name="tagInput"
          id="tagInput"
          value={input}
          placeholder="Tag...."
          className="inline-block  py-1 focus:outline-slate-500 px-1  "
          onChange={inputChangeHandler}
          onKeyDown={commaKeyHandler}
          disabled={error}
        />
      </div>
      <p
        className={`text-placeholder py-1 text-right  ${
          error || (tagError && "text-red-400")
        }`}
      >
        {tagError ? tagError : `Max ${maxTags} tags`}
      </p>
    </div>
  );
}

export default Tag;
