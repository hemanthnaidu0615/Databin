// import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import Table from "../components/user-management/Table";
import { useState } from "react";
import { AddUser } from "../components/user-management/AddUser";
import authFetch from "../axios";

export const UserManagement = () => {
  const [isUserManagement, setIsUserManagement] = useState(true);
  const [users, setUsers] = useState<any>();

  const fetchUsersData = async () => {
    try {
      const response = await authFetch("/tables/users");
      // const data = await response.json();
      console.log("API response:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-white m-1 rounded-sm">
      <div className="flex justify-between p-2 items-center">
        <p className="text-sm h-[18px] text-violet-800">Settings</p>
        <div className="flex">
          <Button
            className={
              isUserManagement
                ? "text-white text-xs m-1 p-2 border-0 bg-purple-700 font-semibold"
                : " text-xs m-1 p-2 bg-transparent text-black border-0 font-semibold"
            }
            onClick={() => setIsUserManagement(true)}
          >
            User Management
          </Button>
          <Button className=" text-xs m-1 p-2 bg-transparent text-black border-0 font-semibold">
            Profle Management
          </Button>
        </div>
      </div>
      {isUserManagement && (
        <div className="flex flex-col border-slate-200	border-2 rounded-md w-[98%] mx-2 shadow-lg ">
          <AddUser fetchUsersData={fetchUsersData} users={users} />
          <Table fetchUsersData={fetchUsersData} users={users} />
        </div>
      )}
    </div>
  );
};
