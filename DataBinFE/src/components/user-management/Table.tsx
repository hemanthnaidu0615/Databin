import { useEffect, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
 
export default function Table({ fetchUsersData, users }: any) {
  // const [filters, setFilters] = useState({});
  // const [globalFilterValue, setGlobalFilterValue] = useState("");
 
  // const [statuses] = useState([
  //   "unqualified",
  //   "qualified",
  //   "new",
  //   "negotiation",
  //   "renewal",
  // ]);
 
  // const initFilters = () => {
  //   setFilters({
  //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //     name: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //     "country.name": {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //     representative: { value: null, matchMode: FilterMatchMode.IN },
  //     date: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  //     },
  //     balance: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  //     },
  //     status: {
  //       operator: FilterOperator.OR,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  //     },
  //     activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  //     verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  //   });
  //   setGlobalFilterValue("");
  // };
 
  useEffect(() => {
    fetchUsersData();
    // initFilters();
  }, []);
 
  if (!users) {
    return (
      <div className="flex justify-center items-center my-auto">
        <ProgressSpinner />
      </div>
    );
  }
 
  function formatUserData(userData: any) {
    return userData.map((item: any) => {
      return {
        itemID: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        username: item.username,
        role: item.role,
      };
    });
  }
 
  // const clearFilter = () => {
  //   initFilters();
  // };
 
  // const onGlobalFilterChange = (e: any) => {
  //   const value = e.target.value;
  //   let _filters: any = { ...filters };
 
  //   _filters["global"].value = value;
 
  //   setFilters(_filters);
  //   setGlobalFilterValue(value);
  // };
 
  const renderHeader = () => {
    return (
      <div className="flex justify-between  ">
        {/* <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          // onClick={clearFilter}
          className="text-xs text-purple-800"
        /> */}
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="text-xs"
            // value={globalFilterValue}
            // onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            pt={{ root: { className: "text-red-100" } }}
          />
        </span> */}
      </div>
    );
  };
 
  // const filterClearTemplate = (options: any) => {
  //   return (
  //     <Button
  //       type="button"
  //       icon="pi pi-times"
  //       onClick={options.filterClearCallback}
  //       severity="secondary"
  //     ></Button>
  //   );
  // };
 
  // const filterApplyTemplate = (options: any) => {
  //   return (
  //     <Button
  //       type="button"
  //       icon="pi pi-check"
  //       onClick={options.filterApplyCallback}
  //       severity="success"
  //     ></Button>
  //   );
  // };
 
  // const filterFooterTemplate = () => {
  //   return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  // };
 
  // const statusFilterTemplate = (options: any) => {
  //   return (
  //     <Dropdown
  //       value={options.value}
  //       options={statuses}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder="Select One"
  //       className="p-column-filter"
  //       showClear
  //     />
  //   );
  // };
 
  // const statusItemTemplate = (option: any) => {
  //   return <Tag value={option} />;
  // };
 
  // const header = renderHeader();
  // console.log(header);
 
  return (
    <div className="h-full flex justify-center">
      <DataTable
        size="small"
        className="text-lg mb-1 w-full mx-3 "
        value={formatUserData(users)}
        paginator
        paginatorClassName="bg-purple-100 "
        showGridlines
        rows={7}
        dataKey="id"
        // filters={filters}
        // globalFilterFields={[
        //   "name",
        //   "firstname.name",
        //   "representative.name",
        //   "lastname.name",
        //   "username.name",
        //   "balance",
        //   "status",
        // ]}
        // header={header}
        emptyMessage="No customers found."
        pt={{
          header: { className: "bg-purple-200" },
        }}
      >
        <Column
          field="firstname"
          header="First name"
          headerClassName="umheader"
          // filterField="firstname.name"
          className="umcolumns"
          style={{ minWidth: "12rem" }}
          filter
          // filterPlaceholder="Search by firstname"
          // filterClear={filterClearTemplate}
          // filterApply={filterApplyTemplate}
          // filterFooter={filterFooterTemplate}
          pt={{
            bodyCell: { className: "bg-purple-100" },
            headerCell: { className: "bg-purple-200" },
          }}
        />
        <Column
          field="lastname"
          header="Last name"
          // filterField="lastname.name"
          className="umcolumns"
          style={{ minWidth: "12rem" }}
          filter
          // filterPlaceholder="Search by last name"
          // filterClear={filterClearTemplate}
          // filterApply={filterApplyTemplate}
          // filterFooter={filterFooterTemplate}
          pt={{
            bodyCell: { className: "bg-purple-100" },
            headerCell: { className: "bg-purple-200" },
          }}
        />
        <Column
          field="username"
          header="User Name"
          // filterField="username.name"
          className="umcolumns"
          style={{ minWidth: "12rem" }}
          filter
          // filterPlaceholder="Search by username"
          // filterClear={filterClearTemplate}
          // filterApply={filterApplyTemplate}
          // filterFooter={filterFooterTemplate}
          pt={{
            bodyCell: { className: "bg-purple-100" },
            headerCell: { className: "bg-purple-200" },
          }}
        />
 
        <Column
          field="role"
          header="Role"
          className="umcolumns"
          // filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          filter
          // filterElement={statusFilterTemplate}
          pt={{
            bodyCell: { className: "bg-purple-100" },
            headerCell: { className: "bg-purple-200" },
          }}
        />
      </DataTable>
    </div>
  );
}
 