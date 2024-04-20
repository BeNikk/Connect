import UserHeader from "./Nested/UserHeader";
import Userpost from "./Userpost";

const Userpage = () => {
  return (
    <div className="mx-auto mt-10">
      <UserHeader />
      <div className="w-full flex flex-row justify-evenly items-center mt-12">
        <div className="text-white font-semibold text-xl border-b-2 border-white">
          Posts
        </div>
        <div className="text-white border-b-2 border-gray-400 font-semibold text-xl">
          Replies
        </div>
      </div>

      <Userpost />
    </div>
  );
};

export default Userpage;
