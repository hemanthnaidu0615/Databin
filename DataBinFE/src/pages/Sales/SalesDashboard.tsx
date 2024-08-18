import moment from "moment";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import { SalesCardPie } from "../../components/cards/SalesCardPie";
import CustomDataTable from "../../components/common/CustomDataTable";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import authFetch from "../../axios";
import salesData from "../../sales_data.json";

export const SalesDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [typeData, setTypeData] = useState<any>();
  const { dates } = useSelector((store: any) => store.dateRange);

  const getIntervalTime = (days: number) => {
    if (days === 2) return 3600;
    if (days > 2 && days < 30) return 86400;
    return 172800;
  };

  interface SalesDataItem {
    datetime: string;
    order_capture_channel: string | null;
    original_order_total_amount: number;
    line_ordered_qty: number;
  }
  
  type SalesData = SalesDataItem[];

  function separateOrderChannels(data: SalesData): SalesData[] {
  const result: SalesData[] = [[], [], [], []];

  data.forEach((item) => {
    const orderDate = moment(item.datetime);
    const now = moment();
    const format = now.diff(orderDate, 'hours') < 24 ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    const formattedDate = orderDate.format(format);

    const formattedItem = {
      ...item,
      datetime: formattedDate,
    };

    if (item.order_capture_channel === "CallCenter") {
      result[0].push(formattedItem);
    } else if (item.order_capture_channel === "Web") {
      result[1].push(formattedItem);
    } else if (item.order_capture_channel === "AWDSTORE") {
      result[2].push(formattedItem);
    } else if (item.order_capture_channel === null) {
      result[3].push(formattedItem);
    }
  });

  return result;
}

