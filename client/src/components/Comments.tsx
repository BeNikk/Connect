import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// interface commentInterface {
//   userId: string;
//   avatar: string;
//   comment: string;
// }

const Comments = ({ userId, avatar, comment }: any) => {
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/id/${userId}`);
      const data = await res.json();
      if (data.erorr) {
        return toast.error(data.error);
      }
      setUser(data);
    } catch (error) {
      return toast.error("error");
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-start items-center gap-2 mt-6  border-t-2 border-gray-700 ">
        <Avatar className="w-10 h-10 mt-4">
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user && (
          <p className="text-white font-semibold text-xl mt-4">
            {user.username}
          </p>
        )}
      </div>
      <div>
        <p className="text-white">{comment}</p>
      </div>
      <div></div>
    </div>
  );
};

export default Comments;
