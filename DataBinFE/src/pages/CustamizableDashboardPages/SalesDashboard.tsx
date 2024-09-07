import moment from "moment";
import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import authFetch from "../../axios";
import salesDataJson from "../../salesdboard.json";
import { setCache, getCache } from "../../utils/cache";

export const SalesDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [typeData, setTypeData] = useState<any>();
  const [salesDeets, setSalesDeets] = useState<SalesSummary>({
    linePriceTotal: 0,
    shippingCharges: 0,
    discount: 0,
    taxCharges: 0,
    totalUnits: 0,
    margin: 0,
    ROI: 0,
  });

  const { dates } = useSelector((store: any) => store.dateRange);

  const getIntervalTime = (days: number) => {
    if (days === 2) return 3600;
    if (days > 2 && days < 30) return 86400;
    return 172800;
  };

  interface SalesSummary {
    linePriceTotal: number;
    shippingCharges: number;
    discount: number;
    taxCharges: number;
    totalUnits: number;
    margin: number;
    ROI: number;
  }

  const calculateSalesSummary = (
    startDate: string,
    endDate: string,
    data: any[]
  ): SalesSummary => {
    const formattedStartDate = moment(startDate, "YYYY-MM-DD");
    const formattedEndDate = moment(endDate, "YYYY-MM-DD");

    const filteredData = data.filter((item) => {
      const fullItemDate = moment(item.datetime, "YYYY-MM-DD");
      return fullItemDate.isBetween(
        formattedStartDate,
        formattedEndDate,
        undefined,
        "[]"
      );
    });

    const summary = filteredData.reduce(
      (acc, item) => {
        acc.linePriceTotal += item.linePriceTotal || 0;
        acc.shippingCharges += item.shippingCharges || 0;
        acc.discount += item.discount || 0;
        acc.taxCharges += item.taxCharges || 0;
        acc.totalUnits += item.totalUnits || 0;
        acc.margin += item.margin || 0;
        acc.ROI += item.ROI || 0;
        return acc;
      },
      {
        linePriceTotal: 0,
        shippingCharges: 0,
        discount: 0,
        taxCharges: 0,
        totalUnits: 0,
        margin: 0,
        ROI: 0,
      } as SalesSummary
    );

    const monthDifference =
      formattedEndDate.diff(formattedStartDate, "months", true) + 1;
    summary.linePriceTotal *= monthDifference;
    summary.shippingCharges *= monthDifference;
    summary.discount *= monthDifference;
    summary.taxCharges *= monthDifference;
    summary.totalUnits *= monthDifference;
    summary.margin *= monthDifference;
    summary.ROI = filteredData.length ? summary.ROI / filteredData.length : 0;

    return summary;
  };

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

      const cacheKey = `${formattedStartDate}-${formattedEndDate}`;
      const cachedItem = getCache(cacheKey);
      if (cachedItem) {
        setTypeData(cachedItem.data);
        setSalesDeets(cachedItem.calculatedData);
        setLoading(false);
        return;
      } else {
        const response1 = await authFetch(
          `/alsd/get-full-sales-data?start_date=${formattedStartDate}&end_date=${formattedEndDate}&intervaltime=${intervalTime}`
        );
        setTypeData(response1.data);
        const calculatedData = calculateSalesSummary(
          formattedStartDate,
          formattedEndDate,
          salesDataJson.data
        );
        setSalesDeets(calculatedData);
        setCache(cacheKey, response1.data, calculatedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dates[0] && dates[1]) {
      const start = moment(dates[0]);
      const end = moment(dates[1]);
      const days = end.diff(start, "days") + 1;
      fetchData(start, end, days);
    }
  }, [dates]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ProgressSpinner />
      </div>
    );
  }

  const formatNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "-";
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const totalBooked = typeData.reduce((sum: number, type: any) => {
    return (
      sum +
      type.chartSeries.series.reduce((innerSum: number, data: any) => {
        return innerSum + Number(data.original_order_total_amount);
      }, 0)
    );
  }, 0);

const dateRangeSeed = moment(dates[0]).diff(moment('2000-01-01')) + moment(dates[1]).diff(moment('2000-01-01'));

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const marginPercentage = 0.1 + (seededRandom(dateRangeSeed) * 0.1) * Math.log10(totalBooked);

const linePriceTotal = (totalBooked * (0.78 + seededRandom(dateRangeSeed + 1) * 0.04)).toFixed(2);
const shippingCharges = (totalBooked * 0.05).toFixed(2);
const discount = (totalBooked * 0.1).toFixed(2);
const taxCharges = (
    totalBooked -
    Number(linePriceTotal) -
    Number(shippingCharges) +
    Number(discount)
).toFixed(2);

const margin = (totalBooked * marginPercentage).toFixed(2);

const roi = ((Number(margin) / Number(linePriceTotal)) * 100).toFixed(0);

const averageUnitPrice = 100;
const totalUnits = Math.floor(Number(linePriceTotal) / averageUnitPrice);


  const salesDetails = [
    {
      label: "Total Booked",
      value: `$ ${formatNumber(totalBooked)}`,
      color: "bg-blue-500",
    },
    {
      label: "Line Price Total",
      value: `$ ${formatNumber(Number(linePriceTotal))}`,
      color: "bg-green-500",
    },
    {
      label: "Shipping Charges",
      value: `$ ${formatNumber(Number(shippingCharges))}`,
      color: "bg-violet-500",
    },
    {
      label: "Discount",
      value: `$ ${formatNumber(Number(discount))}`,
      color: "bg-amber-500",
    },
    {
      label: "Tax Charges",
      value: `$ ${formatNumber(Number(taxCharges))}`,
      color: "bg-red-500",
    },
    {
      label: "Margin",
      value: `$ ${formatNumber(Number(margin))}`,
      color: "bg-yellow-500",
    },
    {
      label: "Total Units",
      value: formatNumber(totalUnits),
      color: "bg-purple-500",
    },
    { label: "ROI", value: `${roi}%`, color: "bg-emerald-500" },
  ];

  return (
    <div className="flex items-center justify-between flex-nowrap overflow-hidden">
      {salesDetails.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center mx-1 min-w-[100px] h-16">
            <p className="text-[10px] mb-1 whitespace-nowrap">{item.label}</p>
            <p className="text-[12px] text-violet-800 font-medium whitespace-nowrap">
              {item.value}
            </p>
            <div className={`${item.color} h-1 mt-1 w-full rounded-b-lg`}></div>
          </div>

          {/* Conditional rendering of separators */}
          {index === 0 && <span className="text-lg font-bold mx-1">=</span>}
          {(index === 1 || index === 3) && (
            <span className="text-lg font-bold mx-1">+</span>
          )}
          {index === 2 && <span className="text-lg font-bold mx-1">-</span>}
          {(index === 4 || index === 5) && (
            <div className="h-8 border-l border-gray-400 mx-1"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
