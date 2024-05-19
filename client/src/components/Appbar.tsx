import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import userAtom from "@/atoms/userAtom";
import { toast } from "react-hot-toast";

const Appbar = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  async function handleLogout() {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.removeItem("user-Info");
        toast.success(data.message);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex flex-row items-center justify-evenly m-4">
        <img src="/light-logo.svg" alt="image" className="w-8 h-8" />
        {user && <Button onClick={handleLogout}>Logout</Button>}
      </div>
    </div>
  );
};

export default Appbar;
