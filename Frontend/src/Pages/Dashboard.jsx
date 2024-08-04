import React, { useEffect, useState } from "react";
import Signup from "../components/Auth/Signup";
import Balance from "../components/Dashboard/Balance";
import User from "../components/Dashboard/User";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUser] = useState([]);
  const [myBalance, setmyBalance] = useState(null);

  const balanceInfo = async () => {
    const balanceResponse = await axios.get(
      "http://localhost:3000/api/v1/accounts/check-balance",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setmyBalance(balanceResponse.data.balance);
  };

  const userHandler = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/getusers",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setUser(response.data.response);
  };

  useEffect(() => {
    userHandler();
  }, []);

  useEffect(() => {
    balanceInfo();
  }, [myBalance]);

  return (
    <div>
      {!token ? (
        <Signup />
      ) : (
        <div className="mt-8 p-4 flex flex-col gap-8">
          <Balance balance={myBalance} setmyBalance={setmyBalance} />
          <User users={users} setmyBalance={setmyBalance} myBalance={myBalance} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
