import Table from "../components/user-management/Table";
import { useState } from "react";
import { AddUser } from "../components/user-management/AddUser";
import authFetch from "../axios";
import { Button } from "primereact/button";
export const UserManagement = () => {
  const [isUserManagement, setIsUserManagement] = useState(true);
  const [users, setUsers] = useState<any>();
  const [isUserManagementVisible, setIsUserManagementVisible] = useState(false);
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
      <p className="font-semibold text-2xl text-violet-800 py-2 px-3">Settings</p>
      <br/> <br/>
      </div>
       {isUserManagementVisible && (
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
              Profile Management
            </Button>
        </div>
      )}
      {isUserManagement && (
        <div className="flex flex-col border-slate-200	border-2 rounded-md w-[98%] mx-2 shadow-lg ">
          <AddUser fetchUsersData={fetchUsersData} users={users} />
          <Table fetchUsersData={fetchUsersData} users={users} />
        </div>
      )}
    </div>
  );
};
