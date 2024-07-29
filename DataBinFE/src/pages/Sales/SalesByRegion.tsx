import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MapChart from "../../components/us-map/USMap";
import states from "../../components/us-map/states.json";
import authFetch from "../../axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";

interface Marker {
  color: string;
  value: string;
}

export const SalesByRegion = () => {
  const [mapData, setMapData] = useState<any>();
  const { dates } = useSelector((store: any) => store.dateRange);
  const enterpriseKey = useSelector((store: any) => store.enterprise.key); // Get enterprise key from Redux store

  useEffect(() => {
    const fetchData = async () => {
      const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD 00:00:00");
      const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD 00:00:00");
      try {
        console.log(`Fetching data with start_date=${formattedStartDate}, end_date=${formattedEndDate}, enterprise_key=${enterpriseKey}`); // Debug log
        const response = await authFetch(
          `http://localhost:3000/v2/tables/map?start_date=${formattedStartDate}&end_date=${formattedEndDate}&enterprise_key=${enterpriseKey}`
        );
        console.log("API response:", response.data); // Debug log
        setMapData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [dates, enterpriseKey]);

  console.log("Dates from Redux:", dates); // Debug log
  console.log("Enterprise Key from Redux:", enterpriseKey); // Debug log
  
  if (!mapData) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }

  const stateAbbreviations: { [key: string]: string } = states;

  const result: string[][] = mapData.map((subArray: string[]) => {
  const stateAbbreviation: string = subArray[0].split("-")[1].toUpperCase();
  const stateName: string = stateAbbreviations[stateAbbreviation];
  return [stateName, ...subArray.slice(1)];
});

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  const formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function convertArrayToObject(arr: any) {
    return arr.map((innerArr: any) => ({
      state: innerArr[0],
      totalDollar: `${formatterUSD.format(innerArr[1])}`,
      percentage: `${innerArr[2]} %`,
    }));
  }

  const tableData = convertArrayToObject(result);

  const topStates = mapData.slice(0, 5);
  const colorScale = (idValue: string) => {
    switch (idValue) {
      case topStates[0][0].toUpperCase().substring(3):
        return "#58ddf5";
      case topStates[1][0].toUpperCase().substring(3):
        return "#65f785";
      case topStates[2][0].toUpperCase().substring(3):
        return "#f5901d";
      case topStates[3][0].toUpperCase().substring(3):
        return "#f7656c";
      case topStates[4][0].toUpperCase().substring(3):
        return "#8518b8";
      default:
        return "#d6d4d0";
    }
  };

  const markersList = topStates.map((state: any) => ({
    color: colorScale(state[0].toUpperCase().substring(3)),
    value: formatter.format(state[1]),
  }));

  return (
    <div className="h-full w-full flex flex-col m-2 rounded-lg bg-white border-2">
      <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
      <div className="flex justify-between px-3 py-2">
        <h1 className="font-semibold text-md text-violet-800">
          Sales by Region
        </h1>
      </div>
      <div className="flex flex-col flex-1 shadow-lg rounded-lg border-slate-200 border-2 divide-y-2 divide-slate-200 divide-dashed px-2">
        <div className="flex justify-between p-2">
          <h3 className="flex items-center text-sm font-bold">
            Countrywide Sales
          </h3>
        </div>

        <div className="flex gap-24 py-4 items-center justify-center">
          <div className="w-[500px] flex flex-col">
            <MapChart
              markers={[]}
              markers2={[]}
              markers3={[]}
              markers4={[]}
              markers5={[]}
              colorScale={colorScale}
            />
            <div className="flex flex-col justify-center gap-4 p-2">
              <div className="w-max text-xs p-2 text-violet-900 bg-red-100 font-bold rounded-sm">
                Top 5 revenues
              </div>
              <div className="flex gap-2 flex-col flex-wrap h-16 max-w-16 flex-1">
                {markersList.map((item: Marker) => (
                  <span key={item.color} className="w-32 px-2 h-4 flex">
                    <div
                      className="rounded-full h-[9px] w-[9px] mt-1"
                      style={{ backgroundColor: `${item.color}` }}
                    ></div>
                    <p className="text-xs ml-1 text-violet-900">
                      $ {item.value}
                    </p>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[480px]">
            <DataTable
              value={tableData.slice(0, 10)}
              size="small"
              className="text-sm"
              showGridlines
            >
              <Column
                field="state"
                header="State"
                pt={{ bodyCell: { className: "h-5 text-center" } }}
                headerClassName="bg-purple-100"
              />
              <Column
                field="totalDollar"
                header="Total $ Value"
                pt={{ bodyCell: { className: "h-5 text-center" } }}
                headerClassName="bg-purple-100"
              />
              <Column
                field="percentage"
                header="Percentage"
                pt={{ bodyCell: { className: "h-5 text-center" } }}
                headerClassName="bg-purple-100"
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
