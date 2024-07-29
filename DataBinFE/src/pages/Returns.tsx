import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import authFetch from "../axios";
import CustomDataTable from "../components/common/CustomDataTable";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import moment from "moment";

export const Returns = () => {
  const [returnData, setReturnData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { dates } = useSelector((store: any) => store.dateRange);
  const { key: returnEnterpriseKey } = useSelector((store: any) => store.enterprise);


  const fetchData = async () => {
    setLoading(true);
    if (!dates[0] || !dates[1]) return;
    try {
      const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
      const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
      const response = await authFetch.get(
        `/returns/getReturnsData?startDate=${formattedStartDate}&endDate=${formattedEndDate}&returnEnterpriseKey=${returnEnterpriseKey}`
      );
      console.log("API response:", response.data);
      setReturnData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dates, returnEnterpriseKey]);

  const formatNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const formatNumberWithCommas = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(value);
  };

  const formatCustomDataTableData = (
    data: any[],
    fields: string[],
    prependDollar: boolean = false
  ) => {
    return data.map((item) => {
      const formattedItem = { ...item };
      fields.forEach((field) => {
        formattedItem[field] = prependDollar
          ? `${formatNumberWithCommas(formattedItem[field])}`
          : formatNumberWithCommas(formattedItem[field]);
      });
      return formattedItem;
    });
  };

  const returnDetails = [
    {
      label: "Return Booked",
      value: formatNumber(returnData?.returnStats[0].returns_booked),
      icon: "pi-equals",
    },
    {
      label: "Return Received",
      value: formatNumber(returnData?.returnStats[0].return_received_value),
      icon: "pi-plus",
    },
    {
      label: "Return NPR'ed ",
      value: formatNumber(returnData?.returnStats[0].npr_value),
      icon: "pi-plus",
    },
    {
      label: "Pending Return",
      value: formatNumber(returnData?.returnStats[0].yet_to_return_value),
    },
  ];

  const returnDetailsVolume = [
    {
      label: "Return Booked",
      value: formatNumber(returnData?.returnStats[0].return_qty_booked),
      icon: "pi-equals",
    },
    {
      label: "Return Received",
      value: formatNumber(returnData?.returnStats[0].received_quantity),
      icon: "pi-plus",
    },
    {
      label: "Return NPR'ed ",
      value: formatNumber(returnData?.returnStats[0].npr_quantity),
      icon: "pi-plus",
    },
    {
      label: "Pending Return",
      value: formatNumber(returnData?.returnStats[0].yet_to_receive_quantity),
    },
  ];

  return loading ? (
    <div className="flex items-center justify-center h-full mx-auto my-auto">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="flex overflow-y-auto overflow-x-hidden flex-col m-2 h-full bg-white w-full">
      <h1 className="text-2xl ml-2 font-bold pl-4 pt-4 py-1">Returns Dashboard</h1>
      <div className="card h-full">
        <div className="card flex gap-1 m-1 align-center w-[99%] justify-center">
          <div className="flex-1 card h-full border bg-purple-50 border-gray-200 shadow-lg rounded-lg py-1 px-2 ml-6 m-2">
            <h1 className="flex justify-center items-center text-sm font-semibold ml-2">
              BY VALUE
            </h1>
            <div className="gap-4 card flex justify-center">
              {returnDetails.map((item) => (
                <div key={item.label} className="flex">
                  <div className="flex-1 justify-center items-center px-2 card border border-gray-200 shadow-lg rounded-lg py-1 m-2">
                    <span className="w-25 justify-center items-center flex flex-col">
                      <p className="text-xs mb-1 max-w-30 min-h-4 pl-1">
                        {item.label}
                      </p>
                      <p className="text-xl text-violet-900 font-medium pl-1">
                        ${item.value}
                      </p>
                    </span>
                  </div>
                  <i
                    className={`pi ${item.icon} pl-1 text-lg align-middle`}
                    style={{ alignSelf: "center" }}
                  ></i>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 card h-full border bg-purple-50 border-gray-200 shadow-lg rounded-lg py-1 px-2 m-2">
            <h1 className="flex justify-center items-center text-sm font-semibold ml-2">
              BY VOLUME
            </h1>
            <div className="gap-4 card flex justify-center">
              {returnDetailsVolume.map((item) => (
                <div key={item.label} className="flex">
                  <div className="flex-1 justify-center items-center px-2 card border border-gray-200 shadow-lg rounded-lg py-1 m-2">
                    <span className="w-25 justify-center items-center flex flex-col">
                      <p className="text-xs mb-1 max-w-30 min-h-4 pl-1">
                        {item.label}
                      </p>
                      <p className="text-xl text-violet-900 font-medium pl-1">
                        ${item.value}
                      </p>
                    </span>
                  </div>
                  <i
                    className={`pi ${item.icon} pl-1 text-lg align-middle`}
                    style={{ alignSelf: "center" }}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card py-1 px-2">
          <div className="card flex gap-1 m-2 align-center justify-center">
            <div className="card border border-gray-200 shadow-lg rounded flex-1">
              <h3 className="flex justify-center items-center text-sm font-semibold ml-2 mb-1 py-2">
                RETURN FULFILLED FROM
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsFulfilledResult.returnsFulfilled || [],
                  ["total_units", "total_value"],
                  true
                )}
                columns={[
                  {
                    field: "sales_fulfillment_type",
                    header: "SALES FULFILLMENT TYPE",
                  },
                  {
                    field: "total_units",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                  {
                    field: "total_value",
                    header: "TOTAL VALUE",
                    format: true,
                    prependDollar: true,
                  },
                ]}
              />
            </div>
            <div className="card border border-gray-200 shadow-lg rounded flex-1">
              <h3 className="flex justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                RETURN FULFILLED TYPE
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnByFulfillmentTypeResult
                    .returnByFulfillmentType || [],
                  ["total_units", "total_value"],
                  true
                )}
                columns={[
                  {
                    field: "sales_order_fulfillment_type",
                    header: "SALES FULFILLMENT TYPE",
                  },
                  {
                    field: "total_units",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                  {
                    field: "total_value",
                    header: "TOTAL VALUE",
                    format: true,
                    prependDollar: true,
                  },
                ]}
              />
            </div>
            <div className="card border border-gray-200 shadow-lg rounded flex-1">
              <h3 className="flex justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                EXCHANGE ORDER STATS
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.exchangeOrderResult.exchangeOrder || [],
                  [
                    "order_count",
                    "exchange_book_amount",
                    "pending_refund_to_use_for_exchange",
                  ],
                  true
                )}
                columns={[
                  { field: "exchange_type", header: "EXCHANGE TYPE" },
                  {
                    field: "order_count",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                  {
                    field: "exchange_book_amount",
                    header: "EXCHANGE BOOK AMOUNT",
                    format: true,
                    prependDollar: true,
                  },
                  {
                    field: "pending_refund_to_use_for_exchange",
                    header: "PENDING REFUND",
                    format: true,
                    prependDollar: true,
                  },
                ]}
              />
            </div>
          </div>
          <div className="card flex gap-1 m-2 align-center  justify-center">
            <div className="card border border-gray-200 shadow-lg rounded flex-1">
              <h3 className="flex  justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                RETURN REASON
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnReasonResult.returnReason || [],
                  ["total_units", "total_value"]
                )}
                columns={[
                  {
                    field: "common_code_short_description",
                    header: "COMMON CODE",
                  },
                  {
                    field: "total_units",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                  {
                    field: "total_value",
                    header: "TOTAL VALUE",
                    format: true,
                    prependDollar: true,
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
            <div className="card border border-gray-200 shadow-lg rounded  flex-1 ">
              <h3 className="flex  justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                RETURN BY ITEM INFO
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsByItemInfoResult.returnsByItemInfo || [],
                  ["line_units", "line_charge"]
                )}
                columns={[
                  {
                    field: "item_info",
                    header: "ITEM INFO",
                  },
                  {
                    field: "line_units",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                  {
                    field: "line_charge",
                    header: "TOTAL VALUE",
                    format: true,
                    prependDollar: true,
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
          </div>
          <div className="card flex gap-1 m-2  align-center  justify-center">
            <div className="card border border-gray-200 shadow-lg rounded flex-1">
              <h3 className="flex  justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                WEB CATEGORY (TOP 5) VOLUME
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsQtyByCategoryResult.returnsQtyByCategory ||
                    [],
                  ["sum"]
                )}
                columns={[
                  {
                    field: "item_category_name",
                    header: "CATEGORY NAME ",
                  },
                  {
                    field: "sum",
                    header: "TOTAL UNITS",
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
            <div className=" card border border-gray-200 shadow-lg rounded flex-1 ">
              <h3 className="flex justify-center items-center  text-sm font-semibold ml-1 mb-1 py-2">
                WEB CATEGORY (TOP 5) VALUE
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsValByCategoryResult.returnsValByCategory ||
                    [],
                  ["sum"]
                )}
                columns={[
                  {
                    field: "item_category_name",
                    header: "CATEGORY NAME ",
                  },
                  {
                    field: "sum",
                    header: "TOTAL VALUE",
                    prependDollar: true,
                    format: true,
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
          </div>
          <div className="card  flex gap-1 m-2  align-center  justify-center">
            <div className="card border border-gray-200 shadow-lg rounded  flex-1 ">
              <h3 className="flex  justify-center items-center text-sm font-semibold ml-1 mb-1 py-2">
                BRAND NAME (TOP 5) VOLUME
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsQtyByBrandNameResult
                    .returnsQtyByBrandName || [],
                  ["sum"]
                )}
                columns={[
                  {
                    field: "item_brand_name",
                    header: "BRAND NAME ",
                  },
                  {
                    field: "sum",
                    header: "TOTAL UNITS",
                    format: true,
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
            <div className="card  border border-gray-200 shadow-lg text-center rounded flex-1">
              <h3 className="flex justify-center  text-sm font-semibold ml-1 mb-1 py-2">
                BRAND NAME (TOP 5) VALUE
              </h3>
              <CustomDataTable
                data={formatCustomDataTableData(
                  returnData?.returnsValByBrandNameResult
                    .returnsValByBrandName || [],
                  ["sum"]
                )}
                columns={[
                  {
                    field: "item_brand_name",
                    header: "BRAND NAME ",
                  },
                  {
                    field: "sum",
                    header: "TOTAL VALUE",
                    prependDollar: true,
                    format: true,
                  },
                ]}
                sliceStart={0}
                sliceEnd={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
