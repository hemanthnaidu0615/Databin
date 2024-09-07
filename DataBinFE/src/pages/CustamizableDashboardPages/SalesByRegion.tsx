import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MapChart from "../../components/us-map/USMap";
import states from "../../components/us-map/states.json";
import authFetch from "../../axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { setCache, getCache } from "../../utils/cacheByRegion";

interface Statess {
  [key: string]: string; 
}

const statess: Statess = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District of Columbia',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  };

export const SalesByRegion = () => {
  const [mapData, setMapData] = useState<any>();
  const { dates } = useSelector((store: any) => store.dateRange);
  const enterpriseKey = useSelector((store: any) => store.enterprise.key);
  const [tooltipData, setTooltipData] = useState<{ [key: string]: string }>({});
  const cacheKey = `${moment(dates[0]).format("YYYY-MM-DD")}_${moment(dates[1]).format("YYYY-MM-DD")}_${enterpriseKey}`;

  const formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchData = async () => {
      const cachedItem = getCache(cacheKey);

      if (cachedItem) {
        setMapData(cachedItem.data);
        setTooltipData(cachedItem.tooltipData);
        return;
      }

      const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD 00:00:00");
      const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD 00:00:00");
      try {
        const response = await authFetch(
          `/tables/map?start_date=${formattedStartDate}&end_date=${formattedEndDate}&enterprise_key=${enterpriseKey}`,{
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
            }
          }
        );
        const data = response.data;
        setMapData(data);

        const tooltipMap: { [key: string]: string } = data.reduce((acc: any, item: any) => {
          const stateAbbreviation = item[0].split("-")[1].toUpperCase();
          const stateName = statess[stateAbbreviation];
          const revenue = formatterUSD.format(item[1]);
          const quantity = new Intl.NumberFormat('en-US').format(item[3]);
          acc[stateName] = `Revenue: ${revenue} + Quantity: ${quantity}`;
          return acc;
        }, {});
       
        setTooltipData(tooltipMap);
        setCache(cacheKey, data, tooltipMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dates, enterpriseKey]);

  if (!mapData) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }
  
  const colorScale = (idValue: string) => {
    const topStates = mapData.slice(0, 5);
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

  return (
      <div className="flex flex-col flex-1 rounded-lg divide-y-2 divide-slate-200 divide-dashed px-2">
        <div className="flex justify-center p-2">
          <div className="relative h-[335px]"> 
            <MapChart
              markers={[]}
              markers2={[]}
              markers3={[]}
              markers4={[]}
              markers5={[]}
              colorScale={colorScale}
              revenueData={tooltipData}
            />
          </div>
        </div>
      </div>
  );
};
