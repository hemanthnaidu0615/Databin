import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { abbrvalue } from "../../helpers/helpers";

export const InventoryCard = ({ dashboardData }: any) => {
  const formatAmount = (value: number) => {
    return `${Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)}`;
  };
  function formatSeriesData(data: any) {
    return data?.map((item: any) => {
      return {
        itemID: item?.item_id,
        enterpriseKey: item?.enterprise_key,
        total: formatAmount(item?.order_total_amount),
        qty: abbrvalue(item?.original_ordered_qty),
      };
    });
  }

  // const renderImage = (rowData: any) => {
  //   return <img src={rowData.Image} alt={rowData.Product} width="50" />;
  // };

  const inventoryDetails = [
    {
      label: "Total Products",
      value: abbrvalue(dashboardData?.allWeekSales[0]?.item_id_ordered),
    },
    {
      label: "Total Products Sold",
      value: abbrvalue(dashboardData?.thisWeekSales[0]?.item_id_ordered),
    },
  ];

  return (
    <div className="flex-1 h-[65%] flex flex-col mt-0 m-2 shadow-lg rounded-sm shadow-slate-300	bg-white">
      <div className="flex justify-between pt-1">
        <div className="flex items-center p-2">
          <h3 className="font-bold ">Top Sellers </h3>
          <span className="text-xs text-black font-light "> - Last 7 days</span>
        </div>
      </div>
      <div className="flex">
        <div className="card w-[75%] h-[50%] border-0 m-2">
          <DataTable
            value={formatSeriesData(dashboardData?.topSellers.slice(0, 8))}
            showGridlines
            size="small"
            className="text-xs border-0 "
            pt={{ bodyRow: { className: "border-0 border-transparent h-8" } }}
          >
            {/* <Column field="itemID" header="Item ID"></Column> */}
            <Column
              field="enterpriseKey"
              header="Enterprise Key"
              pt={{ bodyCell: { className: "h-5 text-center" } }}
              headerClassName="bg-purple-100 "
            ></Column>
            <Column
              field="total"
              header="Total Sale"
              pt={{ bodyCell: { className: "h-5 text-center" } }}
              headerClassName="bg-purple-100 "
            ></Column>
            <Column
              field="qty"
              header="Quantity"
              pt={{ bodyCell: { className: "h-5 text-center" } }}
              headerClassName="bg-purple-100 "
            ></Column>
          </DataTable>
        </div>
        <div className="flex-1 p-3 ">
          {inventoryDetails.map((item: any) => (
            <div key={item.label} className="list-none flex min-h-12 p-2">
              <div className="w-full flex flex-col pl-1">
                <p className="mb-1 text-sm font-semibold">{item.label}</p>
                <div
                  className={`w-full flex-1 text-3xl text-white flex justify-center items-center rounded-xl min-h-14 min-w-20 bg-blue-400`}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
