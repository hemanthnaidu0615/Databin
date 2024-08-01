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
    
      console.log("API response:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-white m-1 rounded-sm">
      <div className="flex justify-between p-2 items-center">
        <p className="text-xl h-[19px] text-purple-800">Settings</p>
        <br></br>
        <br/>
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
