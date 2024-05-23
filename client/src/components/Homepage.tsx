import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Post from "./Post";
import { useRecoilState } from "recoil";
import postAtom from "@/atoms/postAtom";

// interface PostType {
//   text: string;
//   image: string;
//   postedBy: string;
// }
const Homepage = () => {
  const userId = localStorage.getItem("userId") || "";
  const [posts, setPosts] = useRecoilState<any>(postAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch(
          `https://maitconnect.onrender.com/api/post/feed`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
          }
        );
        const data = await res.json();
        setPosts(data);
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error in fetching the posts");
      }
    }
    getPosts();
  }, [setPosts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post: any) => (
        <div>
          <Post post={post} userId={post.postedBy} />
        </div>
      ))}
      {posts.length === 0 && (
        <div className="text-white">Follow users to get some posts</div>
      )}
    </div>
  );
};

export default Homepage;
