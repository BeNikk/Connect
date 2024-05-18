import { useRecoilValue } from "recoil";
import LoginPage from "./LoginPage";
import authScreenAtom from "@/atoms/authAtom";
import Signup from "./Nested/Signup";

const Authpage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <p className="text-white">
        {authScreenState == "login" ? <LoginPage /> : <Signup />}
      </p>
    </div>
  );
};

export default Authpage;
