import userAtom from "@/atoms/userAtom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { read } from "fs";
import { useNavigate } from "react-router-dom";
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

const Logos = ({ post: post_ }: { post: any }) => {
  const user = useRecoilValue<any>(userAtom);
  const [liked, setLiked] = useState(post_?.likes.includes(user?._id));
  const userId = localStorage.getItem("userId") || "";
  const [post, setPost] = useState(post_);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleLikeUnlike() {
    if (!user) {
      toast.error("Login required");
    }
    try {
      setLoading(true);
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
    try {
      const res = await fetch(`/api/post/reply/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        return toast.error("error posting a reply");
      }
      toast.success(data.message);
      navigate(`/${user.username}/post/${post._id}`);
    } catch (error) {}

    console.log(values);
  }

  console.log(post_);

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
