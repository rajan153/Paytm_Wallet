import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import axios from "axios";

function Balance({ balance, setmyBalance }) {
  const [open, setOpen] = useState(false);
  const [money, setAddingAmount] = useState("");

  const openWindow = () => {
    setOpen(true);
  };

  const closeWindow = () => {
    setOpen(false);
  };

  const addMoneyHandler = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/accounts/add-balance",
      { money },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setmyBalance(money);
    setOpen(false);
  };

  return (
    <div className="font-bold flex justify-between border p-4 items-center relative">
      <h1 className="text-2xl">
        My Balance: <span className="font-medium">{balance}</span>
      </h1>
      <div>
        <Button label={"Add Money"} onClick={openWindow} />
      </div>
      {open && (
        <div className="flex flex-col items-center justify-center p-4 absolute bg-white gap-4 border rounded-xl shadow-xl top-[50%] left-[40%]">
          <h2 className="text-2xl font-bold">Add Money</h2>
          <Input
            label={"Amount"}
            placeholder={"Add Amount"}
            onChange={(e) => setAddingAmount(e.target.value)}
          />
          <Button label={"Add Money"} onClick={addMoneyHandler} />
          <Button label={"Close"} onClick={closeWindow} />
        </div>
      )}
    </div>
  );
}

export default Balance;
