import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logos from "./Logos";

interface commentInterface {
  username: string;
  avatar: string;
  comment: string;
}
const Comments = ({ username, avatar, comment }: commentInterface) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-start items-center gap-2 mt-6  border-t-2 border-gray-700 ">
        <Avatar className="w-10 h-10 mt-4">
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-white font-semibold text-xl mt-4">{username}</p>
      </div>
      <div>
        <p className="text-white">{comment}</p>
      </div>
      <div>
        <Logos />
      </div>
    </div>
  );
};

export default Comments;
