import { Routes, Route, Navigate } from "react-router-dom";
import Test from "./components/Test";
import Userpage from "./components/Userpage";
import Postpage from "./components/Postpage";
import Appbar from "./components/Appbar";
import Authpage from "./components/Authpage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";
import Homepage from "./components/Homepage";
import UserUpdate from "./components/UserUpdate";
import CreatePost from "./components/CreatePost";
import { Button } from "./components/ui/button";

const App = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  return (
    <div className="mx-auto max-w-[700px]">
      <div>
        <Appbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/update"
          element={user ? <UserUpdate /> : <Navigate to="/auth" />}
        />

        <Route path="/:username" element={<Userpage />} />
        <Route path="/:username/post/:postId" element={<Postpage />} />
        <Route
          path="/auth"
          element={!user ? <Authpage /> : <Navigate to="/" />}
        />
        {/* <Route path="/auth/login" element={<LoginPage />} /> */}

        <Route path="/test" element={<Test />} />
      </Routes>
      {user && <CreatePost />}
    </div>
  );
};

export default App;
