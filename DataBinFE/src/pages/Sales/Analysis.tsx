import moment from "moment";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import authFetch from "../../axios";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';



export const Analysis = () => {
  const [tableName, setTableName] = useState<string>("order_book_header");
  const [data, setData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBarChart, setShowBarChart] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const { dates } = useSelector((store: any) => store.dateRange);

  const [showSchedulerDialog, setShowSchedulerDialog] = useState(false);
  const [schedulerData, setSchedulerData] = useState({
    startDate: null,
    recurrencePattern: null,
    emailAddress: '',
    tableSelection: '',
    columnSelection: []
  });
  



  const fetchData = async (tablename: string) => {
    const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD HH:mm:ss");
    const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD HH:mm:ss");
    setLoading(true);
    try {
      const response = await authFetch(
        `/tables?table=${tablename}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );

      setData(response.data);
      initializeFilters(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveScheduler = async () => {
    try {
      const { tableSelection, columnSelection, startDate, recurrencePattern, emailAddress, timeFrame } = schedulerData;
  
      const formattedStartDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
      let formattedEndDate = moment().format('YYYY-MM-DDTHH:mm:ss');
  
      if (timeFrame === 'last_year') {
        formattedEndDate = moment().subtract(1, 'year').format('YYYY-MM-DDTHH:mm:ss');
      } else if (timeFrame === 'last_month') {
        formattedEndDate = moment().subtract(1, 'month').format('YYYY-MM-DDTHH:mm:ss');
      } else if (timeFrame === 'last_week') {
        formattedEndDate = moment().subtract(1, 'week').format('YYYY-MM-DDTHH:mm:ss');
      }
  
      const response = await authFetch(`/tables?table=${tableSelection}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      const data = await response.json();
  
      const selectedColumnsData = data.map((row) => {
        const newRow = {};
        columnSelection.forEach((column) => {
          newRow[column] = row[column];
        });
        return newRow;
      });
  
      const xlsx = (await import('xlsx')).default;
      const worksheet = xlsx.utils.json_to_sheet(selectedColumnsData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      const formData = new FormData();
      formData.append('file', new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'data.xlsx');
      formData.append('email', emailAddress);
      formData.append('recurrencePattern', recurrencePattern);
      formData.append('startDate', formattedStartDate);
      formData.append('tableSelection', tableSelection);
      formData.append('columnSelection', JSON.stringify(columnSelection));
      formData.append('timeFrame', timeFrame);
  
      await authFetch('/scheduler', { method: 'POST', body: formData });
  
      console.log('Scheduler data saved and email sent successfully');
      setShowSchedulerDialog(false);
    } catch (error) {
      console.error('Error saving scheduler data:', error);
    }
  };
  
  function getDefaultTimeFrame(recurrencePattern) {
    switch (recurrencePattern) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'Past Week';
      case 'monthly':
        return 'Past Month';
      case 'yearly':
        return 'Past Year';
      default:
        return 'Today';
    }
  }
  
  function getTimeFrames(recurrencePattern) {
    const timeFrames = {
      daily: [
        { label: 'Today', value: 'Today' },
        { label: 'Past Week', value: 'Past Week' },
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
      ],
      weekly: [
        { label: 'Past Week', value: 'Past Week' },
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
      ],
      monthly: [
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
        { label: 'Past 2 Years', value: 'Past 2 Years' },
        { label: 'Past 5 Years', value: 'Past 5 Years' },
        { label: 'Past 10 Years', value: 'Past 10 Years' },
      ],
      yearly: [
        { label: 'Past Year', value: 'Past Year' },
        { label: 'Past 2 Years', value: 'Past 2 Years' },
        { label: 'Past 5 Years', value: 'Past 5 Years' },
        { label: 'Past 10 Years', value: 'Past 10 Years' },
      ],
    };
    return timeFrames[recurrencePattern] || [];
  }
  
  
  function getDefaultTimeFrame(recurrencePattern) {
    switch (recurrencePattern) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'Past Week';
      case 'monthly':
        return 'Past Month';
      case 'yearly':
        return 'Past Year';
      default:
        return 'Today';
    }
  }
  
  function getTimeFrames(recurrencePattern) {
    const timeFrames = {
      daily: [
        { label: 'Today', value: 'Today' },
        { label: 'Past Week', value: 'Past Week' },
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
      ],
      weekly: [
        { label: 'Past Week', value: 'Past Week' },
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
      ],
      monthly: [
        { label: 'Past Month', value: 'Past Month' },
        { label: 'Past 3 Months', value: 'Past 3 Months' },
        { label: 'Past 6 Months', value: 'Past 6 Months' },
        { label: 'Past Year', value: 'Past Year' },
        { label: 'Past 2 Years', value: 'Past 2 Years' },
        { label: 'Past 5 Years', value: 'Past 5 Years' },
        { label: 'Past 10 Years', value: 'Past 10 Years' },
      ],
      yearly: [
        { label: 'Past Year', value: 'Past Year' },
        { label: 'Past 2 Years', value: 'Past 2 Years' },
        { label: 'Past 5 Years', value: 'Past 5 Years' },
        { label: 'Past 10 Years', value: 'Past 10 Years' },
      ],
    };
    return timeFrames[recurrencePattern] || [];
  }
  

  const initializeFilters = (data: any[]) => {
    const initialFilters: DataTableFilterMeta = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    if (data.length > 0) {
      Object.keys(data[0]).forEach((key) => {
        initialFilters[key] = {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        };
      });
    }
    setFilters(initialFilters);
  };

  useEffect(() => {
    fetchData(tableName);
    // console.log(groupedData);
  }, [dates[1]]);

  const handleSelectingTable = (newTableName: string) => {
    setTableName(newTableName);
    fetchData(newTableName);
    setSelectedColumns([]);
  };

  const formatHeaderKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatValue = (field: string, value: any) => {
    if (field.toLowerCase().includes("date")) {
      return typeof value === "string" ? value.slice(0, 10) : value;
    }
    if (
      field.toLowerCase().includes("amount") ||
      field.toLowerCase().includes("_tax") ||
      field.toLowerCase().includes("margin") ||
      field.toLowerCase().includes("_charge") ||
      field.toLowerCase().includes("cost") ||
      field.toLowerCase().includes("intl") ||
      field.toLowerCase().includes("line_other") ||
      field.toLowerCase().includes("line_tax") ||
      field.toLowerCase().includes("line_total") ||
      field.toLowerCase().includes("list_price") ||
      field.toLowerCase().includes("unit")
    ) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    return value;
  };

  const getTableColumns = (data: any[]) => {
    if (tableName === "order_book_line" || tableName === "order_book_taxes") {
      return Object.keys(data[0] || {}).slice(1).map((key) => ({
        field: key,
        header: formatHeaderKey(key),
      }));
    }
    return Object.keys(data[0] || {}).map((key) => ({
      field: key,
      header: formatHeaderKey(key),
    }));
  };
  

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onColumnFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [field]: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }

  const groupedData: any = [];
  if (tableName === "order_book_line") {
    data.forEach((item: any) => {
      const formattedDate = moment(
        item.order_date,
        "DD-MMM-YY HH.mm.ss.SSSSSS a"
      ).format("DD-MMM-YY");
      const key = `${item.enterprise_key}-${formattedDate}`;

      if (!groupedData[key]) {
        groupedData[key] = [item];
      } else {
        groupedData[key].push(item);
      }
    });
  }

  const separateOrdersByEnterpriseKey = (data: any) => {
    const AWDOrders: any[] = [];
    const AWWOrders: any[] = [];
    const nivoData: any[] = [];

    for (const key in data) {
      const subArray = data[key];

      let sum = 0;

      for (const order of subArray) {
        sum += parseFloat(order.order_total_amount);
      }

      if (key.startsWith("AWD")) {
        AWDOrders.push({ key, sum });
      } else if (key.startsWith("AWW")) {
        AWWOrders.push({ key, sum });
      }
    }

    nivoData.push(AWWOrders);
    nivoData.push(AWDOrders);

    return { nivoData, AWDOrders, AWWOrders };
  };

  const { AWDOrders, AWWOrders } = separateOrdersByEnterpriseKey(groupedData);

  const barChartData = {
    labels: Array.from(new Set([...Object.keys(groupedData)])),
    datasets: [
      {
        label: "AWD",
        data: AWWOrders?.map((data: any) => data.sum),
        backgroundColor: ["rgba(193, 21, 21, 0.65)"],
        borderWidth: 0,
      },
      {
        label: "AWW",
        data: AWDOrders?.map((data: any) => data.sum),
        backgroundColor: ["rgba(31, 55, 193, 0.65)"],
        borderWidth: 0,
      },
    ],
  };

  const handleBarChart = () => {
    fetchData("order_book_line");
    setShowBarChart(true);
    console.log(groupedData);
  };

  const handleTableView = () => {
    setShowBarChart(false);
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      // const selectedColumnsData: Record<string, any>[] = data.map(
      //   (row: any) => {
      //     const newRow: Record<string, any> = {};
      //     selectedColumns.forEach((column: any) => {
      //       newRow[column.field] = formatValue(column.field, row[column.field]);
      //     });
      //     return newRow;
      //   }
      // );
      const selectedColumnsData: Record<string, any>[] = data.map(
        (row: any) => {
          const newRow: Record<string, any> = {};
          if (selectedColumns.length > 0) {
            selectedColumns.forEach((column: any) => {
              newRow[column.field] = formatValue(
                column.field,
                row[column.field]
              );
            });
          } else {
            Object.keys(row).forEach((key) => {
              newRow[key] = formatValue(key, row[key]);
            });
          }
          return newRow;
        }
      );

      // const worksheet = selectedColumnsData
      //   ? xlsx.utils.json_to_sheet(selectedColumnsData)
      //   : xlsx.utils.json_to_sheet(data);
      const worksheet = xlsx.utils.json_to_sheet(selectedColumnsData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      setSelectedColumns([]);
      saveAsExcelFile(excelBuffer, "data");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: any) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const tables = [
    { name: "order_book_header", code: "OBH" },
    { name: "order_book_line", code: "OBL" },
    { name: "order_book_taxes", code: "OBT" },
    { name: "return_order_header", code: "ROH" },
    { name: "return_order_line", code: "ROL" },
  ];

  const balanceFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <InputNumber
        className="max-w-40 text-xs p-1 h-4"
        placeholder="Enter figure"
        value={options.value || null}
        onChange={(e: InputNumberChangeEvent) => {
          options.filterCallback(e.value, options.index);
          console.log(e.value);
        }}
        // onChange={(e: any) => onColumnFilterChange(e, col.field)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const header = (
    <div className="flex place-content-end align-items-center gap-2 items-center">
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="h-[34px] w-52 text-xs p-1 "
        />
      </IconField>
      <Dropdown
        value={tableName}
        onChange={(e) => handleSelectingTable(e.value.name)}
        options={tables.map((table) => ({
          name: table.name,
          code: table.code,
        }))}
        optionLabel="name"
        placeholder={tableName}
        className="h-[34px] w-52 text-xs p-1 "
        pt={{
          input: { className: "text-xs p-0 " },
          trigger: { className: "h-2 w-3 ml-2 " },
          root: { className: " items-center justify-center" },
        }}
      />
      <MultiSelect
        value={selectedColumns}
        options={getTableColumns(data).slice(1)}
        onChange={(e) => setSelectedColumns(e.value)}
        optionLabel="header"
        display="chip"
        placeholder="Select Columns"
        className="p-multiselect-sm p-multiselect-panel h-[34px]  text-xs p-1 border-2 "
        pt={{
          label: { className: "text-xs p-0 " },
          trigger: { className: "h-2 w-3 ml-2 " },
          root: { className: " items-center justify-center" },
        }}
        style={{ width: "15rem" }}
      />
      {tableName === "order_book_line" && (
        <Button
          type="button"
          icon="pi pi-chart-bar"
          rounded
          onClick={handleBarChart}
          className="bg-purple-500 border-0 h-10 w-10"
          tooltipOptions={{ position: "top" }}
          tooltip="Show Bar Chart"
        />
      )}

      <Button
        type="button"
        icon="pi pi-file-excel"
        rounded
        onClick={exportExcel}
        data-pr-tooltip="xls"
        className="bg-purple-500 border-0 h-10 w-10"
        tooltipOptions={{ position: "top" }}
        tooltip="xls"
      />

      <Button
        type="button"
        icon="pi pi-calendar"
        rounded
        onClick={() => setShowSchedulerDialog(true)}
        data-pr-tooltip="Schedule"
        className="bg-purple-500 border-0 h-10 w-10"
        tooltipOptions={{ position: "top" }}
        tooltip="Schedule"
      />

    </div>
  );

  return (
    <div className="rounded-lg bg-white border-2 w-full overflow-y-auto">
      <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
      <div className="flex gap-4 items-center px-3 py-2">
        <h1 className="text-2xl font-semibold text-md text-violet-800">
          Sales Analysis
        </h1>
      </div>

      <div className="flex flex-col">
        {showBarChart ? (
          <div className="h-96 translate-y-20">
            <div className="flex justify-end px-8">
              <Button
                type="button"
                icon="pi pi-table"
                data-pr-tooltip="Show Table"
                onClick={handleTableView}
                className="bg-purple-500 border-0 h-10 m-2"
                tooltipOptions={{ position: "top" }}
                tooltip="Show Table"
              />
            </div>
            <Bar
              data={barChartData}
              width={750}
              options={{
                plugins: {
                  title: {
                    display: true,
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      display: true,
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <DataTable
            className="m-1 w-[99%]"
            showGridlines
            size="small"
            paginator
            rows={10}
            value={data}
            header={header}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={Object.keys(filters)}
          >
            {getTableColumns(data).slice(1).map((col, index) => {
              if (
                col.header.toLowerCase().includes("amount") ||
                col.header.toLowerCase().includes("charges")
              ) {
                return (
                  <Column
                    sortable
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={{ minWidth: "350px" }}
                    dataType="numeric"
                    filterField={col.field}
                    filter
                    filterElement={balanceFilterTemplate}
                    body={(rowData) => formatValue(col.field, rowData[col.field])}
                  />
                );
              }
              return (
                <Column
                  sortable
                  key={index}
                  field={col.field}
                  style={{ minWidth: "350px" }}
                  header={col.header}
                  filter
                  filterElement={
                    <InputText
                      value={filters[col.field]?.value || ""}
                      onChange={(e) => onColumnFilterChange(e, col.field)}
                      placeholder={`Search ${col.header}`}
                      className="max-w-40 text-sm p-1"
                    />
                  }
                  filterPlaceholder={`Search by ${col.header}`}
                  body={(rowData) => formatValue(col.field, rowData[col.field])}
                />
              );
            })}
          </DataTable>
        )}
      </div>

      {/* Scheduler Popup */}
      <Dialog
  visible={showSchedulerDialog}
  onHide={() => setShowSchedulerDialog(false)}
  header="Scheduler"
  footer={
    <div className="flex justify-end">
      <Button label="Save" icon="pi pi-check" onClick={handleSaveScheduler} />
      <Button label="Cancel" icon="pi pi-times" onClick={() => setShowSchedulerDialog(false)} className="p-button-secondary" />
    </div>
  }
  style={{ width: '50vw' }}
>
  <div className="p-fluid">
    <div className="p-field">
      <label htmlFor="startDate">Start Date</label>
      <Calendar
        id="startDate"
        value={schedulerData.startDate}
        onChange={(e) => setSchedulerData({ ...schedulerData, startDate: e.value })}
        showTime
      />
    </div>
    <div className="p-field">
      <label htmlFor="recurrencePattern">Recurrence Pattern</label>
      <Dropdown
        id="recurrencePattern"
        value={schedulerData.recurrencePattern}
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' }
        ]}
        onChange={(e) => {
          setSchedulerData({
            ...schedulerData,
            recurrencePattern: e.value,
            timeFrame: getDefaultTimeFrame(e.value) // Set default time frame based on recurrence
          });
        }}
      />
    </div>
    <div className="p-field">
      <label htmlFor="timeFrame">Time Frame</label>
      <Dropdown
        id="timeFrame"
        value={schedulerData.timeFrame}
        options={getTimeFrames(schedulerData.recurrencePattern)}
        onChange={(e) => setSchedulerData({ ...schedulerData, timeFrame: e.value })}
      />
    </div>
    <div className="p-field">
      <label htmlFor="emailAddress">Email Address</label>
      <InputText
        id="emailAddress"
        value={schedulerData.emailAddress}
        onChange={(e) => setSchedulerData({ ...schedulerData, emailAddress: e.target.value })}
      />
    </div>
    <div className="p-field">
      <label htmlFor="tableSelection">Table Selection</label>
      <Dropdown
        id="tableSelection"
        value={schedulerData.tableSelection}
        options={[
          { label: 'Order Book Header', value: 'order_book_header' },
          { label: 'Order Book Line', value: 'order_book_line' },
          { label: 'Order Book Taxes', value: 'order_book_taxes' },
        ]}
        onChange={(e) => setSchedulerData({ ...schedulerData, tableSelection: e.value })}
      />
    </div>
    <div className="p-field">
      <label htmlFor="columnSelection">Column Selection</label>
      <MultiSelect
        id="columnSelection"
        value={schedulerData.columnSelection}
        options={getTableColumns(data).slice(1)}
        onChange={(e) => setSchedulerData({ ...schedulerData, columnSelection: e.value })}
        optionLabel="header"
        display="chip"
        placeholder="Select Columns"
      />
    </div>
  </div>
</Dialog>

    </div>
  );
};