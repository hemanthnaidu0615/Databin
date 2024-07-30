// // import { TreeNode } from "primereact/treenode";
// // import authFetch from "../../axios";
// // import OrgChart from "../../components/charts/OrgChart";
// // import { useEffect, useState } from "react";
// // import { ProgressSpinner } from "primereact/progressspinner";
// // import { Button } from "primereact/button";
// // import { useSelector } from "react-redux";
// // import moment from "moment";
// // import { Slider } from "primereact/slider";

// // const SalesFlow = () => {
// //   const [data, setData] = useState<TreeNode[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [type, setType] = useState("item-info");
// //   const [zoomValue, setZoomValue] = useState(50);

// //   const { dates } = useSelector((store: any) => store.dateRange);

// //   const numberFormatter = new Intl.NumberFormat("en-US", {
// //     notation: "compact",
// //     compactDisplay: "short",
// //   });

// //   const fetchData = async (type: any) => {
// //     setLoading(true);

// //     const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
// //     const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
// //     const response = await authFetch(
// //       `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
// //     );
// //     setData(response.data);
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchData(type);
// //   }, [dates]);

// //   function handleSelectingType(newType: any) {
// //     setType(newType);
// //     fetchData(newType);
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center my-auto mx-auto">
// //         <ProgressSpinner />
// //       </div>
// //     );
// //   }

// //   const convertData = (data: any) => {
// //     return data.map((item: any) => {
// //       return {
// //         label: item.key,
// //         expanded: item.children ? true : false,
// //         data: `$${numberFormatter.format(item.original_order_total_amount)}`,
// //         children: item.children ? convertData(item.children) : [],
// //         className: "bg-purple-200 ",
// //       };
// //     });
// //   };

// //   const buttonData = [
// //     { name: "Order Capture Channel", value: "order_capture_channel" },
// //     { name: "Item Info", value: "item-info" },
// //     { name: "Fulfillment", value: "fulfillment" },
// //   ];

// //   return (
// //     <div className="flex-1 flex flex-col border-2 m-2 rounded-lg bg-white overflow-hidden">
// //       <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
// //       <h1 className="font-semibold text-md text-violet-800 py-2 px-3">
// //         Sales Flow
// //       </h1>
// //       <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-lg border-slate-200 border-2">
// //         <div className="flex justify-between items-center p-2">
// //           <div className="flex gap-2">
// //             {buttonData.map((btn, index) => (
// //               <Button
// //                 key={index}
// //                 className="p-2 text-sm bg-purple-500 border-0"
// //                 onClick={() => handleSelectingType(btn.value)}
// //               >
// //                 {btn.name}
// //               </Button>
// //             ))}
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <i className="pi pi-search-minus"></i>
// //             <Slider
// //               value={zoomValue}
// //               onChange={(e: any) => {
// //                 setZoomValue(e.value);
// //               }}
// //               className="w-32"
// //             />
// //             <i className="pi pi-search-plus"></i>
// //           </div>
// //         </div>
// //         <div className="overflow-auto flex-1">
// //           <div className="relative" style={{ minWidth: '100%', minHeight: '100%' }}>
// //             <OrgChart data={convertData(data)} zoom={zoomValue} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SalesFlow;

// //Perfect code

// // import { TreeNode } from "primereact/treenode";
// // import authFetch from "../../axios";
// // import OrgChart from "../../components/charts/OrgChart";
// // import { useEffect, useState } from "react";
// // import { ProgressSpinner } from "primereact/progressspinner";
// // import { Button } from "primereact/button";
// // import { useSelector } from "react-redux";
// // import moment from "moment";
// // import { Slider } from "primereact/slider";
// // import { ToggleButton } from "primereact/togglebutton";

// // const SalesFlow = () => {
// //   const [data, setData] = useState<TreeNode[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [type, setType] = useState("item-info");
// //   const [zoomValue, setZoomValue] = useState(50);
// //   const [verticalLayout, setVerticalLayout] = useState(false);

// //   const { dates } = useSelector((store: any) => store.dateRange);

// //   const numberFormatter = new Intl.NumberFormat("en-US", {
// //     notation: "compact",
// //     compactDisplay: "short",
// //   });

// //   const fetchData = async (type: any) => {
// //     setLoading(true);

// //     const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
// //     const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
// //     const response = await authFetch(
// //       `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
// //     );
// //     setData(response.data);
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchData(type);
// //   }, [dates]);

