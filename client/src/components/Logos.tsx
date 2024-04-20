import { useState } from "react";

const Logos = () => {
  const [liked, setLike] = useState(false);
  return (
    <div className="flex flex-row items-center justify-start gap-4 ml-4">
      <div
        onClick={() => {
          setLike(!liked);
        }}
      >
        <img
          src="/heart-gray.svg"
          alt=""
          className={` ${
            liked ? "bg-red-500 rounded-md" : ""
          } w-8 h-8 cursor-pointer`}
        />
      </div>
      <div>
        <img src="/reply.svg" alt="" className="w-8 h-8" />
      </div>
      <div>
        <img src="/repost.svg" alt="" className="w-8 h-8" />
      </div>
      <div>
        <img src="/share.svg" alt="" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Logos;
