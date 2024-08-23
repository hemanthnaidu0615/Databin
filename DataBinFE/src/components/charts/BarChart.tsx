import { CategoryScale, Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import './style.css'; // Import the CSS file

Chart.register(...registerables);
Chart.register(CategoryScale);

export const BarChart = ({ chartData }: any) => {
  const formatValue = (value: number) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return `${value.toLocaleString()}`;
  };

  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        width={1000}  
        height={400}  
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              ticks: {
                display: true,
              },
              title: {
                display: true,
                text: 'Dates',
              },
            },
            y: {
              ticks: {
                callback: function (value: any) {
                  return formatValue(value);
                },
              },
              title: {
                display: true,
                text: 'Order Amount ($)',
              },
            },
          },
        }}
      />
    </div>
  );
};
