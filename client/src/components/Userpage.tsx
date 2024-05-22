import UserHeader from "./Nested/UserHeader";
import Userpost from "./Userpost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Post from "./Post";

const Userpage = () => {
  const [user, setUser] = useState<any>(null);
  const { username } = useParams();
  const [posts, setPost] = useState([]);
  const [fetchingPost, setFetchingPost] = useState(false);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      setFetchingPost(true);
      const res = await fetch(`/api/post/userpost/${username}`);
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      setPost(data);
    } catch (error) {
      toast.error("some error occured");
      setPost([]);
    } finally {
      setFetchingPost(false);
    }
  };
  useEffect(() => {
    getUser();
    getPosts();
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
        {!fetchingPost && posts.length == 0 && (
          <div>
            <p className="text-white mt-40 ml-52 text-xl">
              User does not have any post
            </p>
          </div>
        )}
        {fetchingPost && (
          <div>
            <p className="text-white mt-40 ml-52 text-xl">
              User does not have any post
            </p>{" "}
          </div>
        )}
        {posts &&
          posts.map((post: any) => {
            return (
              <div>
                <Post key={post._id} post={post} userId={post.postedBy} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Userpage;
