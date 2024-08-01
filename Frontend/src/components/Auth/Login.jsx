import React from "react";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";

function Login() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Paragraph label={"Enter your credentials to access your account"} />
          <Input placeholder="harkirat@gmail.com" label={"Email"} />
          <Input placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
