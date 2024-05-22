import { useState } from "react";

const Logos = ({ post }: any) => {
  const [liked, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(1200);
  console.log(post);

  return (
    <div className="flex flex-col justify-start ">
      {post && (
        <div>
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
            <div className="text-gray-400 hover:underline ">
              {post.replies.length} replies
            </div>

            <div className="text-gray-400 hover:underline">
              {post.likes.length} likes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logos;
