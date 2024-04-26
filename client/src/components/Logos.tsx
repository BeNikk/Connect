import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Logos = () => {
  const [liked, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(1200);

  return (
    <div className="flex flex-col justify-start ">
      <div className="flex flex-row items-center justify-start gap-4">
        <div
          onClick={() => {
            ``;
            setLike(!liked);
          }}
        >
          <img
            src={`${liked ? "/heart-filled.svg" : "/heart-gray.svg"}`}
            alt=""
            className={` w-8 h-8`}
            onClick={() => {
              if (!liked) setCountLikes(countLikes + 1);
              else {
                setCountLikes(countLikes - 1);
              }
            }}
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
      <div className="flex flex-row gap-2 mt-4">
        <div className="text-gray-400 hover:underline ">437 replies</div>
        <div className="text-gray-400 hover:underline">{countLikes} likes</div>
      </div>
    </div>
  );
};

export default Logos;
