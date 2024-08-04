import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import axios from "axios";

function User({ users, myBalance, setmyBalance }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");

  const openWindow = () => {
    setOpen(true);
  };

  const sendMoneyHandler = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/accounts/transfer-amount",
      { amount, to: userId },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    const newBalance = myBalance - amount;
    setmyBalance(newBalance);
    setOpen(false);
  };
  const closeWindow = () => {
    setOpen(false);
  };

  return (
    <div>
      {users.map((data, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {data.firstName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
              <div>
                {data.firstName} {data.lastName}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col justify-center h-ful"
            onClick={(e) => setUserId(data._id)}
          >
            <Button onClick={openWindow} label={"Send Money"} />
          </div>
          {open && (
            <div className="flex flex-col items-center justify-center p-4 absolute bg-white gap-4 border rounded-xl shadow-xl top-[30%] left-[40%]">
              <h2 className="text-2xl font-bold">Send Money</h2>
              <Input
                label={"Amount"}
                placeholder={"Amount"}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button label={"Send Money"} onClick={sendMoneyHandler} />
              <Button label={"Close"} onClick={closeWindow} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default User;
