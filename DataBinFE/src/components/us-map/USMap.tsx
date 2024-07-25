import { geoCentroid } from "d3-geo";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// import { scaleLinear } from "d3-scale";
import allStates from "./data.json";
import states from "./states.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};
// const colorScale = scaleLinear().domain([0, 100]).range(["#FFF", "#06F"]);

const MapChart = ({
  markers,
  markers2,
  markers3,
  markers4,
  markers5,
  colorScale,
}: any) => {
  return (
    <div className="h-full flex items-center justify-center">
      <ComposableMap projection="geoAlbersUsa" className="h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo: any) => {
                const stateId =
                  Object?.entries(states)?.find(
                    (s) => s[1] === geo.properties.name
                  ) || [];
                const idValue =
                  allStates?.find((s) => s.id === stateId[0])?.id || 0;

                const color = colorScale(idValue as any);
                return (
                  <Geography
                    key={geo.rsmKey}
                    // stroke="#210d4a"
                    stroke="#ffffff"
                    strokeWidth={2}
                    geography={geo}
                    fill={color}
                    style={{
                      hover: {
                        fill: "#F53",
                      },
                    }}
                  />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id as keyof typeof offsets][0]}
                          dy={offsets[cur.id as keyof typeof offsets][1]}
                          connectorProps={{
                            stroke: "#7d6968",
                            strokeWidth: 1,
                            strokeLinecap: "round",
                          }}
                        >
                          <text x={4} fontSize={14} alignmentBaseline="middle">
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
        {markers.map(({ coordinates, name }: any) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={10}
              fill="#ff000070"
              stroke="#ff000070"
              strokeWidth={2}
            />
            <text
              textAnchor="middle"
              // y={markerOffset}

              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            ></text>
          </Marker>
        ))}
        {markers2.map(({ coordinates, name }: any) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={10}
              fill="#00ff0047"
              stroke="#00ff0047"
              strokeWidth={2}
            />
            <text
              textAnchor="middle"
              // y={markerOffset}

              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            ></text>
          </Marker>
        ))}
        {markers3.map(({ coordinates, name }: any) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={10}
              fill="#b064d6cc"
              stroke="#b064d6cc"
              strokeWidth={2}
            />
            <text
              textAnchor="middle"
              // y={markerOffset}

              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            ></text>
          </Marker>
        ))}
        {markers4.map(({ coordinates, name }: any) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={10}
              fill="#92fdfeb8"
              stroke="#92fdfeb8"
              strokeWidth={2}
            />
            <text
              textAnchor="middle"
              // y={markerOffset}

              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            ></text>
          </Marker>
        ))}
        {markers5.map(({ coordinates, name }: any) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={10}
              fill="#eeff3394"
              stroke="#eeff3394"
              strokeWidth={2}
            />
            <text
              textAnchor="middle"
              // y={markerOffset}

              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            ></text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
