import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
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
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });
  const toast = useRef<any>(null);

  const roles = [
    { name: "Admin", code: "ADM" },
    { name: "Manager", code: "MGR" },
    { name: "User", code: "USR" },
  ];

  function handleAddUser() {
    const newErrors = {
      firstName: !firstName ? "First name is required" : "",
      lastName: !lastName ? "Last name is required" : "",
      username: !username ? "Username is required" : "",
      password: !password ? "Password is required" : "",
      role: !selectedRole ? "Role is required" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

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
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "User added successfully",
          life: 3000,
        });
        setFirstName("");
        setLastName("");
        setPassword("");
        setUsername("");
        setSelectedRole(null);
        fetchUsersData();
        setShowAddUser(false);
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to add user, please check details",
          life: 3000,
        });
      });
  }

  return (
    <div className="flex flex-col mx-3">
      <Toast ref={toast} />
      <div className="flex items-center">
        <p className="text-lg font-semibold my-4">Create User</p>
        <Button
          icon="pi pi-plus-circle"
          className="h-5 ml-2 w-4"
          style={{
            color: "rgb(126 34 206)",
            background: "none",
            border: "none",
          }}
          onClick={(e) => {
            e.currentTarget.blur();
            setShowAddUser(true);
          }}
        />
      </div>
      <Dialog
        header="Add New User"
        visible={showAddUser}
        style={{ width: '450px' }}
        onHide={() => setShowAddUser(false)}
        className="p-fluid"
        footer={
          <div className="flex justify-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text text-purple-800"
              onClick={() => setShowAddUser(false)}
            />
            <Button
              label="Add User"
              icon="pi pi-check"
              className="bg-purple-800"
              onClick={handleAddUser}
            />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <InputText
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <small className="p-error">{errors.firstName}</small>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <InputText
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <small className="p-error">{errors.lastName}</small>}
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <small className="p-error">{errors.username}</small>}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <InputText
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small className="p-error">{errors.password}</small>}
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <Dropdown
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.value)}
            options={roles}
            optionLabel="name"
            placeholder="Select a Role"
          />
          {errors.role && <small className="p-error">{errors.role}</small>}
        </div>
      </Dialog>
    </div>
  );
};