const fetchData = async (
  start: moment.Moment,
  end: moment.Moment,
  days: number
) => {
  if (!start || !end) return;
  setLoading(true);
  try {
    const intervalTime = getIntervalTime(days);
    const formattedStartDate = start.format("YYYY-MM-DD HH:mm:ss");
    const formattedEndDate = end.format("YYYY-MM-DD HH:mm:ss");
    const response1 = await authFetch(
      `/alsd/get-full-sales-data?start_date=${formattedStartDate}&end_date=${formattedEndDate}&intervaltime=${intervalTime}`
    );
    setTypeData(response1.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  if (dates[0] && dates[1]) {
    const start = moment(dates[0]);
    const end = moment(dates[1]);
    const days = end.diff(start, "days") + 1;
    // setDaysDifference(days);
    fetchData(start, end, days);
  }
}, [dates]);
if (loading) {
  return (
    <div className="flex justify-center items-center my-auto mx-auto flex-col">
      <ProgressSpinner />
    </div>
  );
}

  const salesDeets = salesData.MFData.totalStats;

  const logos = [
    "https://img.logoipsum.com/224.svg",
    "https://img.logoipsum.com/280.svg",
  ];

  function formatSeriesData(series: any) {
    return series.map((item: any) => {
      return {
        id: item.name === null ? "Other" : item.name,
        label: item.name === null ? "Other" : item.name,
        value: item.original_order_total_amount,
        color: "hsl(0, 0%, 50%)",
      };
    });
  }

  type ChannelType = "CallCenter" | "Web" | "AWDSTORE";


  function formatSeriesDataLinechart(inputData: any): any[] {
    const colors: Record<ChannelType, string> = {
      CallCenter: "rgba(173, 99, 155, 0.65)",
      Web: "rgba(253, 88, 173, 0.8)",
      AWDSTORE: "rgba(125, 221, 187, 0.68)",
    };
  
    const channels: ChannelType[] = ["CallCenter", "Web", "AWDSTORE"];
  
    return channels.map((channel) => {
      const dataPoints = inputData.flatMap((dataset: any) => {
        if (!Array.isArray(dataset)) {
          return [];
        }
  
        return dataset
          .filter((order) => order.order_capture_channel === channel)
          .map((order) => ({
            x: order.datetime,
            y: order.original_order_total_amount,
          }));
      });
  
      return {
        id: channel === "AWDSTORE" ? "Store" : channel,
        color: colors[channel],
        data: dataPoints,
      };
    });
  }
  

  const tab1HeaderTemplate = (options: any) => {
    return (
      <div
        className="flex align-items-center gap-2 p-3 mx-2"
        style={{ cursor: "pointer" }}
        onClick={options.onClick}
      >
        <span className="font-bold white-space-nowrap">Chart</span>
      </div>
    );
  };

  const tab2HeaderTemplate = (options: any) => {
    return (
      <div
        className="flex align-items-center gap-2 p-3 mx-2"
        style={{ cursor: "pointer" }}
        onClick={options.onClick}
      >
        <span className="font-bold white-space-nowrap ">By Type</span>
      </div>
    );
  };
  const tab3HeaderTemplate = (options: any) => {
    return (
      <div
        className="flex align-items-center gap-2 p-3 mx-2"
        style={{ cursor: "pointer" }}
        onClick={options.onClick}
      >
        <span className="font-bold white-space-nowrap ">Volume-Value</span>
      </div>
    );
  };
  const formatNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const formatNumberWithCommas = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    const roundedValue = Math.round(value);
    return Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(roundedValue);
  };

  const formatCustomDataTableData = (
  data: any[],
  fields: string[],
  prependDollar: boolean = false
) => {
  return data.map((item) => {
    const formattedItem = { ...item };
    fields.forEach((field) => {
      const value = Math.round(formattedItem[field]);
      formattedItem[field] = prependDollar
        ? `$${formatNumberWithCommas(value)}`
        : formatNumberWithCommas(value);
    });
    return formattedItem;
  });
};


  const salesDetails = [
    {
      label: "Total Booked",
      value: `$ ${formatNumber(salesDeets.original_order_total_amount)}`,
      color: "bg-blue-500",
    },
    {
      label: "Line Price Total",
      value: `$ ${formatNumber(Number(salesDeets.line_price_total))}`,
      color: "bg-green-500",
    },
    {
      label: "Shipping Charges",
      value: `$ ${formatNumber(Number(salesDeets.shipping_cost))}`,
      color: "bg-violet-500",
    },
    {
      label: "Discount",
      value: `$ ${formatNumber(Number(salesDeets.discount))}`,
      color: "bg-amber-500",
    },
    {
      label: "Tax Charges",
      value: `$ ${formatNumber(Number(salesDeets.tax))}`,
      color: "bg-red-500",
    },
    {
      label: "Total Units",
      value: formatNumber(Number(salesDeets.line_ordered_qty)),
      color: "bg-purple-500",
    },
    {
      label: "Margin",
      value: `$ ${formatNumber(Number(salesDeets.line_margin))}`,
      color: "bg-yellow-500",
    },
    {
      label: "ROI",
      value: "45%",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="w-full bg-white m-2 overflow-hidden rounded-lg shadow-xl h-full flex flex-col">
  
      <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
      <div className="card p-2 mb-4 h-[20%]">
        <h1 className="text-2xl ml-2 text-violet-800 font-bold">Sales</h1>
        <div className="flex pt-2 ml-10 w-full space-x-3">
          {salesDetails.map((item) => (
            <span key={item.label} className=" w-1/5 flex flex-col space-y-1" style={{width: "15%"}}>
              <p className="text-xs mb-2 pl-1">{item.label}</p>
              <p className="text-sm text-violet-800 font-medium pl-1">{item.value}</p>
              <div className={`${item.color} h-1.5 mt-1 w-20 rounded-b-lg`}></div>
            </span>
          ))}
        </div>
      </div>
    <div className="card m-2 h-full"></div>
      {typeData?.map((type: any, i: any) => {
        return (
          <div key={i}>
            <TabView
              className="border-2"
              pt={{
                navContainer: {
                  className: "flex h-10 justify-end px-6  text-xs",
                },
                panelContainer: { className: "p-1" },
                inkbar: { className: "bg-purple-700" },
              }}
            >
              <TabPanel headerTemplate={tab1HeaderTemplate} header="Chart">
                <SalesCardPie
                   dataForLineChart={formatSeriesDataLinechart(
                    separateOrderChannels(type?.chartSeries.series)
                  )}
                  dataForPieChart={formatSeriesData(
                    type?.salesCategories.ORDER_CAPTURE_CHANNEL_GROUPED
                  )}
                  
                  dataForBarChart={separateOrderChannels(
                    type?.chartSeries.series
                  )}
                  dataForTable={type?.chartSeries.series}
                  brandName={type?.name}
                  progressbarValue={
                    type?.salesCategories?.original_order_total_amount
                  }
                  logo={logos[i] as any}
                  leftLegend={"Order Amount ($)"}
                />
              </TabPanel>
              <TabPanel headerTemplate={tab2HeaderTemplate} header="By Type">
                <h3 className="flex text-sm font-semibold ml-1 mb-1  px-4">
                  {type?.name}
                </h3>
                <div className="card flex gap-2  m-2 h-full py-1 px-2  align-center justify-center">
                  <div className="card border border-gray-200 shadow-lg rounded-lg  py-1 px-2 m-2 flex-1">
                    <h3 className="flex items-center text-sm font-semibold ml-1 mb-1 py-2">
                      By Channel
                    </h3>
                    <CustomDataTable
                      data={formatCustomDataTableData(
                        type?.salesCategories.ORDER_CAPTURE_CHANNEL_GROUPED ||
                          [],
                        ["original_order_total_amount", "line_ordered_qty"]
                      )}
                      columns={[
                        { field: "name", header: "Name" },
                        {
                          field: "original_order_total_amount",
                          header: "Units",
                          format: true,
                        },
                        {
                          field: "line_ordered_qty",
                          header: "Total",
                          format: true,
                          prependDollar: true,
                        },
                      ]}
                    />
                  </div>
                  <div className="card border border-gray-200 shadow-lg rounded-lg  py-1 px-2 m-2 flex-1 ">
                    <h3 className="flex items-center text-sm font-semibold ml-1 mb-1 py-2">
                      By Fulfillment
                    </h3>
                    <CustomDataTable
                      data={formatCustomDataTableData(
                        type?.salesCategories.LINE_FULFILLMENT_TYPE_GROUPED ||
                          [],
                        ["original_order_total_amount", "line_ordered_qty"]
                      )}
                      columns={[
                        { field: "name", header: "Name" },
                        {
                          field: "original_order_total_amount",
                          header: "Units",
                          format: true,
                        },
                        {
                          field: "line_ordered_qty",
                          header: "Total",
                          format: true,
                          prependDollar: true,
                        },
                      ]}
                    />
                  </div>
                  <div className=" card border border-gray-200 shadow-lg rounded-lg  py-1 px-2 m-2 flex-1 ">
                    <h3 className="flex items-center text-sm font-semibold ml-1 mb-1 py-2">
                      By Item
                    </h3>
                    <CustomDataTable
                      data={formatCustomDataTableData(
                        type?.salesCategories.ITEM_INFO_GROUPED || [],
                        ["original_order_total_amount", "line_ordered_qty"]
                      )}
                      columns={[
                        { field: "name", header: "Name" },
                        {
                          field: "original_order_total_amount",
                          header: "Units",
                          format: true,
                        },
                        {
                          field: "line_ordered_qty",
                          header: "Total",
                          format: true,
                          prependDollar: true,
                        },
                      ]}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                headerTemplate={tab3HeaderTemplate}
                header="Volume-Value"
              >
                <h3 className="flex text-sm font-semibold ml-1 mb-1  px-4">
                  {type?.name}
                </h3>
                <div className="card flex gap-2  m-2 h-full py-1 px-2  align-center justify-center">
                  <div className="card  border border-gray-200 shadow-lg rounded-lg  py-1 px-2 m-2 flex-1 w-1/2">
                    <h3 className="flex items-center text-sm font-semibold ml-1 mb-1 py-2">
                      By Volume
                    </h3>
                    <CustomDataTable
                      data={formatCustomDataTableData(
                        type?.topItemsData?.byVolume || [],
                        ["line_ordered_qty"]
                      )}
                      columns={[
                        { field: "item_id", header: "Item Id" },
                        {
                          field: "web_category",
                          header: "Web Category",
                        },
                        { field: "brand_name", header: "Brand Name" },
                        {
                          field: "line_ordered_qty",
                          header: "Total",
                          format: true,
                          
                        },
                      ]}
                    />
                  </div>
                  <div className="card border border-gray-200 shadow-lg rounded-lg  py-1 px-2 m-2 flex-1 w-1/2">
                    <h3 className="flex items-center text-sm font-semibold ml-1 mb-1 py-2">
                      By Value
                    </h3>
                    <CustomDataTable
                      data={formatCustomDataTableData(
                        type?.topItemsData?.byValue || [],
                        ["original_order_total_amount"]
                      )}
                      columns={[
                        { field: "item_id", header: "Item Id" },
                        {
                          field: "web_category",
                          header: "Web Category",
                        },
                        { field: "brand_name", header: "Brand Name" },
                        {
                          field: "original_order_total_amount",
                          header: "Total",
                          format: true,
                          prependDollar: true,
                        },
                      ]}
                    />
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        );
      })}
    </div>
  );
};

