import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import userAtom from "@/atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

const Appbar = () => {
  const user = useRecoilValue<any>(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.removeItem("user-Info");
        toast.success(data.message);
        navigate("/auth");

        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between m-4">
        {!user && (
          <div>
            <p className="text-white">Loading</p>
          </div>
        )}
        {user && (
          <div>
            <Link to="/">
              <AiFillHome size={24} className="text-white cursor-pointer" />
            </Link>
          </div>
        )}

        <img src="/light-logo.svg" alt="image" className="w-8 h-8" />
        {user && (
          <div>
            <Link to={`/${user.username}`}>
              <RxAvatar size={24} className="text-white" />
            </Link>
          </div>
        )}
        {user && (
          <div onClick={handleLogout} className="">
            <IoIosLogOut className="text-white cursor-pointer " size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appbar;
