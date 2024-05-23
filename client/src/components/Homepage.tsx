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
  const [posts, setPosts] = useRecoilState<any>(postAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch(`/api/post/feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  console.log("hey i am posts");
  console.log(posts);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!posts) {
    return null;
  }

  return (
    <div>
      hello
      {posts &&
        posts.map((post: any) => (
          <div>
            <Post post={post} userId={post.postedBy} />
          </div>
        ))}
      {posts && posts.length == 0 && (
        <div className="text-white">Follow users to get some posts</div>
      )}
    </div>
  );
};

export default Homepage;
