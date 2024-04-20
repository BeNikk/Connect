import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsInstagram } from "react-icons/bs";

const UserHeader = () => {
  return (
    <div className="flex flex-row justify-between m-6 lg:m-2">
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col gap-2">
          <p className="text-white font-extrabold text-2xl lg:text-3xl">
            Mark Zuckerberg
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-white text-md">zuckonit</p>
            <div className="text-white font-light text-sm rounded-lg bg-gray-700 p-1">
              connect.net
            </div>
          </div>
        </div>
        <div>
          <div className="mt-16 flex flex-col gap-4">
            <p className="text-white font-medium text-lg">
              Co-founder, executive chairman and CEO of Meta platforms
            </p>
            <div className="flex flex-row items-center gap-2 mt-6">
              <p className="text-gray-400 hover:underline cursor-pointer">
                3.2k followers
              </p>
              <p className="text-gray-400 cursor-pointer ">.</p>
              <p className="text-gray-400 hover:underline cursor-pointer">
                instagram.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <Avatar className="w-28 h-28 lg:w-28 lg:h-28">
          <AvatarImage src="/zuck-avatar.png" />
          <AvatarFallback className="text-white">MZ</AvatarFallback>
        </Avatar>
        <div className="cursor-pointer">
          <BsInstagram
            size={28}
            color="white"
            className="hover:rounded-lg hover:bg-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