// //   function handleSelectingType(newType: any) {
// //     setType(newType);
// //     fetchData(newType);
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center my-auto mx-auto">
// //         <ProgressSpinner />
// //       </div>
// //     );
// //   }

// //   const convertData = (data: any) => {
// //     return data.map((item: any) => {
// //       return {
// //         label: item.key,
// //         expanded: item.children ? true : false,
// //         data: `$${numberFormatter.format(item.original_order_total_amount)}`,
// //         children: item.children ? convertData(item.children) : [],
// //         className: "bg-purple-200 ",
// //       };
// //     });
// //   };

// //   const buttonData = [
// //     { name: "Order Capture Channel", value: "order_capture_channel" },
// //     { name: "Item Info", value: "item-info" },
// //     { name: "Fulfillment", value: "fulfillment" },
// //   ];

// //   return (
// //     <div className="flex-1 flex flex-col border-2 m-2 rounded-lg bg-white overflow-hidden">
// //       <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
// //       <h1 className="font-semibold text-md text-violet-800 py-2 px-3">
// //         Sales Flow
// //       </h1>
// //       <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-lg border-slate-200 border-2">
// //         <div className="flex justify-between items-center p-2">
// //           <div className="flex gap-2">
// //             {buttonData.map((btn, index) => (
// //               <Button
// //                 key={index}
// //                 className="p-2 text-sm bg-purple-500 border-0"
// //                 onClick={() => handleSelectingType(btn.value)}
// //               >
// //                 {btn.name}
// //               </Button>
// //             ))}
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <i className="pi pi-search-minus"></i>
// //             <Slider
// //               value={zoomValue}
// //               onChange={(e: any) => {
// //                 setZoomValue(e.value);
// //               }}
// //               className="w-32"
// //             />
// //             <i className="pi pi-search-plus"></i>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <ToggleButton
// //               onLabel="Vertical"
// //               offLabel="Horizontal"
// //               onIcon="pi pi-arrow-down"
// //               offIcon="pi pi-arrow-right"
// //               checked={verticalLayout}
// //               onChange={(e) => setVerticalLayout(e.value)}
// //             />
// //           </div>
// //         </div>
// //         <div className="overflow-auto flex-1">
// //           <div className="relative" style={{ minWidth: '100%', minHeight: '100%' }}>
// //             <OrgChart data={convertData(data)} zoom={zoomValue} layout={verticalLayout ? 'vertical' : 'horizontal'} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SalesFlow;

// import { TreeNode } from "primereact/treenode";
// import authFetch from "../../axios";
// import OrgChart from "../../components/charts/OrgChart";
// import { useEffect, useState } from "react";
// import { ProgressSpinner } from "primereact/progressspinner";
// import { Button } from "primereact/button";
// import { useSelector } from "react-redux";
// import moment from "moment";
// import { Slider } from "primereact/slider";
// import { ToggleButton } from "primereact/togglebutton";
// import { RootState } from "../../store/store"; // Import RootState

// const SalesFlow = () => {
//   const [data, setData] = useState<TreeNode[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [type, setType] = useState<string>("item-info");
//   const [zoomValue, setZoomValue] = useState<number>(50);
//   const [verticalLayout, setVerticalLayout] = useState<boolean>(true);

//   // Use RootState to type the state
//   const dates = useSelector((state: RootState) => state.dateRange.dates);

//   const numberFormatter = new Intl.NumberFormat("en-US", {
//     notation: "compact",
//     compactDisplay: "short",
//   });

//   const fetchData = async (type: string) => {
//     setLoading(true);

//     const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
//     const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
//     const response = await authFetch(
//       `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
//     );
//     setData(response.data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData(type);
//   }, [dates, type]);

//   const handleSelectingType = (newType: string) => {
//     setType(newType);
//     fetchData(newType);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center my-auto mx-auto">
//         <ProgressSpinner />
//       </div>
//     );
//   }

//   const convertData = (data: any[]): TreeNode[] => {
//     return data.map((item) => {
//       return {
//         key: item.key,
//         label: item.key,
//         expanded: item.children ? true : false,
//         data: `$${numberFormatter.format(item.original_order_total_amount)}`,
//         children: item.children ? convertData(item.children) : [],
//         className: "bg-purple-200",
//       };
//     });
//   };

//   const buttonData = [
//     { name: "Order Capture Channel", value: "order_capture_channel" },
//     { name: "Item Info", value: "item-info" },
//     { name: "Fulfillment", value: "fulfillment" },
//   ];

