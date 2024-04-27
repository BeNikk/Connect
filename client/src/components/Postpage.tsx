import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Logos from "./Logos";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comments from "./Comments";

const Postpage = () => {
  return (
    <div className="mt-8 mx-4">
      <div className="flex flex-col gap-4 justify-center mx-4">""
        <div className="flex flex-row justify-between w-full">
          <div>
            <div className="flex flex-row justify-start items-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/zuck-avatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-bold text-2xl">Mark Zuckerberg</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-gray-400">1d</p>
            <BsThreeDots className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-white font-semibold ml-6">
            Hey this is the post page
          </p>
        </div>
        <div className="w-full">
          <img
            src="/post1.png"
            alt="zuck-photo"
            className="h-auto w-[100%] object-contain"
          />
        </div>
        <div>
          <Logos />
        </div>
      </div>
      <div className="flex flex-row justify-evenly items-center gap-2 mt-4">
        <Input
          placeholder="👋 Comment to this post"
          className="bg-black text-white rounded-md"
        />
        <Button className="bg-gray-800 text-white border-0 border-black">
          Comment
        </Button>
      </div>
      <div className="mb-4">
        <Comments
          username="Nikhil"
          avatar="/avatar2.jpg"
          comment="looking good"
        />
        <Comments
          username="Nikhil"
          avatar="/avatar2.jpg"
          comment="looking good"
        />
        <Comments
          username="Nikhil"
          avatar="/avatar2.jpg"
          comment="looking good"
        />
      </div>
    </div>
  );
};

export default Postpage;
