import userAtom from "@/atoms/userAtom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";

// interface Post{
//   postedBy:string;
//   likes:any[];
//   replies:any[];
//   text:string;
//   image:string;

// }
// interface post{
//   post:Post[]
// }

const Logos = ({ post: post_ }: { post: any }) => {
  const user = useRecoilValue<any>(userAtom);
  const [liked, setLiked] = useState(post_.likes.includes(user?._id));
  const userId = localStorage.getItem("userId") || "";
  const [post, setPost] = useState(post_);
  async function handleLikeUnlike() {
    if (!user) {
      toast.error("Login required");
    }
    try {
      const res = await fetch(`/api/post/like/${post_._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      if (!liked) {
        setPost({ ...post, likes: [...post.likes, user._id] });
      } else {
        setPost({
          ...post,
          likes: post.likes.filter((id: any) => id != user._id),
        });
      }
      setLiked(!liked);
      console.log(data);
    } catch (error) {
      return toast.error("erorr occured");
    }
  }

  console.log(post_);

  return (
    <div className="flex flex-col justify-start ">
      {post && (
        <div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div onClick={() => {}}>
              <img
                src={`${liked ? "/heart-filled.svg" : "/heart-gray.svg"}`}
                alt=""
                className={`cursor-pointer w-8 h-8`}
                onClick={handleLikeUnlike}
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
