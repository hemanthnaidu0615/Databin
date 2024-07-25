import { useEffect, useState } from "react";
import { CardLinechart } from "../components/dashboard/CardLinechart";
import { DeliveriesCard } from "../components/dashboard/DeliveriesCard";
import { HalfpieCard } from "../components/dashboard/HalfpieCard";
import { MapCard } from "../components/dashboard/MapCard";
import authFetch from "../axios";
import { InventoryCard } from "../components/dashboard/InventoryCard";
import { ProgressSpinner } from "primereact/progressspinner";

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authFetch.get("/sales/GetDashboardData").then((res) => {
      console.log(res.data);
      setDashboardData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-1">
            <div className="flex flex-1">
              <div className="flex-1 p-2 pb-0">
                <div className="h-full flex flex-col shadow-lg shadow-slate-300 rounded-lg">
                  <CardLinechart dashboardData={dashboardData} />
                </div>
              </div>
              <div className="flex-1 p-2 flex flex-col">
                <div className="flex-1 flex flex-col shadow-lg shadow-slate-300 rounded-lg mb-2">
                  <DeliveriesCard deliveries={dashboardData?.deliveries} />
                </div>
                <div className="flex-1 flex shadow-slate-300 shadow-lg rounded-lg">
                  <HalfpieCard trendYOY={dashboardData?.trendYOY} />
                </div>
              </div>
            </div>
            <div className="flex flex-1 mt-0">
              <div className="flex-1 pl-0 p-2">
                <div className="h-full flex flex-col  rounded-lg">
                  <MapCard />
                </div>
              </div>
              <div className="flex-1 p-2 pl-0">
                <div className="h-full flex flex-col shadow-lg shadow-slate-300 rounded-lg">
                  <InventoryCard dashboardData={dashboardData} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
