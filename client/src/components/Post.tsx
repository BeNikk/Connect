import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logos from "./Logos";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import postAtom from "@/atoms/postAtom";

const Post = ({ post, userId }: any) => {
  const [user, setUser] = useState<any>(null);
  const currentUser = useRecoilValue<any>(userAtom);
  const [posts, setPosts] = useRecoilState<any>(postAtom);
  const userHeader = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";
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
          <Link to={`/${user.username}/post/${post._id}`}>
            <div className="flex flex-row gap-3 m-4">
              <div className="flex flex-col items-center justify-between">
                <Link to={user.username}>
                  <Avatar className="-ml-6 w-12 h-12">
                    <AvatarImage src={imageSource} />
                    <AvatarFallback className="text-white">MZ</AvatarFallback>
                  </Avatar>
                </Link>
                <div className=" border-l-2 ml-2 border-gray-700 ">line</div>

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

              <div className="absolute right-0 mr-2 flex flex-row items-center gap-2">
                <p className="text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </p>
                {currentUser?._id == user._id && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Dialog>
                      <DialogTrigger>
                        <RiDeleteBin6Line className="text-white" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you absolutely sure you want to delete?
                          </DialogTitle>
                          <DialogDescription>
                            <Button
                              variant={"destructive"}
                              onClick={async (e: React.BaseSyntheticEvent) => {
                                e.preventDefault();
                                try {
                                  const res = await fetch(
                                    `/api/post/post/${post._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                        userId: userHeader,
                                        token: token,
                                      },
                                    }
                                  );
                                  const data = await res.json();
                                  if (data.error) {
                                    toast.error("Error in deleting the post");
                                  }
                                  toast.success(data.message);
                                  setPosts(
                                    posts.filter((p: any) => {
                                      p._id != post._id;
                                    })
                                  );
                                } catch (erorr) {
                                  return toast.error("error");
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
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
