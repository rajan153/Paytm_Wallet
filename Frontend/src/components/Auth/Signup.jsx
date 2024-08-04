import React, { useState } from "react";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClick = async () => {
    await axios.post("http://localhost:3000/api/v1/users/regiters", {
      username,
      firstName,
      lastName,
      password,
    });
    navigate("/login");
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-slate-100 rounded-xl shadow-xl">
        <Heading label={"Sign up"} />
        <Paragraph label={"Enter your infromation to create an account"} />
        <Input
          placeholder="John"
          label={"First Name"}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Doe"
          label={"Last Name"}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder="abc@gmail.com"
          label={"Email"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="123456"
          label={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-4">
          <Button label={"Sign up"} onClick={onClick} />
        </div>
        <BottomWarning
          buttonText={"Login"}
          to={"/login"}
          label={"Already have an account?"}
        />
      </div>
    </div>
  );
}

export default Signup;
