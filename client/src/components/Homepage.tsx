import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Post from "./Post";

const Homepage = () => {
  const userId = localStorage.getItem("userId") || "";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch(`/api/post/feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
          },
        });
        const data = await res.json();
        setPosts(data);
        if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        return toast.error("Error in fetching the posts");
      }
    }
    getPosts();
  }, []);
  return (
    <div>
      <div>{!posts && <div>Loading</div>}</div>
      {posts &&
        posts.map((post: any) => {
          return (
            <div>
              <Post post={post} userId={post.postedBy} />
            </div>
          );
        })}
    </div>
  );
};

export default Homepage;
