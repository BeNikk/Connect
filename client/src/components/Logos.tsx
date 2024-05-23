import userAtom from "@/atoms/userAtom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

("use client");

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import postAtom from "@/atoms/postAtom";
// interface Post{
//   postedBy:string;
//   likes:any[];
//   replies:any[];
//   text:string;
//   image:string;
const formSchema = z.object({
  text: z.string().min(1, {
    message: "reply must be at least 1 characters.",
  }),
});
// }
// interface post{
//   post:Post[]
// }

const Logos = ({ post }: any) => {
  const user = useRecoilValue<any>(userAtom);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const userId = localStorage.getItem("userId");
  const [posts, setPost] = useRecoilState<any>(postAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleLikeUnlike() {
    if (!user) {
      return toast.error("Login required");
    }
    if (!userId) {
      return toast.error("unauthorized to like");
    }
    try {
      console.log("here inside logos");
      setLoading(true);
      const res = await fetch(
        `https://maitconnect.onrender.com/api/post/like/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      if (!liked) {
        const updatedPosts = posts.map((p: any) => {
          if (p._id == post._id) {
            return { ...p, likes: [...p.likes, user._id] };
          }
          return p;
        });
        setPost(updatedPosts);
      } else {
        const updatedPosts = posts.map((p: any) => {
          if (p._id == post._id) {
            return { ...p, likes: p.likes.filter((id: any) => id != user._id) };
          }
          return p;
        });
        setPost(updatedPosts);
      }

      setLiked(!liked);
    } catch (error) {
      return toast.error("erorr occured");
    } finally {
      setLoading(false);
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      return toast.error("login to reply");
    }
    if (!userId) {
      return toast.error("unauthorized to comment");
    }
    try {
      const res = await fetch(
        `https://maitconnect.onrender.com/api/post/reply/${post._id}`,
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
      const updatedPosts = posts.map((p: any) => {
        if (p._id == post._id) {
          return { ...p, replies: [...p.replies, data] };
        }
        return p;
      });
      setPost(updatedPosts);
      toast.success("Reply added");

      navigate(`/${user.username}/post/${post._id}`);
    } catch (error) {
      toast.error("some error occured");
    }
  }

  return (
    <div className="flex flex-col justify-start ">
      {post && (
        <div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div>
              <button disabled={loading}>
                <img
                  src={`${liked ? "/heart-filled.svg" : "/heart-gray.svg"}`}
                  alt=""
                  className={`cursor-pointer w-8 h-8`}
                  onClick={handleLikeUnlike}
                />
              </button>
            </div>
            <div>
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <img src="/reply.svg" alt="" className="w-8 h-8" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reply to post</DialogTitle>
                    <DialogDescription>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
                          <FormLabel></FormLabel>
                          <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="reply goes here"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Reply</Button>
                        </form>
                      </Form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
              {post?.replies?.length} replies
            </div>

            <div className="text-gray-400 hover:underline">
              {post?.likes?.length} likes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logos;
