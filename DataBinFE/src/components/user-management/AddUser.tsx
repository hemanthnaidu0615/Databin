import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import authFetch from "../../axios";

interface Role {
  name: string;
  code: string;
}

export const AddUser = ({ fetchUsersData }: any) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { name: "Admin", code: "ADM" },
    { name: "Manager", code: "MGR" },
    { name: "User", code: "USR" },
  ];

  function handleAddUser() {
    const data = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      role: selectedRole?.name,
      password: password,
    };

    authFetch
      .post("/tables/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFirstName("");
        setLastName("");
        setPassword("");
        setUsername("");
        fetchUsersData();
        setShowAddUser(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="flex flex-col mx-3">
      <div className="flex items-center">
        <p className="text-sm font-semibold my-4">Create User</p>
        <Button
          icon="pi pi-plus-circle"
          className="h-5 ml-2 w-4"
          style={{
            color: "rgb(126 34 206)",
            background: "none",
            border: "none",
          }}
          onClick={() => setShowAddUser(true)}
        />
      </div>
      {showAddUser && (
        <div className="flex bg-purple-100 p-4 mb-3">
          <div className="card px-2.5">
            <p className="text-xs font-medium mb-1">First Name</p>
            <InputText
              className="h-[34px] w-52 text-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="card px-2.5">
            <p className="text-xs font-medium mb-1">Last Name</p>
            <InputText
              className="h-[34px] w-52 text-xs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="card px-2.5">
            <p className="text-xs font-medium mb-1">Username</p>
            <InputText
              className="h-[34px] w-52 text-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="card px-2.5">
            <p className="text-xs font-medium mb-1">Password</p>
            <InputText
              type="password"
              className="h-[34px] w-52 text-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card px-2.5">
            <p className="text-xs font-medium mb-1">Role</p>
            <Dropdown
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.value)}
              options={roles.map((role) => ({
                name: role.name,
                code: role.code,
              }))}
              // options={roles}
              optionLabel="name"
              placeholder="Admin"
              className="h-[34px] w-52 text-xs p-1"
              pt={{
                input: { className: "text-xs p-0 " },
                trigger: { className: "h-2 w-3 ml-2 " },
                root: { className: " items-center justify-center" },
              }}
            />
          </div>
          <Button
            className="flex justify-center ml-2 mt-5 text-white text-xs p-2 border-0 bg-purple-700 font-semibold h-[34px] w-24"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      )}
    </div>
  );
};