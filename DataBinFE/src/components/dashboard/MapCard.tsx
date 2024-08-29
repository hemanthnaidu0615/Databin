import { abbrvalue } from "../../helpers/helpers";
import USMap from "../us-map/USMap";

export const MapCard = () => {
  const markers = [
    {
      id: 1,
      coordinates: [-74.0346, 40.7126],
      name: "NY",
    },
    {
      id: 2,
      coordinates: [-99.0417880081866, 31.6048969982912],
      name: "TX",
    },
    {
      id: 3,
      coordinates: [-119.94078047811563, 47.272501108277865],
      name: "WA",
    },
    {
      id: 4,
      coordinates: [-81.54086444316782, 27.825104123863095],
      name: "FL",
    },
    {
      id: 5,
      coordinates: [-99.8821022349843, 41.44012343727365],
      name: "NE",
    },
  ];
  const markers2 = [
    {
      id: 1,
      coordinates: [-84.34851792405453, 43.88958359932438],
      name: "MI",
    },
    {
      id: 2,
      coordinates: [-98.2691613586119, 38.511439403288364],
      name: "KS",
    },
    {
      id: 3,
      coordinates: [-105.27941893168264, 39.28103097175459],
      name: "CO",
    },
  ];

  const markers3 = [
    {
      id: 1,
      coordinates: [-111.5286853424478, 34.29419134375266],
      name: "AZ",
    },
    {
      id: 2,
      coordinates: [-89.65108564454964, 40.248107041608435],
      name: "IL",
    },
    {
      id: 3,
      coordinates: [-71.83322236972886, 43.375042566238335],
      name: "NH",
    },
    {
      id: 4,
      coordinates: [-111.81481440465338, 39.1041742132926],
      name: "UT",
    },
  ];
  const markers4 = [
    {
      id: 1,
      coordinates: [-71.44459159967452, 41.823362664037006],
      name: "RI",
    },
    {
      id: 2,
      coordinates: [-106.1625051690297, 34.11062967459411],
      name: "NM",
    },
    {
      id: 3,
      coordinates: [-71.08573220829798, 42.399587622930014],
      name: "MA",
    },
  ];
  const markers5 = [
    {
      id: 1,
      coordinates: [-77.71831554768285, 40.871190780789],
      name: "PA",
    },
    {
      id: 2,
      coordinates: [-93.47033875671576, 42.06322835399469],
      name: "IA",
    },
  ];

  const markersList = [
    {
      color: "bg-red-500",
      value: "3273601",
    },
    {
      color: "bg-green-400	",
      value: "1814400",
    },
    {
      color: "bg-purple-400",
      value: "966000",
    },
    {
      color: "bg-teal-200	",
      value: "703520",
    },
    {
      color: "bg-amber-200",
      value: "54200",
    },
  ];

  const colorScale = (idValue: string) => {
    switch (idValue) {
      default:
        return "#d6d4d0";
    }
  };
  return (
    <div className="flex   h-[100%] rounded-sm bg-white">
      <div className="flex flex-col ">
        <h3 className="inline font-bold pl-4 pt-2 h-[10%] ">Performance</h3>
        <div className="h-[80%] w-[150%]">
          <USMap
            markers={markers}
            markers2={markers2}
            markers3={markers3}
            markers4={markers4}
            markers5={markers5}
            colorScale={colorScale}
          />
        </div>
      </div>

      <div className="flex-1 flex pl-[20%] flex-col w-[25%]  translate-y-24">
        <div className=" m-3 mt-1 text-xs p-2 text-violet-900 bg-red-100 font-bold rounded-sm">
          Top 5 Revenues
        </div>
        <div className="flex gap-2 flex-col justify-center mt-2">
          {markersList.map((item) => (
            <span key={item.color} className="w-25 px-5 gap-1 flex ">
              <div
                className={`${item.color} rounded-full h-[9px] w-[9px] mt-1 `}
              ></div>
              <p className="text-xs ml-1 text-violet-900">
                ${abbrvalue(parseInt(item.value))}
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};