import moment from "moment";
import { Calendar } from "primereact/calendar";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import authFetch from "../../axios";
import { abbrvalue } from "../../helpers/helpers";
import { ProgressSpinner } from "primereact/progressspinner";

const Timeseries = () => {
  const [milestonesData, setMilestonesData] = useState<any>();
  const [timeseriesData, setTimeseriesData] = useState<any>();
  const [date, setDate] = useState<any>(new Date("01-04-2024"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const allowedStatusNames = [
    "Shipped",
    "Invoiced",
    "Scheduled",
    "Released",
    "Ready for Customer pickup",
    "Customer Picked up",
    "Back Ordered",
    "Shipment stopped",
    "Return Created",
    "Return Received",
  ];

  useEffect(() => {
    setLoading(true);
    console.log(activeIndex);
    authFetch
      .get(
        `/tables/getDataForTimeSeries?date=${moment(date).format(
          "YYYY-MM-DD"
        )}&userid=78`
      )
      .then((res) => {
        console.log("milestones", res?.data);
        setMilestonesData(res?.data);
        setLoading(false);
      });
    authFetch
      .get(
        `/tables/timeSeriesData?date=${moment(date).format(
          "YYYY-MM-DD"
        )}&userid=78`
      )
      .then((res) => {
        console.log("timeseries", res?.data);
        setTimeseriesData(res?.data);
      });
  }, [date]);

  const getNavClassName = (index: any) => {
    return index === 0 ? "w-screen" : "w-fit";
  };

  return loading ? (
    <div className="flex items-center justify-center h-full mx-auto my-auto">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="flex flex-col px-5 overflow-auto w-full">
      <div className="flex items-center justify-end">
        <div className="flex items-center justify-center py-2">
          <Calendar
            showIcon
            showButtonBar
            value={date}
            selectionMode="single"
            onChange={(e) => setDate(e.value as any)}
            dateFormat="yy-mm-dd"
            className=" h-6 m-0"
            inputStyle={{ fontSize: "12px" }}
            pt={{
              panel: { className: " h-[270px] w-[250px] p-0" },
              //   trigger: { className: "h-2 w-3 mt-1" },
              root: { className: "p-0 " },
              day: { className: "text-xs w-10 p-0" },
              dayLabel: { className: "h-5 w-5 my-1" },
              weekDay: { className: "text-sm" },
              header: { className: "text-xs" },
              title: { className: "text-xs" },
            }}
          />
        </div>
      </div>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="border overflow-y-auto h-full  bg-white"
        pt={{
          panelContainer: { className: "p-1 " },
          nav: { className: getNavClassName(activeIndex) },
          inkbar: { className: "bg-purple-700 text-black" },
        }}
      >
        <TabPanel
          header="Milestones"
          pt={{ headerTitle: { className: "text-purple-700" } }}
        >
          <div className="flex flex-1  items-center font-semibold text-violet-800">
            <div className="flex-[2]"></div>
            <div className="flex-1 text-center p-2">Total</div>

            {milestonesData?.timeLineDates?.map((time: any) => {
              return (
                <div
                  className="p-2 flex flex-col items-center justify-center flex-1"
                  key={time?.date}
                >
                  <div>{time?.milestone} Days</div>
                  <div>{time?.date}</div>
                </div>
              );
            })}
            <div className="p-2 flex flex-col items-center justify-center flex-1">
              <div>
                {" "}
                {`> ${
                  milestonesData?.timeLineDates[
                    milestonesData?.timeLineDates?.length - 1
                  ]?.milestone
                } Days`}{" "}
              </div>
            </div>
          </div>
          {milestonesData?.mergedData
            ?.filter((m: any) => allowedStatusNames.includes(m?.status_name))
            ?.map((status: any) => {
              return (
                <div className="flex items-center  border-b-[1px] border-purple-400 p-4">
                  <div className="flex-[2] text-violet-800">
                    {status?.status_name}
                  </div>
                  <div className="cursor-pointer timeseries-status flex-1 text-center border-l-[1px] border-purple-400 flex items-center justify-between px-2">
                    <div className="line-total-sum text-center w-full">
                      {abbrvalue(status?.lineTotalSumTotal)}
                    </div>
                  </div>
                  {status?.lineTotalSum?.map((sum: any, i: number) => {
                    return (
                      <div className="cursor-pointer timeseries-status flex-1 text-center border-l-[1px] border-purple-400 flex items-center justify-center px-2">
                        
                        <div className="line-total-sum">
                          {sum > 0
                            ? Math.round(
                                (sum / status?.lineTotalSumTotal) * 100
                              )
                            : 0}
                          %
                        </div>
                        <div className="hidden status-sum">
                          $
                          {Intl.NumberFormat("en-US", {
                            notation: "compact",
                            compactDisplay: "short",
                          }).format(sum)}{" "}
                          | {status?.QtySum[i]}
                        </div>
                        
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </TabPanel>
        <TabPanel
          header="Timeseries"
          pt={{ headerTitle: { className: "text-purple-700" } }}
          className="w-fit"
        >
          <div className="flex flex-col">
            <div className="flex text-xs font-semibold text-violet-800 p-4">
              <div className="flex-[3] "></div>
              <div className="flex-1 flex justify-center min-w-[75px]">
                Total
              </div>
              {timeseriesData?.dates?.map((date: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="border-l-[1px] border-purple-400 flex-1 flex text-center min-w-[75px] justify-center"
                  >
                    {date}
                  </div>
                );
              })}
            </div>
            {timeseriesData?.timeSeries
              ?.filter((t: any) => allowedStatusNames.includes(t?.status_name))
              ?.map((ts: any) => {
                return (
                  <div className="flex border-b-[1px] border-purple-400 p-4 h-16">
                    <div className="flex-[3] max-w-80 overflow-hidden">
                      {ts?.status_name}
                    </div>
                    <div className="flex-1 flex min-w-[75px] justify-center">
                      {ts?.sum}
                    </div>
                    {ts?.date_values?.map((dv: any) => {
                      return (
                        <div className="border-l-[1px] border-purple-400 flex-1 flex min-w-[75px] justify-center">
                          {dv}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Timeseries;
