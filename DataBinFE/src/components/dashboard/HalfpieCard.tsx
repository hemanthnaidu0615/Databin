import { useEffect, useState } from "react";
import { HalfPiechart } from "../charts/HalfPiechart";

export const HalfpieCard = ({ trendYOY }: any) => {
  const [pieData, setPieData] = useState([]);

  const colors = [
    { color1: "#e9f2b8", color2: "#f5e76c" },
    { color1: "#61e9f2", color2: "#a8f2f7" },
    { color1: "#fc6a65", color2: "#faa8a5" },
    { color1: "#e9f2b8", color2: "#f7e543" },
  ];

  useEffect(() => {
    const trends = trendYOY?.map((t: any, i: number) => {
      return {
        id: i,
        chartData: [
          {
            id: "This Week",
            label: "This Week",
            value: t?.line_total_amount_last_7_days,
            color: colors[i]?.color1,
          },
          {
            id: "Last Week",
            label: "Last Week",
            value: +t?.line_total_amount_first_7_days,
            color: colors[i]?.color2,
          },
        ],
        label: t?.status_group,
      };
    });
    setPieData(trends);
  }, []);

  return (
    <div className="flex flex-col bg-white flex-1">
      <div className="flex justify-between my-1">
        <div className="flex items-center p-2">
          <h3 className="font-bold ">Trend</h3>
          <span className="text-xs text-black font-light "> - Last 7 days</span>
        </div>
      </div>
      <div className="flex flex-1 justify-between pt-1 overflow-hidden">
        {pieData.map((pieData: any) => {
          const chartData = pieData.chartData as {
            id: string;
            label: string;
            value: number;
            color: string;
          }[];

          const color = chartData[0].color;

          return (
            <div key={pieData.id} className="min-h-20 flex-1  flex flex-col">
              <div className="flex mx-auto">
                <h3 className="text-md  px-1  text-wrap text-center ">
                  {pieData.label}
                </h3>
                <i
                  className="pi pi-arrow-up "
                  style={{ fontSize: "1rem", color: "#21FF21" }}
                ></i>
              </div>

              <HalfPiechart data={pieData.chartData} color={color} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
