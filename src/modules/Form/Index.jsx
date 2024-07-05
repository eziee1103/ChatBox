import { React, useState } from "react";
import Input from "../../components/Input/Index";
import Button from "../../components/Button/Index";
import { useNavigate } from "react-router-dom";
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
    const res = await fetch(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.status === 400) {
      alert("invalid Credentials");
    } else {
      const resdata = await res.json();
      // console.log(">>>data", resdata);
      if (resdata.token) {
        localStorage.setItem("user:token", resdata.token);
        localStorage.setItem("user:detail", JSON.stringify(resdata.user));
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="bg-light h-screen flex items-center">
        <div className="bg-white w-[600px] h-[800px] rounded-lg flex flex-col justify-center items-center shadow-lg mx-auto  ">
          <div className="text-4xl font-extrabold ">
            Welcome {isSignInPage && "back"}
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
                inputClassName="mb-6 "
                className="w-1/2 "
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
              inputClassName="mb-6 "
              className="w-1/2 "
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
              inputClassName="mb-6 "
              className="w-1/2 "
              value={data.password}
              onchange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              isRequired
            />
            <Button
              label={isSignInPage ? "Sign in" : "Sign up"}
              className="w-1/2 mb-2"
              type="submit"
            />
          </form>
          <div>
            {!isSignInPage
              ? "Already have an account?"
              : "Didn't have an account?"}
            <span
              onClick={() => navigate(`/${isSignInPage ? "signup" : "signin"}`)}
              className="text-primary cursor-pointer underline"
            >
              {!isSignInPage ? "Sign in" : "Sign up"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
