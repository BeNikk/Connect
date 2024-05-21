"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useImagePreview from "@/hooks/useImagePreview";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  text: z.optional(z.string()),
  image: z.optional(z.string()),
});

const CreatePost = () => {
  const postedUser = localStorage.getItem("userId") || "";
  console.log(postedUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const dataToPost = {
        text: values.text,
        image: imageUrl,
        postedBy: JSON.parse(postedUser),
      };
      console.log(dataToPost);
      const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: postedUser,
        },
        body: JSON.stringify(dataToPost),
      });
      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }
      toast.success(data.message);
    } catch (error) {
      return toast.error("Some error occured");
    }
  }
  const imageRef = useRef<any>(null);
  const { handleImageChange, imageUrl, setImageUrl } = useImagePreview();

  return (
    <div className="fixed bottom-6 right-10 lg:right-96 p-2">
      <Dialog>
        <DialogTrigger className="p-2">
          <Button> + Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a post</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Input placeholder="caption" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder=""
                            {...field}
                            ref={imageRef}
                            onChange={handleImageChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imageUrl && (
                    <div className="relative">
                      <img src={imageUrl} alt="Selected Image" />
                      <Button
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImageUrl(null);
                        }}
                      >
                        ✘
                      </Button>
                    </div>
                  )}
                  <Button type="submit">Post</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
