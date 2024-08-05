import { ResponsivePie } from "@nivo/pie";

export const HalfPiechart = (props: any) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
    const value = Math.ceil(
      (parseInt(dataWithArc[0]?.formattedValue) /
        parseInt(dataWithArc[1]?.formattedValue)) *
        100
    );
    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "12px",
          fontWeight: 600,
          transform: "translateY(-10%)",
          fill: value > 100 ? "#00FF00" : "red",
        }}
      >
        {value}%
      </text>
    );
  };
  return (
    <div className="h-full flex-1">
      <ResponsivePie
        data={props.data}
        colors={{ datum: "data.color" }}
        margin={{ top: 0, right: 25, bottom: 0, left: 25 }}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.5}
        activeOuterRadiusOffset={8}
        borderWidth={0}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["opacity", 0]],
        }}
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
      />
    </div>
  );
};
