import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { SalesDashboard } from "./CustamizableDashboardPages/SalesDashboard";
import { SalesByRegion } from "./CustamizableDashboardPages/SalesByRegion";
import SalesFlow from "./CustamizableDashboardPages/SalesFlow";
import { Returns } from "./CustamizableDashboardPages/Returns";
import salesDashboardImg from "../images/salesDashboard.png";
import salesByRegionImg from "../images/salesByRegion.png";
import salesFlowImg from "../images/salesFlow.png";
import returnsImg from "../images/returns.png";
// import { DeliveriesCard } from "../components/dashboard/DeliveriesCard";
// import { InventoryCard } from "./CustamizableDashboardPages/InventoryCard";

interface Widget {
  name: string;
  component: JSX.Element;
  route: string;
  snapshot: string;
}

const initialWidgets: Widget[] = [
  {
    name: "Sales",
    component: <SalesDashboard />,
    route: "/sales/dashboard",
    snapshot: salesDashboardImg,
  },
  {
    name: "Sales By Region",
    component: <SalesByRegion />,
    route: "/sales/sales-by-region",
    snapshot: salesByRegionImg,
  },
  {
    name: "Sales Flow",
    component: <SalesFlow />,
    route: "/sales/flow",
    snapshot: salesFlowImg,
  },
  {
    name: "Returns",
    component: <Returns />,
    route: "/returns",
    snapshot: returnsImg,
  },
//   {
//     name: "Deliveries",
//     component: <DeliveriesCard />,
//     route: "/sales/flow",
//     snapshot: salesFlowImg,
//   },
//   {
//     name: "Inventories",
//     component: <InventoryCard />,
//     route: "/returns",
//     snapshot: salesFlowImg,
//   },
];

