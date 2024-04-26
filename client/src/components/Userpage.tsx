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

      <Userpost postTitle="Hey How am i looking" postImage="/post1.png" />
      <Userpost postTitle="this app is super cool" postImage="/post2.png" />
      <Userpost postTitle="I can't get over this" postImage="/post3.png" />
      <Userpost postTitle="Hey this is my first post" />
    </div>
  );
};

export default Userpage;
