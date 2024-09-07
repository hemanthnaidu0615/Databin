import { TreeNode } from "primereact/treenode";
import authFetch from "../../axios";
import OrgChart from "./OrgChart";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import moment from "moment";
import { setCache, getCache } from "../../utils/salesflowcache";
import { Slider } from "primereact/slider";


const SalesFlow = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("item-info");
  const [zoomValue, setZoomValue] = useState(20);
  const [activeType, setActiveType] = useState(type);

  const { dates } = useSelector((store: any) => store.dateRange);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  const fetchData = async (type: string) => {
    setLoading(true);

    const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
    const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
    const cacheKey = `${formattedStartDate}_${formattedEndDate}_${type}`;

    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setData(cachedData.data);
      setLoading(false);
      return;
    }
    const response = await authFetch(
      `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
    );

    setData(response.data);

    setCache(cacheKey, response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(type);
  }, [dates, type]);

  useEffect(() => {
    const savedType = localStorage.getItem("selectedType");
    if (savedType) {
      setActiveType(savedType);
      setType(savedType);
      fetchData(savedType);
    } else {
      setActiveType(type);
      fetchData(type);
    }
  }, [dates]);

  function handleSelectingType(newType: string) {
    setActiveType(newType);
    setType(newType);
    localStorage.setItem("selectedType", newType);
    fetchData(newType);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }

  const convertData = (data: any) => {
    const total = data.reduce(
      (acc: number, item: any) => acc + item.original_order_total_amount,
      0
    );
    return data.map((item: any) => {
      const dollarValue = numberFormatter.format(
        item.original_order_total_amount
      );
      const percentage =
        total > 0
          ? ((item.original_order_total_amount / total) * 100).toFixed(2) + "%"
          : "0%";
      const label = item.key || "Others";
      return {
        label,
        expanded: item.children ? true : false,
        data: ` $${dollarValue} ${percentage}`,
        children: item.children ? convertData(item.children) : [],
        className: "bg-purple-200",
      };
    });
  };

  const handleZoomChange = (e: any) => {
    setZoomValue(e.value);
  };

  const incrementZoom = () => {
    setZoomValue(prev => Math.min(prev + 10, 100));
  };

  const decrementZoom = () => {
    setZoomValue(prev => Math.max(prev - 10, 0));
  };

  const buttonData = [
    { name: "Order Capture Channel", value: "order_capture_channel" },
  ];

  return (
    <div className="flex-1 flex flex-col gap-20 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex m-2 gap-2">
          {buttonData.map((btn, index) => (
            <Button
              key={index}
              className={`p-2 text-sm border-0 ${
                activeType === btn.value ? "bg-purple-600" : "bg-purple-500"
              }`}
              onClick={() => handleSelectingType(btn.value)}
              style={{
                transition: "background-color 0.3s",
              }}
            >
              {btn.name}
            </Button>
          ))}
        </div>
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
      <div className="overflow-auto flex-1" style={{ height: "min-height" }}>
        <OrgChart data={convertData(data)} zoom={zoomValue} />
      </div>
    </div>
  );
};

export default SalesFlow;
