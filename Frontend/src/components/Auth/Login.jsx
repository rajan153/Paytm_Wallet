import React, { useState } from "react";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClick = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    navigate("/");
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Paragraph label={"Enter your credentials to access your account"} />
          <Input
            placeholder="harkirat@gmail.com"
            label={"Email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button onClick={onClick} label={"Sign in"} />
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
