// import { useEffect, useState } from "react";
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import { Tag } from "primereact/tag";
// import { ProgressSpinner } from "primereact/progressspinner";

// export default function Table({ fetchUsersData, users }: any) {
//   const [filters, setFilters] = useState({});
//   const [globalFilterValue, setGlobalFilterValue] = useState("");

//   const [statuses] = useState([
//     "unqualified",
//     "qualified",
//     "new",
//     "negotiation",
//     "renewal",
//   ]);

//   const initFilters = () => {
//     setFilters({
//       global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//       name: {
//         operator: FilterOperator.AND,
//         constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//       },
//       "country.name": {
//         operator: FilterOperator.AND,
//         constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//       },
//       representative: { value: null, matchMode: FilterMatchMode.IN },
//       date: {
//         operator: FilterOperator.AND,
//         constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
//       },
//       balance: {
//         operator: FilterOperator.AND,
//         constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//       },
//       status: {
//         operator: FilterOperator.OR,
//         constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//       },
//       activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
//       verified: { value: null, matchMode: FilterMatchMode.EQUALS },
//     });
//     setGlobalFilterValue("");
//   };

//   useEffect(() => {
//     fetchUsersData();
//     initFilters();
//   }, []);

//   if (!users) {
//     return (
//       <div className="flex justify-center items-center my-auto">
//         <ProgressSpinner />
//       </div>
//     );
//   }

//   function formatUserData(userData: any) {
//     return userData.map((item: any) => {
//       return {
//         itemID: item.id,
//         firstname: item.firstname,
//         lastname: item.lastname,
//         username: item.username,
//         role: item.role,
//       };
//     });
//   }

//   const clearFilter = () => {
//     initFilters();
//   };

//   const onGlobalFilterChange = (e: any) => {
//     const value = e.target.value;
//     let _filters: any = { ...filters };

//     _filters["global"].value = value;

//     setFilters(_filters);
//     setGlobalFilterValue(value);
//   };

//   const renderHeader = () => {
//     return (
//       <div className="flex justify-between  ">
//         <Button
//           type="button"
//           icon="pi pi-filter-slash"
//           label="Clear"
//           outlined
//           onClick={clearFilter}
//           className="text-xs text-purple-800"
//         />
//         <span className="p-input-icon-left">
//           <i className="pi pi-search" />
//           <InputText
//             className="text-xs"
//             value={globalFilterValue}
//             onChange={onGlobalFilterChange}
//             placeholder="Keyword Search"
//             pt={{ root: { className: "text-red-100" } }}
//           />
//         </span>
//       </div>
//     );
//   };

//   const filterClearTemplate = (options: any) => {
//     return (
//       <Button
//         type="button"
//         icon="pi pi-times"
//         onClick={options.filterClearCallback}
//         severity="secondary"
//       ></Button>
//     );
//   };

//   const filterApplyTemplate = (options: any) => {
//     return (
//       <Button
//         type="button"
//         icon="pi pi-check"
//         onClick={options.filterApplyCallback}
//         severity="success"
//       ></Button>
//     );
//   };

//   const filterFooterTemplate = () => {
//     return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
//   };

//   const statusFilterTemplate = (options: any) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={statuses}
//         onChange={(e) => options.filterCallback(e.value, options.index)}
//         itemTemplate={statusItemTemplate}
//         placeholder="Select One"
//         className="p-column-filter"
//         showClear
//       />
//     );
//   };

//   const statusItemTemplate = (option: any) => {
//     return <Tag value={option} />;
//   };

//   const header = renderHeader();
//   console.log(header);

