import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logos from "./Logos";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comments from "./Comments";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";
import postAtom from "@/atoms/postAtom";

const Postpage = () => {
  const { username } = useParams();
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useRecoilState<any>(postAtom);
  const { postId } = useParams();
  const currentUser = useRecoilValue<any>(userAtom);
  const userId = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/post/${postId}`);
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      setPost([data]);
    } catch (error) {
      toast.error("error");
    } finally {
      setLoading(false);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getPosts();
  }, [user]);
  const currentPost = post[0];

  if (
    !user &&
    loading && (
      <div>
        <p className="text-white">Loading</p>
      </div>
    )
  )
    if (!currentPost) {
      return null;
    }
  let imageSource = "";
  if (user) {
    imageSource = user.profilePicture;
    if (imageSource == "") {
      imageSource = "/blank-profile-picture.png";
    }
  }

  return (
    <div className="mt-8 mx-4">
      {currentPost && (
        <div>
          <div className="flex flex-col gap-4 justify-center mx-4">
            ""
            <div className="relative flex flex-row justify-between w-full">
              <div>
                <div className="flex flex-row justify-start items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={imageSource} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-bold text-2xl">
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start items-center gap-2">
                <p className="text-gray-400"></p>
                <div className="absolute right-0 mr-2 flex flex-row items-center gap-2">
                  <p className="text-gray-400">
                    {formatDistanceToNow(new Date(currentPost.createdAt))} ago
                  </p>
                  {currentUser?._id == user?._id && (
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
                                onClick={async () => {
                                  try {
                                    const res = await fetch(
                                      `/api/post/post/${currentPost._id}`,
                                      {
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                          userId: userId,
                                          token: token,
                                        },
                                      }
                                    );
                                    const data = await res.json();
                                    if (data.error) {
                                      toast.error("Error in deleting the post");
                                    }
                                    toast.success(data.message);
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
            </div>
            <div>
              <p className="text-white font-semibold ml-6">
                {currentPost.text}
              </p>
            </div>
            <div className="w-full">
              {currentPost.image && (
                <img
                  src={post.image}
                  alt="zuck-photo"
                  className="h-auto w-[100%] object-contain"
                />
              )}
            </div>
            <div>
              {" "}
              <Logos post={currentPost} />
            </div>
          </div>
          <div className="flex flex-row justify-evenly items-center gap-2 mt-4">
            <Input
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="👋 Comment to this post"
              className="bg-black text-white rounded-md"
            />
            <Button
              className="bg-gray-800 text-white border-0 border-black"
              onClick={async () => {
                try {
                  if (text == "") {
                    toast.error("enter some text to comment");
                  }
                  console.log(text);
                  const values = {
                    text: text,
                  };
                  const res = await fetch(
                    `/api/post/reply/${currentPost._id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        userId: userId,
                      },
                      body: JSON.stringify(values),
                    }
                  );
                  const data = await res.json();
                  if (data.error) {
                    return toast.error("error posting a reply");
                  }
                  toast.success("comment added");
                  navigate(`/${user.username}/post/${currentPost._id}`);
                } catch (error) {}
              }}
            >
              Comment
            </Button>
          </div>
          <div className="mb-4">
            {currentPost?.replies?.map((reply: any) => {
              return (
                <div key={reply._id}>
                  <Comments
                    userId={reply?.userId}
                    avatar={
                      reply?.userProfilePic || "/blank-profile-picture.png"
                    }
                    comment={reply?.text}
                  />
                  ;
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Postpage;
