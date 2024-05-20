import UserHeader from "./Nested/UserHeader";
import Userpost from "./Userpost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Userpage = () => {
  const [user, setUser] = useState<any>(null);
  const { username } = useParams();

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [username]);

  if (!user) {
    return (
      <>
        <div className="text-white">Loading</div>
      </>
    );
  }
  if (user) {
    console.log(user);
  }

  return (
    <div>
      <div className="mx-auto mt-10">
        <UserHeader user={user} />
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
      </div>
    </div>
  );
};

export default Userpage;