//   return (
//     <div className="h-full flex justify-center">
//       <DataTable
//         size="small"
//         className="text-xs mb-1 w-full mx-3"
//         value={formatUserData(users)}
//         paginator
//         paginatorClassName="bg-purple-100 "
//         showGridlines
//         rows={7}
//         dataKey="id"
//         filters={filters}
//         globalFilterFields={[
//           "name",
//           "firstname.name",
//           "representative.name",
//           "lastname.name",
//           "username.name",
//           "balance",
//           "status",
//         ]}
//         // header={header}
//         emptyMessage="No customers found."
//         pt={{
//           header: { className: "bg-purple-200" },
//         }}
//       >
//         <Column
//           field="firstname"
//           header="First name"
//           filterField="firstname.name"
//           style={{ minWidth: "12rem" }}
//           filter
//           filterPlaceholder="Search by firstname"
//           filterClear={filterClearTemplate}
//           filterApply={filterApplyTemplate}
//           filterFooter={filterFooterTemplate}
//           pt={{
//             bodyCell: { className: "bg-purple-100" },
//             headerCell: { className: "bg-purple-200" },
//           }}
//         />
//         <Column
//           field="lastname"
//           header="Last name"
//           filterField="lastname.name"
//           style={{ minWidth: "12rem" }}
//           filter
//           filterPlaceholder="Search by last name"
//           filterClear={filterClearTemplate}
//           filterApply={filterApplyTemplate}
//           filterFooter={filterFooterTemplate}
//           pt={{
//             bodyCell: { className: "bg-purple-100" },
//             headerCell: { className: "bg-purple-200" },
//           }}
//         />
//         <Column
//           field="username"
//           header="User Name"
//           filterField="username.name"
//           style={{ minWidth: "12rem" }}
//           filter
//           filterPlaceholder="Search by username"
//           filterClear={filterClearTemplate}
//           filterApply={filterApplyTemplate}
//           filterFooter={filterFooterTemplate}
//           pt={{
//             bodyCell: { className: "bg-purple-100" },
//             headerCell: { className: "bg-purple-200" },
//           }}
//         />

//         <Column
//           field="role"
//           header="Role"
//           filterMenuStyle={{ width: "14rem" }}
//           style={{ minWidth: "12rem" }}
//           filter
//           filterElement={statusFilterTemplate}
//           pt={{
//             bodyCell: { className: "bg-purple-100" },
//             headerCell: { className: "bg-purple-200" },
//           }}
//         />
//       </DataTable>
//     </div>
//   );
// }



// import React, { useState, useEffect, ChangeEvent } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
// import axios from "axios";
// import authFetch from "../../axios";

// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   username: string;
//   role: string;
// }

// interface TableProps {
//   fetchUsersData: () => Promise<void>;
//   users: User[];
// }

// const Table: React.FC<TableProps> = ({ fetchUsersData, users }) => {
//   const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
//   const [editedData, setEditedData] = useState<Partial<User>>({});
//   const statuses = [
//     { label: "Admin", value: "admin" },
//     { label: "User", value: "user" },
//   ];

//   useEffect(() => {
//     fetchUsersData();
//   }, [fetchUsersData]);

//   const onRowEdit = (index: number) => {
//     setEditRowIndex(index);
//     setEditedData(users[index]);
//   };

