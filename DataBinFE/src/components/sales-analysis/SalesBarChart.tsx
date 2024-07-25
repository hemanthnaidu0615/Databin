import moment from "moment";
import { useSelector } from "react-redux";
import authFetch from "../../axios";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export const SalesBarChart = () => {
  const [barChartData, setBarChartData] = useState<any>();

  const { dates } = useSelector((store: any) => store.dateRange);
  const fetchData = async () => {
    const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD HH:mm:ss");
    const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD HH:mm:ss");
    try {
      const responseForChart = await authFetch(
        `/tables?table=order_book_header&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      setBarChartData(responseForChart.data.slice(0, 50));
      console.log(barChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dates]);

  if (!barChartData) {
    return (
      <div className="flex justify-center items-center my-auto">
        <ProgressSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="bg-slate-100">hello</div>
    </div>
  );
};
