import userAtom from "@/atoms/userAtom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

const UserHeader = ({ user }: any) => {
  const currentUser = useRecoilValue<any>(userAtom);
  console.log("hey", currentUser);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);
  const userHeader = localStorage.getItem("userId") || "";
  const handleFollow = async () => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/user/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userHeader,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      if (following) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);
      toast.success(data.message);
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between m-6 lg:m-2">
        <div className="flex flex-col justify-between ">
          <div className="flex flex-col gap-2">
            <p className="text-white font-extrabold text-2xl lg:text-3xl">
              {user.name}
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-white text-md">{user.username}</p>
              <div className="text-white font-light text-sm rounded-lg bg-gray-700 p-1">
                {user.email}
              </div>
            </div>
          </div>
          <div>
            <div className="mt-16 flex flex-col gap-4">
              <p className="text-white font-medium text-lg">{user.bio}</p>
              {currentUser._id == user._id && (
                <Link to="/update">
                  <Button>Update Profile</Button>
                </Link>
              )}
              {currentUser._id !== user._id && (
                <div>
                  <Button onClick={handleFollow} disabled={updating}>
                    {following ? "Unfollow" : "Follow"}
                  </Button>
                </div>
              )}
              <div className="flex flex-row items-center gap-2 mt-6">
                <p className="text-gray-400 hover:underline cursor-pointer">
                  {user.followers.length} followers
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
            <AvatarImage src={user.profilePicture} />
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
    </div>
  );
};

export default UserHeader;