//   return (
//     <div className="flex-1 flex flex-col border-2 m-2 rounded-lg bg-white overflow-hidden">
//       <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
//       <h1 className="font-semibold text-md text-violet-800 py-2 px-3">
//         Sales Flow
//       </h1>
//       <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-lg border-slate-200 border-2">
//         <div className="flex justify-between items-center p-2">
//           <div className="flex gap-2 items-center">
//             {buttonData.map((btn, index) => (
//               <Button
//                 key={index}
//                 className="p-2 text-sm bg-purple-500 border-0"
//                 onClick={() => handleSelectingType(btn.value)}
//               >
//                 {btn.name}
//               </Button>
//             ))}
//           </div>
//           <div className="flex items-center gap-2 ml-4">
//             <i className="pi pi-search-minus"></i>
//             <Slider
//               value={zoomValue}
//               onChange={(e) => setZoomValue(e.value as number)}
//               className="w-32"
//             />
//             <i className="pi pi-search-plus"></i>
//             <ToggleButton
//               onLabel="Vertical"
//               offLabel="Horizontal"
//               onIcon="pi pi-arrow-down"
//               offIcon="pi pi-arrow-right"
//               checked={verticalLayout}
//               onChange={(e) => setVerticalLayout(e.value)}
//               className="ml-2"
//             />
//           </div>
//         </div>
//         <div className="overflow-auto flex-1">
//           <OrgChart
//             value={convertData(data)}
//             zoom={zoomValue}
//             layout={verticalLayout ? "vertical" : "horizontal"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalesFlow;

import { TreeNode } from "primereact/treenode";
import authFetch from "../../axios";
import OrgChart from "../../components/charts/OrgChart";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import moment from "moment";
import { Slider } from "primereact/slider";
import { ToggleButton } from "primereact/togglebutton";
import { RootState } from "../../store/store"; // Import RootState

const SalesFlow = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("item-info");
  const [zoomValue, setZoomValue] = useState<number>(50);
  const [verticalLayout, setVerticalLayout] = useState<boolean>(true);

  // Use RootState to type the state
  const dates = useSelector((state: RootState) => state.dateRange.dates);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  const fetchData = async (type: string) => {
    setLoading(true);

    const formattedStartDate = moment(dates[0]).format("YYYY-MM-DD");
    const formattedEndDate = moment(dates[1]).format("YYYY-MM-DD");
    const response = await authFetch(
      `/sales/getOrgChartData?start_date=${formattedStartDate}&end_date=${formattedEndDate}&type=${type}`
    );
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(type);
  }, [dates, type]);

  const handleSelectingType = (newType: string) => {
    setType(newType);
    fetchData(newType);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto mx-auto">
        <ProgressSpinner />
      </div>
    );
  }

  const convertData = (data: any[]): TreeNode[] => {
    return data.map((item) => {
      return {
        key: item.key,
        label: item.key,
        expanded: item.children ? true : false,
        data: `$${numberFormatter.format(item.original_order_total_amount)}`,
        children: item.children ? convertData(item.children) : [],
        className: "bg-purple-200",
      };
    });
  };

  const buttonData = [
    { name: "Order Capture Channel", value: "order_capture_channel" },
    { name: "Item Info", value: "item-info" },
    { name: "Fulfillment", value: "fulfillment" },
  ];

  return (
    <div className="flex-1 flex flex-col border-2 m-2 rounded-lg bg-white overflow-hidden">
      <div className="w-full h-2 bg-purple-300 rounded-t-lg"></div>
      <h1 className="text-2xl font-semibold text-md text-violet-800 py-2 px-3">
        Sales Flow
      </h1>
      <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-lg border-slate-200 border-2">
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-2 items-center">
            {buttonData.map((btn, index) => (
              <Button
                key={index}
                className="p-2 text-sm bg-purple-500 border-0"
                onClick={() => handleSelectingType(btn.value)}
              >
                {btn.name}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <i className="pi pi-search-minus"></i>
            <Slider
              value={zoomValue}
              onChange={(e) => setZoomValue(e.value as number)}
              className="w-32"
            />
            <i className="pi pi-search-plus"></i>
            <ToggleButton
              onLabel="Vertical"
              offLabel="Horizontal"
              onIcon="pi pi-arrow-down"
              offIcon="pi pi-arrow-right"
              checked={verticalLayout}
              onChange={(e) => setVerticalLayout(e.value)}
              className="ml-2"
            />
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <OrgChart
            value={convertData(data)}
            zoom={zoomValue}
            layout={verticalLayout ? "vertical" : "horizontal"}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesFlow;
