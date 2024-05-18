import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Test from "./components/Test";
import Userpage from "./components/Userpage";
import Postpage from "./components/Postpage";
import Appbar from "./components/Appbar";
import Authpage from "./components/Authpage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Homepage from "./components/Homepage";
const App = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <div className="mx-auto max-w-[700px]">
      <Appbar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="/auth" />}
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
      </Router>
    </div>
  );
};

export default App;