//   const onRowSave = async (id: number) => {
//     try {
//       const username = editedData.username;
//      // await axios.put(`/tables/users/${id}`, editedData);
//       const response = await authFetch(`http://localhost:3000/v2/tables/updateUsers/${editedData.username}`,editedData);
//       setEditRowIndex(null);
//       fetchUsersData();
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const onRowDelete = async (id: number) => {
//     try {
//       await axios.delete(`/tables/deleteusers/${id}`);
//       fetchUsersData();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const onInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//     field: keyof User
//   ) => {
//     const value = e.target.value;
//     setEditedData((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const renderEditableCell = (rowData: User, field: keyof User) => {
//     return editRowIndex === users.indexOf(rowData) ? (
//       <InputText
//         value={editedData[field] as string}
//         onChange={(e) => onInputChange(e, field)}
//       />
//     ) : (
//       rowData[field]
//     );
//   };

//   const renderRoleDropdown = (rowData: User) => {
//     return editRowIndex === users.indexOf(rowData) ? (
//       <Dropdown
//         value={editedData.role}
//         options={statuses}
//         onChange={(e) => onInputChange(e.originalEvent as ChangeEvent<HTMLSelectElement>, "role")}
//         placeholder="Select a Role"
//       />
//     ) : (
//       rowData.role
//     );
//   };

//   const actionBodyTemplate = (rowData: User) => {
//     const isEditing = editRowIndex === users.indexOf(rowData);

//     return isEditing ? (
//       <>
//         <Button
//           icon="pi pi-save"
//           className="p-button-rounded p-button-success p-mr-2"
//           onClick={() => onRowSave(rowData.id)}
//         />
//         <Button
//           icon="pi pi-times"
//           className="p-button-rounded p-button-secondary"
//           onClick={() => setEditRowIndex(null)}
//         />
//       </>
//     ) : (
//       <>
//         <Button
//           icon="pi pi-pencil"
//           className="p-button-rounded p-button-warning p-mr-2"
//           onClick={() => onRowEdit(users.indexOf(rowData))}
//         />
//         <Button
//           icon="pi pi-trash"
//           className="p-button-rounded p-button-danger"
//           onClick={() => onRowDelete(rowData.id)}
//         />
//       </>
//     );
//   };

//   return (
//     <div className="h-full flex justify-center">
//       <DataTable
//         size="small"
//         className="text-xs mb-1 w-full mx-3"
//         value={users}
//         paginator
//         rows={7}
//         dataKey="id"
//         showGridlines
//         emptyMessage="No users found."
//         paginatorClassName="bg-purple-100"
//         pt={{ header: { className: "bg-purple-200" } }}
//       >
//         <Column
//           field="firstname"
//           header="First Name"
//           body={(rowData) => renderEditableCell(rowData, "firstname")}
//           pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
//         />
//         <Column
//           field="lastname"
//           header="Last Name"
//           body={(rowData) => renderEditableCell(rowData, "lastname")}
//           pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
//         />
//         <Column
//           field="username"
//           header="Username"
//           body={(rowData) => renderEditableCell(rowData, "username")}
//           pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
//         />
//         <Column
//           field="role"
//           header="Role"
//           body={renderRoleDropdown}
//           pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
//         />
//         <Column
//           header="Actions"
//           body={actionBodyTemplate}
//           pt={{ bodyCell: { className: "bg-purple-100" }, headerCell: { className: "bg-purple-200" } }}
//         />
//       </DataTable>
//     </div>
//   );
// };

// export default Table;

import React, { useState, useEffect, ChangeEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import authFetch from "../../axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import "./Table.css"
interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  password:string;
}

interface TableProps {
  fetchUsersData: () => Promise<void>;
  users: User[];
}

const Table: React.FC<TableProps> = ({ fetchUsersData, users }) => {
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<User>>({});
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

  const onRowDelete = async (id: number) => {
    try {
      const response = await authFetch.delete(`http://localhost:3000/v2/tables/deleteUser/${id}`);
      
      console.log(response.data);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Deleted User Successfully",
        life: 3000,
      });
      
    
      // Ensure fetchUsersData is called after the delete operation
      fetchUsersData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete user",
        life: 3000,
      });
    }
  };
  

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof User
  ) => {
    const value = e.target.value;
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
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

  // const renderRoleDropdown = (rowData: User) => {
  //   return editRowIndex === users.indexOf(rowData) ? (
  //     <Dropdown
  //       value={editedData.role}
  //       options={statuses}
  //       onChange={(e) => onInputChange(e.originalEvent as ChangeEvent<HTMLSelectElement>, "role")}
  //       placeholder="Select a Role"
  //     />
  //   ) : (
  //     rowData.role
  //   );
  // };
  const onDropdownChange = (e: { value: any }, field: keyof User) => {
    const val = e.value || "";
    setEditedData((prevData) => ({ ...prevData, [field]: val }));
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
          onClick={() => onRowDelete(rowData.id)}
        />
      </>
    );
  };

  return (
    <div className="h-full flex justify-center">
      <Toast ref={toast}/>
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
    </div>
  );
};

export default Table;

