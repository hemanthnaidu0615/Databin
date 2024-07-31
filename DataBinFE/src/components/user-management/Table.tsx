import React, { useState, useEffect, ChangeEvent ,useRef} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import authFetch from "../../axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";


interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  password: string;
}

interface TableProps {
  fetchUsersData: () => Promise<void>;
  users: User[];
}

const Table: React.FC<TableProps> = ({ fetchUsersData, users }) => {
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<User>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const statuses = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Manager", value: "manager" },
  ];

  const toast = useRef<any>(null);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const onRowEdit = (index: number) => {
    setEditRowIndex(index);
    setEditedData(users[index]);
  };

  const onRowSave = async (id: number) => {
    try {
      await authFetch.put(`http://localhost:3000/v2/tables/updateUsers/${id}`, editedData);
      setEditRowIndex(null);
      fetchUsersData();
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Updated User",
        life: 3000,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could not update User",
        life: 3000,
      });
    }
  };

  const confirmDelete = (id: number) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (userToDelete !== null) {
      try {
        await authFetch.delete(`http://localhost:3000/v2/tables/deleteUser/${userToDelete}`);
        setShowDeleteConfirm(false);
        fetchUsersData();
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Deleted User Successfully",
          life: 3000,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete user",
          life: 3000,
        });
      }
    }
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof User
  ) => {
    const value = e.target.value;
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onDropdownChange = (e: { value: any }, field: keyof User) => {
    const val = e.value || "";
    setEditedData((prevData) => ({ ...prevData, [field]: val }));
  };

  const renderEditableCell = (rowData: User, field: keyof User) => {
    return editRowIndex === users.indexOf(rowData) ? (
      <InputText
        value={editedData[field] as string}
        onChange={(e) => onInputChange(e, field)}
      />
    ) : (
      rowData[field]
    );
  };

  const renderRoleDropdown = (rowData: User) => {
    return editRowIndex === users.indexOf(rowData) ? (
      <Dropdown
        value={editedData.role || ""}
        options={statuses}
        onChange={(e) => onDropdownChange(e, "role")}
        placeholder="Select a Role"
      />
    ) : (
      rowData.role
    );
  };

  const actionBodyTemplate = (rowData: User) => {
    const isEditing = editRowIndex === users.indexOf(rowData);

    return isEditing ? (
      <>
        <Button
          icon="pi pi-save"
          style={{background:"none",color:"grey",border:"none",marginRight:"0.5rem",outline:"none"}}
          onClick={() => onRowSave(rowData.id)}
        />
        <Button
          icon="pi pi-times"
          style={{background:"none",color:"red",border:"none",marginRight:"0.5rem"}}
          onClick={() => setEditRowIndex(null)}
        />
      </>
    ) : (
      <>
        <Button
          icon="pi pi-pen-to-square"
          style={{background:"none",color:"blue",border:"none"}}
          onClick={() => onRowEdit(users.indexOf(rowData))}
        />
        <Button
          icon="pi pi-trash"
          style={{background:"none",color:"red",border:"none"}}
          onClick={() => confirmDelete(rowData.id)}
        />
      </>
    );
  };

  return (
    <div className="h-full flex justify-center">
      <Toast ref={toast} />
      <DataTable
        size="small"
        className="text-xs mb-1 w-full mx-3"
        value={users}
        paginator
        rows={7}
        dataKey="id"
        showGridlines
        emptyMessage="No users found."
        paginatorClassName="bg-[#F9FAFB]"
        pt={{ header: { className: "bg-purple-200" } }}
      >
        <Column
          field="firstname"
          header="First Name"
          body={(rowData) => renderEditableCell(rowData, "firstname")}
          pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
        />
        <Column
          field="lastname"
          header="Last Name"
          body={(rowData) => renderEditableCell(rowData, "lastname")}
          pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
        />
        <Column
          field="username"
          header="Username"
          body={(rowData) => renderEditableCell(rowData, "username")}
          pt={{ headerCell: { className: "bg-purple-200" } }}
        />
        <Column
          field="role"
          header="Role"
          body={renderRoleDropdown}
          pt={{ headerCell: { className: "bg-purple-200" } }}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          pt={{ headerCell: { className: "bg-purple-200" } }}
        />
      </DataTable>

      {/* Confirmation Dialog */}
      <Dialog
        header="Confirm Deletion"
        visible={showDeleteConfirm}
        style={{ width: '30vw' }}
        footer={
          <div>
            <Button label="No" icon="pi pi-times" onClick={() => setShowDeleteConfirm(false)} className="text-red-800 bg-white border-white"  />
            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} autoFocus className=" bg-purple-800 border-white" />
          </div>
        }
        onHide={() => setShowDeleteConfirm(false)}
      >
        <p >Are you sure you want to delete this user?</p>
      </Dialog>
    </div>
  );
};

export default Table;
