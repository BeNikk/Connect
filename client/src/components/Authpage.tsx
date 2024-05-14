import Signup from "./Nested/Signup";

const Authpage = () => {
  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <p className="text-white">
        <Signup />
      </p>
    </div>
  );
};

export default Authpage;
