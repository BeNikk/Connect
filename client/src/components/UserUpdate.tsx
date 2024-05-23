"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import { useRecoilState } from "recoil";
import userAtom from "@/atoms/userAtom";
import useImagePreview from "@/hooks/useImagePreview";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "enter a valid email",
  }),
  name: z.string().min(2, {
    message: "Name should be minimum 2 letters",
  }),
  bio: z.string().min(5, {
    message: "Bio should be minimum 5 letters",
  }),
  password: z
    .string()
    .min(4, {
      message: "Password should be minimum 4 letters",
    })
    .max(50, {
      message: "Max 50 characters",
    }),
  profilePicture: z.optional(z.string()),
});

const UserUpdate = () => {
  const [user, setUser]: any = useRecoilState<any>(userAtom);
  const fileref = useRef<any>(null);
  const { handleImageChange, imageUrl, setImageUrl } = useImagePreview();
  const [updating, setUpdating] = useState(false);
  const userHeader = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      name: user.name,
      bio: user.bio,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUpdating(true);
      const updateData = {
        name: values.name,
        username: values.username,
        password: values.password,
        profilePicture: imageUrl,
        bio: values.bio,
        email: values.email,
      };

      const res = await fetch(
        `https://maitconnect.onrender.com/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            userId: userHeader,
            token: token,
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      if (data.error) {
        return toast.error("Error updating the profile");
      }
      toast.success("User updated successfully");

      setUser(data);
      localStorage.setItem("user-Info", JSON.stringify(data));
      navigate(`/${user.username}`);
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="w-3/4 mx-auto h-full bg-[#1F1E1F] text-white  p-4 rounded-xl mt-10">
      <p className="text-3xl font-bold mb-4">User Profile Edit</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Profile Picture
                </FormLabel>
                <Avatar
                  onClick={() => {
                    if (fileref.current) {
                      fileref.current.click();
                    }
                  }}
                  className="w-28 h-28"
                >
                  <AvatarImage
                    onChange={() => {
                      setImageUrl(imageUrl);
                    }}
                    src={imageUrl || user.profilePicture}
                    className=""
                  />
                  <AvatarFallback className="text-black">NB</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input
                    placeholder="Choose your profile picture"
                    type="file"
                    {...field}
                    ref={fileref}
                    onChange={handleImageChange}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Bio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="short description about yourself"
                    {...field}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="type a strong password"
                    {...field}
                    className="bg-[#1F1E1F] text-white border-neutral-700"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-center gap-10 items-center">
            <Button className="bg-red-500 text-lg font-bold p-4 ">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-500 text-lg font-bold p-4 "
              disabled={updating}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default UserUpdate;
