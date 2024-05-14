import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import Userpage from "./components/Userpage";
import Postpage from "./components/Postpage";
import Appbar from "./components/Appbar";
import Authpage from "./components/Authpage";
const App = () => {
  return (
    <div className="mx-auto max-w-[700px]">
      <Appbar />
      <Router>
        <Routes>
          <Route path="/:username" element={<Userpage />} />
          <Route path="/:username/post/:postId" element={<Postpage />} />
          <Route path="/auth" element={<Authpage />} />

          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
