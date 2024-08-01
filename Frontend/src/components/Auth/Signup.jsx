import React from "react";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";

function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-slate-100 rounded-xl shadow-xl">
        <Heading label={"Sign up"} />
        <Paragraph label={"Enter your infromation to create an account"} />
        <Input placeholder="John" label={"First Name"} />
        <Input placeholder="Doe" label={"Last Name"} />
        <Input placeholder="abc@gmail.com" label={"Email"} />
        <Input placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"} />
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
