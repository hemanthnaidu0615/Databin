import { TreeNode } from "primereact/treenode";
import authFetch from "../../axios";
import OrgChart from "../../components/charts/OrgChart";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import moment from "moment";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";

const SalesFlow = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("item-info");
  const [zoomValue, setZoomValue] = useState(50);
  const [orientation, setOrientation] = useState("horizontal");

  const { dates } = useSelector((store: any) => store.dateRange);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  const fetchData = async (type: string) => {
    setLoading(true);

    const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
    const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
    const response = await authFetch(
      `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
    );
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(type);
  }, [dates, type]);

  function handleSelectingType(newType: string) {
    setType(newType);
    fetchData(newType);
  }

  const handleZoomChange = (e: any) => {
    setZoomValue(e.value);
  };

  const incrementZoom = () => {
    setZoomValue(prev => Math.min(prev + 10, 100));
  };

  const decrementZoom = () => {
    setZoomValue(prev => Math.max(prev - 10, 0));
  };

  const orientationOptions = [
    { label: "Horizontal", value: "horizontal" },
    { label: "Vertical", value: "vertical" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }

  const convertData = (data: any) => {
    return data.map((item: any) => {
      return {
        label: item.key,
        expanded: item.children ? true : false,
        data: numberFormatter.format(item.original_order_total_amount), 
        children: item.children ? convertData(item.children) : [],
        className: "bg-purple-200",
      };
    });
  };

  const buttonData = [
    { name: "Order Capture Channel", value: "order_capture_channel" },
    { name: "Item Info", value: "item-info" },
    { name: "Fulfillment", value: "fulfillment" },
  ];

  return (
    <div className="flex-1 flex flex-col border-2 m-2 rounded-lg bg-white overflow-hidden">
      <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
      <h1 className="font-semibold text-md text-violet-800 py-2 px-3">
        Sales Flow
      </h1>
      <div className="flex-1 flex flex-col gap-20 shadow-lg rounded-lg border-slate-200 border-2">
        <div className="flex justify-between items-center">
          <div className="flex m-2 gap-2">
            {buttonData.map((btn, index) => (
              <Button
                key={index}
                className="p-2 text-sm bg-purple-500 border-0"
                onClick={() => handleSelectingType(btn.value)}
                style={{
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#9f7aea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7c3aed";
                }}
              >
                {btn.name}
              </Button>
            ))}
          </div>
          <Dropdown
            value={orientation}
            options={orientationOptions}
            onChange={(e) => setOrientation(e.value)}
            placeholder="Select Orientation"
            className="w-32"
          />
          <div className="flex items-center gap-2 mr-6">
            <i className="pi pi-search-minus" onClick={decrementZoom}></i>
            <Slider
              value={zoomValue}
              onChange={handleZoomChange}
              className="w-32"
              step={10}
              min={0}
              max={100}
            />
            <i className="pi pi-search-plus" onClick={incrementZoom}></i>
          </div>
        </div>
        <div
          className="overflow-auto flex-1"
          style={{
            height: orientation === "horizontal" ? "calc(100vh - 200px)" : "auto",
            width: orientation === "vertical" ? "calc(100vw - 200px)" : "auto",
          }}
        >
          <OrgChart data={convertData(data)} zoom={zoomValue} orientation={orientation} />
        </div>
      </div>
    </div>
  );
};

export default SalesFlow;

