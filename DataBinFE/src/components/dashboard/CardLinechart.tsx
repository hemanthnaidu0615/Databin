import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { abbrvalue } from "../../helpers/helpers";

const CustomTooltip = ({ point }:any) => (
  <div
    style={{
      background: "white",
      padding: "5px",
      border: "1px solid #ccc",
      zIndex: 1000, // Ensure tooltip is on top
      position: "absolute", // Absolute positioning for more control
      top: point.y - 50, // Adjust the positioning as needed
      width:'35vh',
      pointerEvents: "none", // Prevent mouse events on tooltip
    }}
  >
    <strong>{point.serieId}</strong>
    <br />
    Custom Date: {point.data.xFormatted}
    <br />
    Custom Revenue: ${abbrvalue(point.data.yFormatted)}
  </div>
);

export const CardLinechart = ({ dashboardData }: any) => {
  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="inline font-bold pl-4 pt-2">Revenue Trend</h3>
        </div>
        <div className="flex">
          <div className="w-full h-60">
            <ResponsiveLine
              data={[
                {
                  id: "Sales",
                  color: "hsl(185, 70%, 50%)",
                  data: dashboardData?.revenueTrend?.map((item: any) => {
                    return {
                      x: moment(item?.day).format("DD-MM-YYYY"),
                      y: parseInt(item?.total_orders),
                    };
                  }),
                },
              ]}
              margin={{ top: 10, right: 40, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: 0,
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="linear"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: "middle",
                legend: "Date",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40,
                legendPosition: "middle",
                format: (item) => "$" + abbrvalue(item),
                legend: "Revenue",
              }}
              enableArea={true}
              colors={"#9f6cf5"}
              areaBlendMode="darken"
              enableGridX={true}
              enableGridY={true}
              enablePoints={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              tooltip={CustomTooltip} // Use custom tooltip
            />
          </div>
        </div>
      </div>
    </div>
  );
};