const DynamicDashboard = () => {
  const [availableWidgets, setAvailableWidgets] = useState<Widget[]>(initialWidgets);
  const [activeWidgetNames, setActiveWidgetNames] = useState<string[]>(() => {
    const savedWidgetNames = sessionStorage.getItem("activeWidgetNames");
    return savedWidgetNames ? JSON.parse(savedWidgetNames) : [];
  });
  const [expandedWidgetNames, setExpandedWidgetNames] = useState<Set<string>>(() => {
    const savedExpandedWidgets = sessionStorage.getItem("expandedWidgetNames");
    const initialExpandedWidgets = new Set<string>(
      savedExpandedWidgets ? JSON.parse(savedExpandedWidgets) : activeWidgetNames
    );
    return initialExpandedWidgets;
  });

  useEffect(() => {
    sessionStorage.setItem("activeWidgetNames", JSON.stringify(activeWidgetNames));
  }, [activeWidgetNames]);

  useEffect(() => {
    sessionStorage.setItem("expandedWidgetNames", JSON.stringify(Array.from(expandedWidgetNames)));
  }, [expandedWidgetNames]);

  const navigate = useNavigate();

  const handleAddWidget = (widget: Widget) => {
    setActiveWidgetNames((prev) => {
      const updatedNames = [...prev, widget.name];
      return updatedNames;
    });
    setAvailableWidgets(availableWidgets.filter((w) => w.name !== widget.name));
    setExpandedWidgetNames((prev) => new Set(prev).add(widget.name)); // Expand widget by default
  };

  const handleRemoveWidget = (widget: Widget) => {
    setActiveWidgetNames((prev) => {
      const updatedNames = prev.filter((name) => name !== widget.name);
      return updatedNames;
    });
    setAvailableWidgets([...availableWidgets, widget]);
    setExpandedWidgetNames((prev) => {
      const newSet = new Set(prev);
      newSet.delete(widget.name);
      return newSet;
    });
  };

  const toggleExpandCollapse = (widgetName: string) => {
    setExpandedWidgetNames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(widgetName)) {
        newSet.delete(widgetName);
      } else {
        newSet.add(widgetName);
      }
      return newSet;
    });
  };

  const handleRedirect = (route: string) => {
    navigate(route);
  };

  const activeWidgets = initialWidgets.filter((widget) =>
    activeWidgetNames.includes(widget.name)
  );

  return (
    <div className="grid grid-cols-10 h-full gap-4 p-4">
      {/* Heading at the top */}
      <div className="col-span-10">
        <h1 className="font-semibold text-2xl text-violet-800 mb-4">Personalized Dashboard</h1>
      </div>

      {/* Check if no widgets are active */}
      {activeWidgets.length === 0 ? (
        <div className="col-span-10 flex justify-center items-center">
        <div className="">
          <h3 className="text-lg font-semibold">One Dashboard to manage all your business</h3>
          <h3 className="text-sm  mt-2">You currently have no widgets on your dashboard. Add a widget using the pallet on the right or <a href="" className="text-blue-500">create a new widget</a></h3>
        </div>
      </div>
      ) : (
        <>
          {/* Left Column (45% of the screen, spans 4 columns) */}
          <div className="col-span-4 flex flex-col gap-4">
            {activeWidgets
              .filter((_, index) => index % 2 === 0)
              .map((widget) => (
                <div
                  key={widget.name}
                  className="bg-white shadow-lg rounded-lg p-4 relative"
                  style={{ width: "100%", height: "auto" }}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-t-lg">
                    <button
                      className="text-gray-800 rounded-full p-1"
                      onClick={() => toggleExpandCollapse(widget.name)}
                      title={
                        expandedWidgetNames.has(widget.name) ? "Collapse" : "Expand"
                      }
                    >
                      {expandedWidgetNames.has(widget.name) ? (
                        <span className="text-xl">▲</span>
                      ) : (
                        <span className="text-xl">▼</span>
                      )}
                    </button>
                    <h3 className="text-lg font-semibold flex-grow">
                      {widget.name}
                    </h3>
                    <button
                      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleRemoveWidget(widget)}
                      title="Remove this"
                    >
                      X
                    </button>
                  </div>
                  {expandedWidgetNames.has(widget.name) && (
                    <div className="mt-2">{widget.component}</div>
                  )}
                  <div className="pb-2"></div>
                  <button
                    className=" bottom-0 bg-violet-500 text-white rounded-full p-1.5 shadow-lg hover:bg-violet-600 transition duration-300 ease-in-out"
                    onClick={() => handleRedirect(widget.route)}
                    title="Go to page"
                  >
                    View More
                  </button>
                </div>
              ))}
          </div>

          {/* Right Column (45% of the screen, spans 4 columns) */}
          <div className="col-span-4 flex flex-col gap-4">
            {activeWidgets
              .filter((_, index) => index % 2 === 1)
              .map((widget) => (
                <div
                  key={widget.name}
                  className="bg-white shadow-lg rounded-lg p-4 relative"
                  style={{ width: "100%", height: "auto" }}
                >
                  <div className="flex items-center space-x-2 p-2 rounded-t-lg">
                    <button
                      className="text-gray-800 rounded-full p-1"
                      onClick={() => toggleExpandCollapse(widget.name)}
                      title={
                        expandedWidgetNames.has(widget.name) ? "Collapse" : "Expand"
                      }
                    >
                      {expandedWidgetNames.has(widget.name) ? (
                        <span className="text-xl">▲</span>
                      ) : (
                        <span className="text-xl">▼</span>
                      )}
                    </button>
                    <h3 className="text-lg font-semibold flex-grow">
                      {widget.name}
                    </h3>
                    <button
                      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleRemoveWidget(widget)}
                      title="Remove this"
                    >
                      X
                    </button>
                  </div>
                  {expandedWidgetNames.has(widget.name) && (
                    <div className="mt-2">{widget.component}</div>
                  )}
                  <div className="pb-2"></div>
                  <button
                    className=" bottom-0 bg-violet-500 text-white rounded-full p-1.5 shadow-lg hover:bg-violet-600 transition duration-300 ease-in-out"
                    onClick={() => handleRedirect(widget.route)}
                    title="Go to page"
                  >
                    View More
                  </button>
                </div>
              ))}
          </div>
        </>
      )}

      {/* Sidebar (10% of the screen, spans 2 columns) */}
      <div className="col-span-2 fixed right-0 top-[64px] h-[calc(100%-64px)] p-2 shadow-lg overflow-auto">
        <div className="flex flex-col space-y-2">
          {initialWidgets.map((widget) => (
            <div
              key={widget.name}
              className="p-2 rounded-lg cursor-pointer flex flex-col items-center space-y-1"
              onClick={() => handleAddWidget(widget)}
              style={{ width: "160px", height: "120px" }}
            >
              <div className="text-center text-sm font-medium">
                {widget.name}
              </div>
              <div
                className="w-full h-full rounded-md"
                style={{
                  backgroundImage: `url(${widget.snapshot})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicDashboard;
