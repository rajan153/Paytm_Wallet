import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logoutHanlder = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="shadow flex justify-between p-4 items-center">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        {token && <Button label={"Logout"} onClick={logoutHanlder} />}
      </div>
    </div>
  );
}

export default Navbar;
