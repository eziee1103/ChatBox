import { React, useState } from "react";
import Input from "../../components/Input/Index";
import Button from "../../components/Button/Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Form = ({ isSignInPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullname: "",
    }),
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("<<data-submit", data);

    const result = await axios.post(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      data
    );
    const register = async () => {
      try {
        console.log(">>>data", result);
        if (result.data.token) {
          console.log("hii");
          localStorage.setItem("user:token", result.data.token);
          localStorage.setItem("user:detail", JSON.stringify(result.data.user));
          navigate("/");
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    };
    register();
  };
  return (
    <>
      <div className="bg-my-gradient backdrop-blur-3xl  h-screen flex items-center text-white">
        <div className="bg-my-gradient w-[500px] border border-white p-5 rounded-lg flex flex-col justify-center m-5 items-center shadow-lg mx-auto  ">
          <div className="text-3xl font-extrabold ">
            Vigneshs {isSignInPage && "back"} to chat Box
          </div>
          <div className="text-xl font-light mb-14">
            {isSignInPage
              ? "Sign In to get explored"
              : "Sign up to get started"}
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center w-full"
          >
            {!isSignInPage && (
              <Input
                name="name"
                placeholder="Enter Your Name"
                label="Full Name"
                inputClassName="mb-4 "
                className="w-2/3"
                labebClassName=" text-white"
                value={data.fullname}
                onchange={(e) => {
                  setData({ ...data, fullname: e.target.value });
                }}
                isRequired
              />
            )}
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              label="Email Address"
              inputClassName="mb-4 "
              className="w-2/3"
              labebClassName=" text-white"
              value={data.email}
              onchange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              isRequired
            />
            <Input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              label="Password"
              inputClassName="mb-8 "
              className="w-2/3"
              labebClassName=" text-white"
              value={data.password}
              onchange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              isRequired
            />
            <Button
              label={isSignInPage ? "Sign in" : "Sign up"}
              className="w-2/3 mb-2 bg-my-gradient border border-white"
              type="submit"
            />
          </form>
          <div className="text-xs">
            {!isSignInPage
              ? "Already have an account?"
              : "Didn't have an account?"}
            <span
              onClick={() => navigate(`/${isSignInPage ? "signup" : "signin"}`)}
              className="text-primary cursor-pointer underline "
            >
              {!isSignInPage ? " Sign in" : " Sign up"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
