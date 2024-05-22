import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Logos from "./Logos";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
const Post = ({ post, userId }: any) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`/api/user/id/${userId}`);
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, [user]);
  let imageSource = "";
  if (user) {
    imageSource = user.profilePicture;
    if (imageSource == "") {
      imageSource = "/blank-profile-picture.png";
    }
  }
  if (!post) {
    return (
      <div>
        <div className="text-white">Loading</div>
      </div>
    );
  }
  return (
    <div className="mx-4 relative mt-12 border-t-2  border-gray-700 ">
      {user && post && (
        <div>
          <Link to={`${user.username}/post/${post._id}`}>
            <div className="flex flex-row gap-3 m-4">
              <div className="flex flex-col items-center justify-between">
                <Link to={user.username}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={imageSource} />
                    <AvatarFallback className="text-white">MZ</AvatarFallback>
                  </Avatar>
                </Link>
                <div className=" border-l-2 ml-6 border-gray-700 ">line</div>

                <div>
                  <div className="flex flex-row items-center">
                    <div>
                      {post.replies.length == 0 && (
                        <div>
                          <p className="text-2xl">🥱</p>
                        </div>
                      )}
                    </div>
                    {post.replies[0] && (
                      <Avatar className="w-8 h-8 -ml-1">
                        <AvatarImage src={post.replies[0].userProfilePic} />
                        <AvatarFallback className="text-white">
                          MZ
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {post.replies[1] && (
                      <Avatar className="w-8 h-8 -ml-1">
                        <AvatarImage src={post.replies[1].userProfilePic} />
                        <AvatarFallback className="text-white">
                          MZ
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {post.replies[2] && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={post.replies[2].userProfilePic} />
                        <AvatarFallback className="text-white">
                          MZ
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className=" flex flex-row gap-2 font-bold text-md lg:text-lg">
                  {user && (
                    <Link to={user.username}>
                      <p className="text-white font-bold text-md lg:text-lg cursor-pointer hover:underline">
                        {user.username}
                      </p>
                    </Link>
                  )}

                  <img src="/verified.png" alt="" className="w-4 h-4 mt-2" />
                </div>
                <div>
                  <p className="text-white">{post.text}</p>
                </div>
                {post.image && (
                  <div className="">
                    <img src={post.image} className="w-full " alt="" />
                  </div>
                )}
              </div>

              <div className="absolute right-0 mr-2">
                <p className="text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </p>
              </div>
            </div>
          </Link>

          <div className="mb-4 ml-20 ">
            <Logos post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
