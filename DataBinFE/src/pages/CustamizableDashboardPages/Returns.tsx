import "primeicons/primeicons.css";
import React from "react";
import { useEffect, useState } from "react";
import authFetch from "../../axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import moment from "moment";
import { setReturnsCache, getReturnsCache } from '../../utils/returnscache';

export const Returns = () => {
  const [returnData, setReturnData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { dates } = useSelector((store: any) => store.dateRange);

  const fetchData = async () => {
    setLoading(true);
    if (!dates[0] || !dates[1]) return;

    try {
      const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
      const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
      const cacheKey = `${formattedStartDate}_${formattedEndDate}`;
      const cachedData = getReturnsCache(cacheKey);

      if (cachedData) {
        setReturnData(cachedData.data);
      } else {
        const response = await authFetch(
          `/returns/getReturnsData?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
        setReturnData(response.data);
        setReturnsCache(cacheKey, response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dates]);

  const formatNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const formatNumberWithCommas = (value: number | null | undefined, removeDecimals: boolean = false): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: removeDecimals ? 0 : 2,
    }).format(value);
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
      label: "Return NPR'ed",
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
      label: "Return NPR'ed",
      value: formatNumber(returnData?.returnStats[0].npr_quantity),
      icon: "pi-plus",
    },
    {
      label: "Pending Return",
      value: formatNumber(returnData?.returnStats[0].yet_to_receive_quantity),
    },
  ];

  return loading ? (
    <div className="flex items-center justify-center h-full">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="flex flex-col gap-4">
  <div className="flex-1 bg-purple-50 border border-gray-200 shadow-lg rounded-lg p-4">
    <h2 className="text-xs font-semibold text-center mb-2">BY VALUE</h2>
    <div className="flex flex-row justify-center items-center gap-2 flex-wrap">
      {returnDetails.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex items-center border border-gray-200 shadow-lg rounded-lg p-2 flex-1 min-w-[140px] max-w-[140px]">
            <span className="flex-1">
              <p className="text-xs mb-1">{item.label}</p>
              <p className="text-sm text-violet-900 font-medium">${item.value}</p>
            </span>
          </div>
          {index === 0 && (
            <span className="flex items-center justify-center mx-1 text-2xl text-gray-600">=</span>
          )}
          {index > 0 && index < returnDetails.length - 1 && (
            <span className="flex items-center justify-center mx-1 text-2xl text-gray-600">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>

  <div className="flex-1 bg-purple-50 border border-gray-200 shadow-lg rounded-lg p-4">
    <h2 className="text-xs font-semibold text-center mb-2">BY VOLUME</h2>
    <div className="flex flex-row justify-center items-center gap-2 flex-wrap">
      {returnDetailsVolume.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex items-center border border-gray-200 shadow-lg rounded-lg p-2 flex-1 min-w-[140px] max-w-[140px]">
            <span className="flex-1">
              <p className="text-xs mb-1">{item.label}</p>
              <p className="text-sm text-violet-900 font-medium">{item.value}</p>
            </span>
          </div>
          {index === 0 && (
            <span className="flex items-center justify-center mx-1 text-2xl text-gray-600">=</span>
          )}
          {index > 0 && index < returnDetailsVolume.length - 1 && (
            <span className="flex items-center justify-center mx-1 text-2xl text-gray-600">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>


  

  );
};
